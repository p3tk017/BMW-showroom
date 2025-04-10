export type CarModels = {
    id: number
    documentId: string
    model: string
    imageUrl: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export type User = {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
}