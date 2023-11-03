type task = {
    id: string,
    userId: string,
    createdAt?: string,
    title: string,
    description: string,
    status: 'pending' | 'completed' | 'canceled',
    deadline: string,
    hours?: number,
}


export type {task}