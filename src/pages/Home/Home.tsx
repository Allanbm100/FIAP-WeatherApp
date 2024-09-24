import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityData, setCityData] = useState();
  // const [inicialCity, setInicialCity] = useState<number>(244);

  console.log(location);


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

  useEffect(() => {
    if (!location.state) {
      const inicialCity = 244
      loadCity(inicialCity);
      return
    }

    loadCity(location.state.cityCode)
  }, [])

  return (
    <Layout>
      <h1>Home</h1>
      <div>
        {isLoading
          ? <p>Carregando</p>
          : <div>
            <h2>
              {cityData?.cidade}/{cityData?.estado}
            </h2>
            <p>
              Min <span>{cityData?.clima[0].min}</span> /
              Max <span>{cityData?.clima[0].max}</span>
            </p>
            <p>{cityData?.clima[0].condicao_desc}</p>
          </div>
        }
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
