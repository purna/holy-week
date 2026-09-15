// Shared interpreter for the project's documented Ink subset. No eval or globals.
export function evaluate(expression, variables) {
    if (!expression) return true;
    if ('literal' in expression) return expression.literal;
    if ('variable' in expression) return variables[expression.variable] ?? false;
    if ('not' in expression) return !evaluate(expression.not, variables);
    if ('all' in expression) return expression.all.every(e => evaluate(e, variables));
    if ('any' in expression) return expression.any.some(e => evaluate(e, variables));
    const a = evaluate(expression.left, variables), b = evaluate(expression.right, variables);
    return ({ eq: () => a === b, ne: () => a !== b, gt: () => a > b,
        ge: () => a >= b, lt: () => a < b, le: () => a <= b })[expression.compare]?.() ?? false;
}

export class ConversationStory {
    constructor(data, { saved = null, save = () => {}, facts = () => ({}) } = {}) {
        this.data = data;
        this.save = save;
        this.facts = facts;
        this.entry = data._meta?.entry || (data.start ? 'start' : data.root ? 'root' : Object.keys(data)[0]);
        const compatible = saved?.version === 1 && saved.revision === data._meta?.revision;
        this.session = compatible ? JSON.parse(JSON.stringify(saved)) : {
            version: 1, revision: data._meta?.revision, variables: { ...data._meta?.variables },
            visits: {}, selected: {}, node: this.entry, completed: false, rendered: null
        };
        this.revisiting = compatible;
        if (this.session.completed) {
            this.session.node = this.entry;
            this.session.selected = {};
            this.session.rendered = null;
            this.session.completed = false;
        }
        this.canContinue = true;
        this.currentChoices = [];
        this.currentTags = [];
    }

    get variables() {
        const visits = Object.fromEntries(Object.entries(this.session.visits).map(([key, value]) => [`visited_${key}`, value]));
        return { ...this.session.variables, ...visits, ...this.facts() };
    }

    Continue() {
        if (!this.canContinue) return '';
        this.currentTags = [];
        if (this.session.rendered) {
            this.currentChoices = this.session.rendered.choices;
            this.canContinue = false;
            return this.session.rendered.text;
        }
        const lines = [];
        for (let hops = 0; hops < 100; hops++) {
            const name = this.session.node, node = this.data[name];
            if (!node) throw new Error(`Missing conversation passage: ${name}`);
            this.session.visits[name] = (this.session.visits[name] || 0) + 1;
            let next = null;
            const steps = node.steps || (node.content || '').split('\n').map(line => line.trim().startsWith('#')
                ? { tag: line.trim().slice(1).trim() } : { text: line });
            for (const step of steps) {
                if (!evaluate(step.condition, this.variables)) continue;
                if ('text' in step) lines.push(step.text);
                if ('tag' in step) this.currentTags.push(step.tag);
                if ('set' in step) {
                    const value = evaluate(step.value, this.variables);
                    const previous = this.session.variables[step.set] || 0;
                    this.session.variables[step.set] = step.operator === '+=' ? previous + value
                        : step.operator === '-=' ? previous - value : value;
                }
                if ('divert' in step) next = step.divert;
            }
            this.currentChoices = (node.choices || []).map((choice, index) => ({ ...choice, sourceIndex: index, key: `${name}:${index}` }))
                .filter(choice => evaluate(choice.condition, this.variables) && !(choice.once && this.session.selected[choice.key]))
                .map((choice, index) => ({ ...choice, index,
                    text: `${choice.text}${this.session.selected[choice.key] ? ' (reviewed)' : ''}` }));
            if (this.currentChoices.length) break;
            if (!next || next === 'DONE' || next === 'END') {
                this.session.completed = true;
                break;
            }
            this.session.node = next;
            if (hops === 99) throw new Error('Conversation contains a loop without a choice');
        }
        this.canContinue = false;
        const text = lines.join('\n\n');
        this.session.rendered = { text, choices: this.currentChoices };
        this.save(JSON.parse(JSON.stringify(this.session)));
        return text;
    }

    ChooseChoiceIndex(index) {
        const choice = this.currentChoices[index];
        if (!choice || !evaluate(choice.condition, this.variables)) return;
        if (!this.data[choice.destination]) throw new Error(`Missing conversation destination: ${choice.destination}`);
        this.session.selected[choice.key] = true;
        this.session.node = choice.destination;
        this.session.rendered = null;
        this.currentChoices = [];
        this.canContinue = true;
        this.save(JSON.parse(JSON.stringify(this.session)));
    }
}

export function createConversation(data, manager, npcId, caseId) {
    const cm = manager.caseManager;
    const id = caseId || manager.activeCaseId || cm?.activeCaseId;
    const key = `${npcId}:${data._meta?.entry || 'start'}`;
    const progress = () => cm?.progress?.cases?.[id];
    return new ConversationStory(data, {
        saved: progress()?.conversations?.[key],
        save: state => {
            const p = progress();
            if (!p) return;
            p.conversations ||= {};
            p.conversations[key] = state;
            cm._saveProgress();
        },
        facts: () => {
            const p = progress();
            return Object.fromEntries((p?.evidenceFound || []).map(e => [`evidence_${e}`, true]));
        }
    });
}
