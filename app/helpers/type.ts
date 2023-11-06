type task = {
    id: string,
    userId: string,
    createdAt?: string,
    title: string,
    description: string,
    status: 'pending' | 'completed' | 'cancelled',
    deadline: string,
    hours?: number,
}


export type {task}