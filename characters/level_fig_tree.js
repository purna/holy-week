export default {
    phase: 2.5,
    actLabel: 'ACT 1 – THE ROYAL ARRIVAL',
    title: 'The Fig Tree Incident',
    subtitle: 'A living parable of faith and judgment on the road to Jerusalem.',
    location: 'BETHANY ROAD',
    modelKey: 'road_path',
    quest: {
        id: 'FIG_TREE',
        name: 'THE WITHERED TREE',
        task: 'Investigate the unusual state of the roadside fig tree',
        cur: 0,
        tar: 2
    },
    npcs: [
        {
            id: 'nathan_gardener',
            name: 'Nathan',
            pos: [5, 0, 2],
            storyFile: './story/extras/nathan_fig_tree.json',
            hasDialogue: true,
            bubbleMsg: 'How does a tree die in a single hour?'
        }
    ],
    collectables: [
        {
            id: 'withered_branch',
            name: 'Brittle Fig Leaf',
            evidenceId: 'withered_leaves',
            color: 0x888877,
            position: [2, 0.5, -3]
        }
    ],
    evidence: [
        {
            id: 'withered_leaves',
            label: 'The Withered Leaves',
            category: 'Miracles',
            description: 'A fig tree, cursed by Jesus for its lack of fruit, withered completely from the roots up within 24 hours.'
        },
        {
            id: 'faith_lesson',
            label: 'The Power of Faith',
            category: 'Teachings',
            description: 'Jesus used the tree to teach that with faith, his followers could move mountains.'
        }
    ]
};
