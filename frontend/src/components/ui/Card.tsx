import { 
    DocumentIcon, 
    HashtagIcon, 
    LinkIcon, 
    NewspaperIcon 
} from "@heroicons/react/24/solid";
import { ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TwitterIcon, YoutubeIcon } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface CardProps {
    _id: string;
    title: string;
    link?: string;
    type: "YOUTUBE" | "TWITTER" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
    tags?: string[];
    createdAt: string;
    onDelete: (id: string) => void;
    content?: string;
}

export const Card = ({
    _id,
    title, 
    link, 
    type,
    tags,
    createdAt,
    onDelete,
    content
}: CardProps) => {
    const getIcon = () => {
        switch (type) {
            case "YOUTUBE": 
                return <YoutubeIcon className="w-6 h-6 flex-shrink-0 text-red-500" />;
            case "TWITTER": 
                return <TwitterIcon className="w-6 h-6 flex-shrink-0 text-blue-500" />;
            case "DOCUMENT":
                return <DocumentIcon className="w-6 h-6 flex-shrink-0 text-yellow-500" />; 
            case "LINK":
                return <LinkIcon className="w-6 h-6 flex-shrink-0 text-green-500" />;
            case "TAG":
                return <HashtagIcon className="w-6 h-6 flex-shrink-0 text-purple-500" />;  
            case "CONTENT":
                return <NewspaperIcon className="w-6 h-6 flex-shrink-0 text-gray-500"  />;       
            default:
                return <DocumentIcon className="w-6 h-6 flex-shrink-0 text-gray-500" />;   
        }
    }

    return <div className="p-4 bg-white rounded-xl max-w-80 h-96 overflow-hidden  border border-gray-200">
        {/* Card Header */}
        <div className="flex justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
                {getIcon()}
                <h2 className="text-lg font-semibold text-oxfordblue truncate">
                    {title}
                </h2>
            </div>
            <div className="flex text-gray-400 items-center">
                <div className="pr-2">
                    {link && (
                        <Link
                            to={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-customPurple-600 transition-colors duration-300"
                        >
                            <ShareIcon className="w-5 h-5" />
                        </Link>
                    )}
                </div>
                <button
                    onClick={() => onDelete(_id)}
                    className="hover:text-red-500 transition-colors duration-300"
                    aria-label="Delete"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>    
            </div>
        </div>

        {/* Card Content */}
        <div className="mt-4 overflow-y-auto h-64">
            {type === "YOUTUBE" && link && (
                <div className="mb-4">
                    <iframe 
                        className="w-full h-full rounded-xl" 
                        src={link.replace("watch?v=", "embed/")} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe> 
                </div>    
            )}

            {type === "TWITTER" && link && (
                <div className="mb-4">
                    <blockquote className="twitter-tweet max-w-full overflow-x-auto" data-dnt="true">
                        <a href={link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>
                </div>
            )}    

            {content && (
                <pre className="mt-4 p-3 rounded-md overflow-x-auto text-sm whitespace-pre-wrap">
                    {content}
                </pre>
            )}
        </div>

        {/* Card Footer */}
        <div className="mt-3">
            <div className="flex flex-wrap gap-2 mb-2">
                {tags && tags.map((tag, index) => (
                    <span 
                        key={index}
                        className="bg-customPurple-400 text-customPurple-600 text-xs px-2 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <p className="text-xs text-gray-400">
                Added on {format(new Date(createdAt), "MM dd, yyyy")}
            </p>
        </div>
    </div>
}