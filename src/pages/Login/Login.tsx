import { useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Layout } from "../../components/Layout/Layout";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const { setUserName } = useContext(UserContext)
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event?.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSendLogin = async (params: object) => {
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (data) {
        sessionStorage.setItem("userToken", JSON.stringify(data));

        const userData = jwtDecode(data.token);
        setUserName(userData.name);
        // setName(userName.name);

        navigate("/perfil");
      }
    } catch (error) {
      console.log("error", error);

    } finally {
      console.log('finaly');

    };
  }

  const handleClick = () => {
    const params = {
      login: login,
      password: password
    }; // Isso é uma forma de colocar as informações em um objeto

    handleSendLogin(params);
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form>
        <Input
          type="text"
          id="login"
          name="login"
          label="Login"
          onChange={handleLogin}
          placeholder="digite seu email"
        />

        <Input
          type="password"
          id="password"
          name="password"
          label="Senha"
          onChange={handlePassword}
        />

        <Button type="button" onClick={handleClick}>
          Login
        </Button> {/* Esse elemento tem que retornar algo por usar informações da página (ou apenas o event) */}
      </form>
    </Layout>
  )
}
