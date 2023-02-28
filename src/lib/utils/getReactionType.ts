import typeApplication from '../interface/typeApplication'

const reaction = [
    {
        name: 'hue',
        reactions: [
            {
                type: 'light',
                actions: [
                    'on',
                    'off'
                ]
            },
            {
                type: 'scene',
                actions: [
                    'on',
                    'off'
                ]
            }
        ]
    }
]

export const getReactionType = (action: string, app: typeApplication[]) => {
    const possibleReactions = reaction.filter((reaction) => { 
        if (reaction.name !== action && app.find((app) => app.name.toLocaleLowerCase() === reaction.name.toLocaleLowerCase())) {
            return reaction
        }
    })
    // console.log(possibleReactions)
    return possibleReactions
}