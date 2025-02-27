import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../constants/constants";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/user/checkAuth`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
    
                if(response.data.success) {
                    setIsAuthenticated(response.data.isAuthenticated);
                }
            } catch (error) {
                console.error(`Error checking authentication: ${error}`);
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, []);

    return { isAuthenticated };
};