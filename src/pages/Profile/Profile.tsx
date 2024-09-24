import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import UserContext from "../../context/UserContext";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Header } from "../../components/Header/Header";

export default function Profile() {
  {/* Esse 'export default' serve para exportarmos uma página completa */ }

  const navigate = useNavigate();

  const { userName, setUserName } = useContext(UserContext)

  useEffect(() => {
    const userToken = JSON.parse(sessionStorage.getItem("userToken"));

    if (userToken) {
      const userData = jwtDecode(userToken.token);
      setUserName(userData.name);
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <Layout>
      <Header title='perfil' userName={userName}>

      </Header>
    </Layout>
  );
};
