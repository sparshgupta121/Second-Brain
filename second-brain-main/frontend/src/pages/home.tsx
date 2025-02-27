import { BookmarkIcon, ClipboardIcon, CodeBracketIcon } from "@heroicons/react/24/solid";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="bg-gradient-to-br from-neutral-50 to-sky-50 h-screen w-screen">
            <div className="fixed">
                <NavBar />
                <Hero />
                <Footer />
            </div>
        </div>
    );
}

const NavBar = () => {
    return <nav className="flex justify-between items-center drop-shadow-md h-16 bg-white">
        <h1 className="ml-6 text-2xl text-blue-700 font-semibold">Second Brain</h1>

        <div>
            <Link to={"/signin"} className="text-blue-600 border-blue-600 font-normal text-lg w-24 p-2 mr-3 rounded-lg hover:border">
                Sign In
            </Link>

            <Link to={"/signup"} className="bg-blue-600 text-white font-light text-lg w-24 p-2 mr-6 rounded-lg hover:bg-blue-700 transition-colors duration-150">
                    Sign Up
            </Link>
        </div>    
    </nav>
}

const Footer = () => {
    return <div className="flex justify-center items-center border-t h-16 w-full fixed bottom-0 bg-white">
        <p className="text-gray-400 text-lg font-light">© 2024 SecondBrain. All rights reserved.</p>
    </div>
}

const Hero = () => {
    return <div className="h-full w-screen flex -z-10">
        <div className="w-1/2 flex flex-col justify-center p-28">
            <h1 className="text-6xl font-bold tracking-wide">
                Your Digital Brain <br /> 
                for <span className="text-blue-600"> Endless <br /> Knowledge</span>
            </h1>

            <p className="mt-10 font-extralight tracking-wide">
                Bookmark, organize, and access your digital content effortlessly. <br /> Transform scattered information into a structured knowledge base that grows with you.
            </p>

            <div className="mt-10">
                <Link to={"/signin"}>
                    <button className="bg-blue-600 text-white text-lg w-44 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-150">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>

        <div className="w-1/2 flex justify-center items-center relative">
            <div className="absolute w-4/5 h-80 rounded-2xl bg-gradient-to-br from-sky-100 to-fuchsia-100 transform z-0" style={{ rotate: "4deg"}}></div>

            <div className="bg-white w-4/5 rounded-xl flex flex-col justify-center items-center p-5 z-20 border">
                <Input 
                    title="Quick Bookmark"
                    subTitle="Save anything in seconds"
                    startIcon={
                        <div className="bg-blue-100 text-blue-600 rounded-lg w-10 h-10 flex justify-center items-center">
                            <BookmarkIcon className="w-6 h-6 " /> 
                        </div>        
                    }
                />

                <Input 
                    title="Smart Organization"
                    subTitle="Auto-categorize content"
                    startIcon={
                        <div className="bg-green-100 text-green-600 rounded-lg w-10 h-10 flex justify-center items-center">
                            <ClipboardIcon className="w-6 h-6 " /> 
                        </div>        
                    }
                />

                <Input 
                    title="Universal Search"
                    subTitle="Find anything instantly"
                    startIcon={
                        <div className="bg-pink-100 text-pink-600 rounded-lg w-10 h-10 flex justify-center items-center">
                            <CodeBracketIcon className="w-6 h-6 " /> 
                        </div>        
                    }
                />
            </div>
        </div>
    </div>
}

interface InputProps {
    title: string;
    subTitle: string;
    startIcon: ReactElement;
}

const Input = ({ title, subTitle, startIcon }: InputProps) => {
    return <div className="bg-gray-50 border border-gray-100 flex items-center rounded-lg w-full h-20 m-2">
        <div className="ml-4">
                {startIcon}
        </div>

        <div className="ml-4">
            <div className="font-semibold">
                {title}
            </div>
            <p className="text-sm text-gray-500"> {subTitle} </p>
        </div>
    </div>
}