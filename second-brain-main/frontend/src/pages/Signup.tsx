import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/user/signup`, {
            username, 
            password
        });
        alert("You have signed up!");
        navigate("/signin");
    }

    return <div className="h-screen w-screen bg-customPurple-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-5 flex flex-col justify-center items-center">

            <h1 className="font-bold text-3xl">Signup</h1>

            <div className="mt-4">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                
                <div className="flex justify-center mt-3">
                    <Button
                        variant="full-width"
                        size="md"
                        title="Signup"
                        loading={false}
                        onClick={signup}
                    />
                </div>
            </div>

            <p className="mt-3 text-gray-400">
                Already signed up!
                <Link to={"/signin"} className="cursor-pointer text-customPurple-500"> Signin</Link>    
            </p>
        </div>
    </div>
}