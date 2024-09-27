import { useContext, useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Header } from "../../components/Header/Header";
import { useVerifyLogin } from "../../helpers/useVerifyLogin";

export default function Home() {
  const location = useLocation();

  useVerifyLogin();
  const { userName } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityData, setCityData] = useState();
  const [forecast, setForecast] = useState([]);
  // const [inicialCity, setInicialCity] = useState<number>(244);

  console.log(location);

  const dateFormat = (data: string) => {
    return new Date(data).toLocaleDateString('pt-br', { timeZone: 'UTC' });
  }

  const loadCity = async (cityCode: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`);
      const data = await response.json();
      setCityData(data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const loadForecast = async (cityCode: number) => {

    const params = {
      code: cityCode,
      days: 6
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${params.code}/${params.days}`
      ); //path Param (existem query param tb)
      
        const data = await response.json();
      setForecast(data.clima);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!location.state) {
      const inicialCity = 244
      loadCity(inicialCity);
      loadForecast(inicialCity)
      return
    }

    loadCity(location.state.cityCode)
    loadForecast(location.state.cityCode)
  }, [])

  return (
    <Layout>
      <Header title="Home" userName={userName} />
      <div>
        {isLoading
          ? (<p>Carregando</p>
          ) : (
            <div>
              <h2>
                {cityData?.cidade}/{cityData?.estado}
              </h2>
              <p>
                Min <span>{cityData?.clima[0].min}</span> /
                Max <span>{cityData?.clima[0].max}</span>
              </p>
              <p>{cityData?.clima[0].condicao_desc}</p>
            </div>
          )}
      </div>
      <div>
        {forecast.map((item) => (
          <div key={item.data}>
            <span>{dateFormat(item.data)}</span>
            <span>{item.condicao}</span>
            <span>Min: {item.min}&#176;</span>
            <span>Max: {item.max}&#176;</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// {/* Esse 'export default' serve para exportarmos uma página completa */ }

// const [city, setCity] = useState([]);

// const LoadCities = async () => { //O "async" torna o processamento assíncrono

//   // -----------------------------------------------------------------------------------------------
//   // P.S: Mema fita do try-catch usado abaixo, porém mais antiga e não tão usada
//   // -----------------------------------------------------------------------------------------------
//   // GET - Modelo da API
//   // fetch('https://brasilapi.com.br/api/cptec/v1/cidade') //Aqui fizemos uma requisição
//   //   .then((response) => { //Isso é um promise (promete que algo irá retornar)
//   //     console.log(response);
//   //     return response.json();
//   //   })

//   //   .then((data) => {
//   //     console.log(data);
//   //     setCity(data);
//   //   })

//   //  .catch() Serve para retornar os erros
//   //  .finally() Serve para quando finaliza a requisição
//   // -----------------------------------------------------------------------------------------------

//   try {
//     const response = await fetch('https://brasilapi.com.br/api/cptec/v1/cidade')
//     const data = await response.json() //O "Await" diz que isso vai ocorrer antes de continuar, ou seja, esperar
//     setCity(data)

//   } catch (error) {
//     console.log(error)
//   }
// }

// useEffect(() => {
//   // setCity(cityMock);
//   // console.log("useEffect");

//   // if (city.length === 0) {
//   //   return;
//   // }

//   LoadCities();
// }, []);
