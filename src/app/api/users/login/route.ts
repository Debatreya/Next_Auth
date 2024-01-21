import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();        
        const {email, password} = reqBody
        if(!email || !password){
            return NextResponse.json(
                {error: "All fields required"},
                {status: 500}
            )
        }
        console.log(reqBody);
        
        // Check whether user exixts
        const user = await User.findOne({email});
        console.log(reqBody);
        
        if(!user){
            return NextResponse.json(
                {error: "User doesnot exists, Please SignUp"},
                {status: 400}
            )
        }
        console.log(user);
            
        // Compare password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json(
                {error: "Incorrect Password"},
                {status: 400}
            )
        }
        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            username: user.username
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
        
    } catch (error : any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}