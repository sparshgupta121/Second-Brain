import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Sidebar } from "../components/ui/Sidebar";
import { BACKEND_URL } from "../constants/constants";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "YOUTUBE" | "TWITTER" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  createdAt: string;
  content?: string;
}

export const SharedBrain = () => {
    const { sharedHash } = useParams<{ sharedHash: string }>();
    const [contents, setContents] = useState<Content[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchSharedContents = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/brain/${sharedHash}`);
        
                if(response.data.success) {
                    setContents(response.data.content || []);
                } else {
                    setError("Failed to fetch shared content");
                }
            } catch (error) {
                console.error(`Error while fetching contants: ${error}`);
                setError("Shared hash does not exist");
            } finally {
                setLoading(false);
            }
        }

        fetchSharedContents();
    }, [sharedHash]);

    if(loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center bg-gray-500 text-white">
                Loading...
            </div>
        );
    }

    if(error) {
        return (
            <div className="h-screen w-screen flex justify-center items-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div>
            <Sidebar />

            <div className="p-4 ml-72 bg-customPurple-200 min-h-screen">
                <div className="flex justify-between items-center">
                <div className="ml-5">
                    <h1 className="text-3xl font-semibold">All Bookmarks</h1>
                </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-11">
                    {contents.map((contentData) => (
                        <Card
                            key={contentData._id}
                            {...contentData}
                            onDelete={() => {}}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
