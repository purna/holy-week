export default {
    phase: 2.6,
    actLabel: 'ACT 2 – THE SILENCED TEACHER',
    title: 'The Olivet Discourse',
    subtitle: 'Prophecies of a falling Temple and the coming of the Son of Man.',
    location: 'MOUNT OF OLIVES',
    modelKey: 'mount_view',
    quest: {
        id: 'OLIVET_PROPHECY',
        name: 'SIGNS OF THE END',
        task: 'Gather the details of the prophecy regarding Jerusalem',
        cur: 0,
        tar: 2
    },
    npcs: [
        {
            id: 'andrew_disciple',
            name: 'Andrew',
            pos: [-3, 0, 5],
            storyFile: 'andrew_olivet',
            hasDialogue: true,
            bubbleMsg: 'He said the stones would fall...'
        }
    ],
    evidence: [
        {
            id: 'temple_stones_prophecy',
            label: 'Temple Ruin Prophecy',
            category: 'Prophecy',
            description: 'A direct prediction that the magnificent stones of the Temple will be thrown down.'
        },
        {
            id: 'signs_of_the_end',
            label: 'The Coming Tribulation',
            category: 'Questions',
            description: 'A complex series of warnings about future wars, famines, and the eventual return of the Son of Man.'
        }
    ],
    explanation: {
        title: 'Future Tense',
        body: 'The investigation has shifted from what Jesus *did* to what he says will *happen*. This prophecy links his current authority to the literal architecture of the city.'
    }
};