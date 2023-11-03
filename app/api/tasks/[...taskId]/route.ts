import { fetcher } from "@/app/helpers/fetcher";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

interface IParams {
    taskId: string
}
export async function GET(req: Request, { params }: {params: IParams}){
    
    const { taskId } = params;
    const { tasks } = await fetcher('http://localhost:3000/api/tasks');

    const task = tasks.find((task: Record<string, any>) => parseInt(task.id) === parseInt(taskId))

    return NextResponse.json({task})
}
export async function DELETE(req: Request, { params }:  {params: IParams}) {
    const { taskId } = params;

    const { tasks } = await fetcher('http://localhost:3000/api/tasks');

    const filteredTasks = tasks.filter((task: Record<string, any>) => {
        return parseInt(task.id) !== parseInt(taskId); // Convert task.id to a number for comparison
    });

    try {
        await writeFile('./app/api/tasks/data.json', JSON.stringify(filteredTasks))

        return NextResponse.json({
            tasks: filteredTasks
        }, {
            status: 200,
            statusText: "Ok"
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }


}
export async function PATCH(req: Request, { params }:  {params: IParams}) {
    const { taskId } = params;
    const updatedTask = await req.json();
    const { tasks } = await fetcher('http://localhost:3000/api/tasks');

    const filteredTasks = tasks.filter((task: Record<string, any>) => {
        return parseInt(task.id) !== parseInt(taskId); // Convert task.id to a number for comparison
    });

    filteredTasks.push(updatedTask)

    try {
        await writeFile('./app/api/tasks/data.json', JSON.stringify(filteredTasks))

        return NextResponse.json({
            tasks: filteredTasks
        }, {
            status: 200,
            statusText: "Ok"
        })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }


}


