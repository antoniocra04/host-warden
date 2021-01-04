export interface IHost {
    ip: string
    stats: [0 | 1]
    _id: string
}

export interface IParseStats {
    activity: boolean
    time: number
}
