"use client";
import { useSession } from "next-auth/react";
import CardLogin from "./_components/card-login";

const Login =()=>{    
    return <div  className="w-full">
        <CardLogin/>
    </div>
}
export default Login;