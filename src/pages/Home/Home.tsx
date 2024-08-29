import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { cityMock } from "../../mocks/cityMock"

export default function Home() {
  {/* Esse 'export default' serve para exportarmos uma página completa */ }

  const [city, setCity] = useState();
  useEffect(() => {
    setCity(cityMock);
  }, [])
  

  return (
    <Layout>
      <h1>Home</h1>

      <p>
        {city?.cidade} / {city?.estado} {/* O '?' (nullish) serve como um 'try', se caso o dado não existir, ele não utiliza */}
      </p>

    </Layout>
  );
};
