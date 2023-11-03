import { task } from "./helpers/type"

const tasks: task[] = [
    {

        id: '1',
        userId: '1',
        createdAt: "Tue Oct 31 2023 12:10:55 GMT+0530 (India Standard Time)"
        ,
        title: "Do assignment 1",
        description: "Description of task1",
        status: 'pending',
        deadline: "Fri Nov 10 2023 12:14:45 GMT+0530 (India Standard Time)"
        ,
        hours: 20,

    },
    {

        id: '2',
        userId: '1',
        createdAt: "Tue Oct 31 2023 12:10:55 GMT+0530 (India Standard Time)"
        ,
        title: "Do assignment 2",
        description: "Description of task2",
        status: 'completed',
        deadline: "Fri Nov 10 2023 12:14:45 GMT+0530 (India Standard Time)"
        ,
        hours: 5,

    },
    {

        id: '3',
        userId: '2',
        createdAt: "Thu Nov 02 2023 12:17:31 GMT+0530 (India Standard Time)"
        ,
        title: "Study for End Sem",
        description: "Description of task3",
        status: 'pending',
        deadline: "Wed Nov 15 2023 12:18:11 GMT+0530 (India Standard Time)"

        ,
        hours: 50,

    },
]

export {tasks}