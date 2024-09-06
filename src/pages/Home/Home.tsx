import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
// import { cityMock } from "../../mocks/cityMock"

export default function Home() {
  {/* Esse 'export default' serve para exportarmos uma página completa */ }

  const [city, setCity] = useState([]);

  const LoadCities = () => {
    // GET - Modelo da API
    fetch('https://brasilapi.com.br/api/cptec/v1/cidade') //Aqui fizemos uma requisição
      .then((response) => {
        console.log(response);
        return response.json();
      })

      .then((data) => {
        console.log(data);
        setCity(data);
      })
  }

  useEffect(() => {
    // setCity(cityMock);
    // console.log("useEffect");

    // if (city.length === 0) {
    //   return;
    // }

    LoadCities();
  }, []);

  return (
    <Layout>
      <h1>Home</h1>
      {city.map((item: any) => (
        <p key={item.id}>
          {item?.nome} / {item?.estado} {/* O '?' (nullish) serve como um 'try', se caso o dado não existir, ele não utiliza */ }
        </p>
      ))}
    </Layout>
  );
}

