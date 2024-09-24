import { useNavigate } from "react-router-dom"
import { StyledHeader, StyledUserData, StyledUserDataButton } from "./Header.style"
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface HeaderProps {
    title: string;
    userName: string;
}

export const Header = ({ title, userName }: HeaderProps) => {
    const navigate = useNavigate();
    const { setUserName } = useContext(UserContext);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userToken');
        setUserName(null);
        navigate('/login');
    };

    return (
        <StyledHeader>
            <h1>{title}</h1>
            <StyledUserData>
                {userName ? (
                    <>
                        <span>{userName}</span>
                        <StyledUserDataButton onClick={handleLogout}>Sair</StyledUserDataButton>
                    </>
                ) : (
                    <StyledUserDataButton onClick={handleLogin}>Login</StyledUserDataButton>
                )}
            </StyledUserData>
        </StyledHeader>
    );
};