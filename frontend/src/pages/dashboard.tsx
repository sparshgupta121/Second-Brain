import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Sidebar } from "../components/ui/Sidebar";
import { PlusIcon } from "lucide-react";
import { ShareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { ShareBrain } from "../components/ui/ShareBrainModal";

interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "YOUTUBE" | "TWITTER" | "DOCUMENT" | "LINK" | "TAG" | "CONTENT";
  tags?: string[];
  createdAt: string;
  content?: string;
}

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModal] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    fetchContents();
  }, [])

  const fetchContents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content/get`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      if(response.data.success) {
        setContents(response.data.contents);
      }
    } catch (error) {
      console.error(`Error while fetching contants: ${error}`);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/content/delete`, {
          data: {
            contentId: id
          }, 
          headers: {
            "Authorization": localStorage.getItem("token")
          }
      });
      if(response.data.success) {
        setContents(contents.filter((content) => content._id !== id));
      }
    } catch (error) {
      console.error(`Error deleting content: ${error}`);
    }
  }

  return (
    <div>
      <Sidebar />

      <div className="p-4 ml-72 bg-customPurple-200 min-h-screen">
        <div className="flex justify-between items-center">
          <div className="ml-5">
            <h1 className="text-3xl font-semibold">All Bookmarks</h1>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button 
              variant={"secondary"} 
              size={"md"}
              title={"Share Brain"} 
              startIcon={<ShareIcon className="w-5 h-5" />}
              onClick={() => {
                setShareModal(true);
              }}
            />
            <Button 
              variant={"primary"} 
              size={"md"}
              title={"Add Content"} 
              startIcon={<PlusIcon className="w-5 h-5" />}
              onClick={() => {
                setModalOpen(true);
              }}  
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {contents.map((contentD) => (
            <Card key={contentD._id} {...contentD} onDelete={handleDelete} />
          ))}
        </div>

        {/* Modal */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchContents(); // Refresh contents after closing modal
          }}
        />
        <ShareBrain 
          open={shareModalOpen}
          onClose={() => {
            setShareModal(false);
          }}
        />
      </div>
    </div>
  )
}
