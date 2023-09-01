import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  const {email} = await request.json()
  const payload = { email: email };
  const jwtString=jwt.sign({
    ...payload,    
  },"secret" as string,{expiresIn:"2m",} );

  console.log(jwtString);
  
  jwt.verify(jwtString,"secret" as string)  
 return NextResponse.json({"hola":"hola"})
}
