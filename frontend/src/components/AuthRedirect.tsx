import { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface AuthRedirectProps {
    children: ReactNode
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if(isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? null : <>{children}</>
};