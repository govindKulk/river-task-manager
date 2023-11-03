import { tasks } from "@/app/data";
import { appendFile, readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {


    const allTasks = await readFile('./app/api/tasks/data.json', 'utf-8')
   

    return NextResponse.json({
        tasks: JSON.parse(allTasks)
    }, {
        status: 200,
        statusText: "Ok"
    })
}
export async function POST(req: Request, res: Response) {
    const taksToAdd = await req.json();
    
    const eTasksRes  = await fetch('http://localhost:3000/api/tasks')
    
    const eJson = await eTasksRes.json();
    console.log(eJson.tasks)
    
    eJson.tasks.push(taksToAdd)
   try{
    await writeFile('./app/api/tasks/data.json', JSON.stringify(eJson.tasks))

    return NextResponse.json({
        tasks: tasks
    }, {
        status: 200,
        statusText: "Ok"
    })
   }catch(error){
    return NextResponse.json({error}, {status: 500})
   }
}