import { NextResponse } from "next/server";


export default async function POST(req:Request){
    const body = await req.json() 
    try {
        console.log(body)
    } catch (error) {
        return NextResponse.json({message:"Request failed",error})
    }
}