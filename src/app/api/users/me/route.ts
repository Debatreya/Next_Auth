
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
    try{
        const userdata = await getDataFromToken(request);
        // console.log(userdata);
        // return NextResponse.json({
        //     username: userdata.username,
        //     email: userdata.email
        // })
        return NextResponse.json({
            data: userdata
        })
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}