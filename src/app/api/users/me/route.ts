
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try{
        const userdata: any = await getDataFromToken(request);
        return NextResponse.json({
            username: userdata.username,
            email: userdata.email
        })
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}