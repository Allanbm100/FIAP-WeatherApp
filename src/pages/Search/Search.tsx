import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import UserContext from "../../context/UserContext";
import { Header } from "../../components/Header/Header";

export default function Search() {
  // Esse 'export default' serve para exportarmos uma página completa

  const navigate = useNavigate();

  const { userName } = useContext(UserContext);
  const [cityName, setCityName] = useState<string>("");
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  }; //Isso utiliza o const useState + onChange = {handle...} para capturar dados do input

  const loadCities = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cityName}`);

      const data = await response.json();
      setCityList(data);

      setCityList(data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    loadCities();
  };

  const handleNavigate = (cityCode: number) => {
    const state = {
      cityCode: cityCode
    }
    navigate("/", { state }); //Usamos para enviar uma informação para outra página
  };

  return (
    <Layout>
      <Header title="Busca" userName={userName} />
      <form>
        <Input
          label="Buscar cidade"
          id="search"
          name="search"
          type="text"
          onChange={handleChange}
        />

        <Button type="button" onClick={handleClick}>
          Buscar
        </Button>
      </form>

      <div>
        {isLoading
          ? (<p>Carregando</p>)
          : (<ul>
            {cityList.map((city) => (
              <li key={city.id} onClick={() => handleNavigate(city.id)}> {/* 'key' existe por conta do .map */}
                {city.nome} / {city.estado}
              </li>
            ))}
          </ul>
          )}
      </div>
    </Layout>
  );
};
