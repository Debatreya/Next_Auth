import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function getDataFromToken (request: NextRequest){
    try{
        const token = await request.cookies.get("token")?.value || '';
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("GetDataFromToken", decodedToken);
        return decodedToken;
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}