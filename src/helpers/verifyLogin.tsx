import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export const verifyLogin = () => {

  const { setUserName } = useContext(UserContext);

  const sessionData = sessionStorage.getItem('userToken');
  if (sessionData) {
    const userData = jwtDecode(sessionData.token);
    setUserName(userData.name)
  }
}
