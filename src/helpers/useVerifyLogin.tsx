// Isso é um hook costumizado. Estamos criando-o pois na verifyLogin.tsx
// Precisava de um, porém não dá para chamar uma função com um hook em outra página.

// PRECISA COMEÇAR COM USE O NOME

import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

export const useVerifyLogin = () => {
    const { setUserName } = useContext(UserContext);

    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('userToken'));

        if (sessionData) {
            const userData = jwtDecode(sessionData.token);
            setUserName(userData.name)
        }
        }, [setUserName]) // Array de dependencia
}