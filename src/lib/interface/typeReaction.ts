export interface typeReaction {
    type: string
    actions: string[]
}


export interface typeReactionForApp {
    name: string
    reactions: typeReaction[]
}