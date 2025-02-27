import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "./Button";
import { ClipboardDocumentCheckIcon, ClipboardIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants/constants";

interface ShareBrainProps {
    open: boolean;
    onClose: () => void;
}

export const ShareBrain = ({ open, onClose }: ShareBrainProps) => {
    const [isShared, setIsShared] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            if(response.data.success) {
                setLoading(false);
                setIsShared(true);
                setShareLink(`${window.location.origin}/shared/${response.data.link}`);
            }
        } catch (error) {   
            console.error(`Error sharing link: ${error}`);
        }
    }

    const handleUnshare = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                share: false
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            if(response.data.success) {
                setLoading(false);
                setIsShared(false);
                setShareLink("");
            }
        } catch (error) {
            console.error(`Error unsharing link: ${error}`);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return <div>
        {open && (
            <div className="h-screen w-screen bg-slate-500 bg-opacity-70 fixed top-0 left-0 flex justify-center items-center">
                <div className="bg-white max-w-96 w-full rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Share Your Brain</h1>
                        
                        <div onClick={onClose} className="cursor-pointer rounded-md p-0.5 bg-customPurple-400 text-customPurple-600 hover:text-white hover:bg-customPurple-600 transition-colors duration-100">
                            <XMarkIcon className="w-5 h-5" />
                        </div>
                    </div>
                    
                    <div>
                        {isShared ? (
                            <>
                                <p className="text-gray-500 mt-5">
                                    Your brain is currently shared. Here's your share link:
                                </p>

                                <div className="flex items-center space-x-2 mt-3">
                                    <input 
                                        type="text"
                                        value={shareLink}
                                        readOnly
                                        className="flex-grow p-2 border rounded-lg outline-none"
                                    />

                                    <Button 
                                        variant="secondary"
                                        size="md"
                                        title={isCopied ? "Copied" : "Copy"}
                                        onClick={copyToClipboard}
                                        startIcon={
                                            isCopied ? (
                                                <ClipboardDocumentCheckIcon className="w-5 h-5" />
                                            ) : (
                                                <ClipboardIcon className="w-5 h-5" />
                                            )
                                        }
                                    />
                                </div>

                                <div className="mt-3">
                                    {loading ? (
                                        <Button 
                                            variant="full-width"
                                            title="loading..."
                                            size="md"
                                        />
                                    ) : (
                                        <Button 
                                            variant="full-width"
                                            title="Stop Sharing"
                                            size="md"
                                            onClick={handleUnshare}
                                        />
                                    )}
                                </div>    
                            </>
                        ) : (
                            <>
                                <p className="text-gray-500 mt-5">
                                    Share your brain to allow others to view your content.
                                </p>

                                <div className="mt-3">
                                    {loading ? (
                                        <Button 
                                            variant="full-width" 
                                            title="loading..."
                                            size="md" 
                                        />
                                    ) : (
                                        <Button 
                                            variant="full-width" 
                                            title="Share Brain"
                                            size="md" 
                                            onClick={handleShare}
                                            startIcon={<Square2StackIcon className="w-5 h-5" />} 
                                        />
                                    )}
                                </div>
                            </>
                        )}  
                    </div>    
                </div>
            </div>
        )}
    </div>
}