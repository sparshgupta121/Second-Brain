import React, { useRef, useState } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../../constants/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

enum ContentType {
    Youtube = "YOUTUBE",
    Twitter = "TWITTER",
    Document = "DOCUMENT",
    Link = "LINK",
    Tag = "TAG",
    Content = "CONTENT"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateContentModal = ({open, onClose}: CreateContentModalProps) => {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const contentRef = useRef<HTMLInputElement>();

    const [type, setType] = useState(ContentType.Twitter);
    const [tags, setTags] = useState<string[]>([]);
    
    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const content = contentRef.current?.value;
        
        await axios.post(`${BACKEND_URL}/content/create`, {
            title,
            link,
            type,
            content,
            tags
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        
        onClose();
    }

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.currentTarget.value) {
            e.preventDefault();
            setTags([...tags, e.currentTarget.value]);
            e.currentTarget.value = "";
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    }

    return <div>
        {open && ( 
            <div className="h-screen w-screen bg-slate-500 fixed top-0 left-0 bg-opacity-70 flex justify-center items-center">
                <div className="max-w-80 w-full rounded-xl bg-white p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Create Content</h1>
                        
                        <div onClick={onClose} className="cursor-pointer rounded-md p-0.5 bg-customPurple-400 text-customPurple-600 hover:text-white hover:bg-customPurple-600 transition-colors duration-100">
                            <XMarkIcon className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <Input reference={titleRef} placeholder="Title" />

                        <div className="relative mt-3">
                            <button
                                id="dropdownDefaultButton"
                                className="w-full text-gray-700 bg-white border border-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 text-left items-center outline-none flex justify-between"
                                type="button"
                                onClick={() => document.getElementById("dropdown")?.classList.toggle("hidden")}
                            >
                                {type} 
                               <ChevronDownIcon className="w-5 h-5" />
                            </button>

                            <div
                                id="dropdown"
                                className="hidden absolute z-10 mt-1 w-full bg-white divide-y divide-gray-100 rounded-lg border"
                            >
                                <ul className="py-2 text-sm text-gray-700 font-medium">
                                    {Object.values(ContentType).map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => {
                                                setType(option);
                                                document.getElementById("dropdown")?.classList.add("hidden");
                                            }}
                                            className="cursor-pointer px-4 py-2 hover:bg-customPurple-400 hover:text-customPurple-600"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Input reference={linkRef} placeholder="Link (optional)" />
                        <Input reference={contentRef} placeholder="Content (optional)" />

                        <div className="mt-3">
                            <input
                                type="text"
                                placeholder="Add tags (press Enter)"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                                onKeyPress={handleAddTag}
                            />
                            <div className="flex flex-wrap gap-2 mt-1">
                                {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-customPurple-400 text-customPurple-600 px-2 py-1 rounded-full text-sm flex items-center"
                                >
                                    {tag}
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 text-customPurple-600"
                                    >
                                    &times;
                                    </button>
                                </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button onClick={addContent} variant="full-width" title="Create Content" size="md" />
                    </div>
                </div>
            </div>
        )}
    </div>
}