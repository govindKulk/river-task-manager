import { fetcher } from "@/app/helpers/fetcher";
import getCurrentUser from "@/app/libs/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
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


   

    try {
        const task = await prisma.task.delete({
            where: {
                id: taskId[0]
            }
        })

        return NextResponse.json({
            task
        }, {
            status: 200,
            statusText: "Ok"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }


}
export async function POST(req: Request, { params }:  {params: IParams}) {


    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    
    
    
    
    try {
        const { taskId } = params;
        const updatedTask = await req.json();
        console.log(taskId)

        const {
            title,
            status,
            description
        } = updatedTask;

        const task = await prisma.task.update({
            where: {
                id: taskId[0]
            },
            data: {
                title,
                status,
                description
            }
        })
        
        return NextResponse.json({
            task
        }, {
            status: 200,
            statusText: "Ok"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }


}


