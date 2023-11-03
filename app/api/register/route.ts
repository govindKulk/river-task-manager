import { NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server";
export async function POST(request: Request, res: NextApiResponse){

 try{
    const body = await request.json();

    const {
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user);
 }
 catch(error){
    console.log(error);

    return NextResponse.json({
        messae:"Some Error"
    }, {
        status: 400
    })
 }

    

}