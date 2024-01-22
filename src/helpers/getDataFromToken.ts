import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function getDataFromToken (request: NextRequest){
    try{
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken;
    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}