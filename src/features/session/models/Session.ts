export interface Session {
    readonly id: string
    name: string
    readonly createdAt: string
    updatedAt: string
    lastOpened: string | null
    restoreCount: number
    favorite: boolean
    tabCount: number

}