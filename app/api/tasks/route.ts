
import { appendFile, readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/libs/getCurrentUser";
export async function GET() {


    const currentUser = await getCurrentUser();

    const allTasks = await prisma.task.findMany({
        where: {
            user: {
                email: currentUser?.email
        }
        }
    })



    return NextResponse.json({
       tasks: allTasks
    }, {
        status: 200,
        statusText: "Ok"
    })
}
export async function POST(req: Request, res: Response) {


    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.json(
            {message: "Error No Current User"}, {status: 404})
    }


    try {
        const taksToAdd = await req.json();
        console.log(taksToAdd)
        const {
            title,
            description,
            hours,
            deadline,
            status
        } = taksToAdd;
        const task = await prisma.task.create({
            data: {
                userId: currentUser.id,
                title,
                description,
                hours,
                deadline,
                status: status.value
            }
        });


       


        return NextResponse.json(task)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}