import { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { searchMock } from "../../mocks/searchMock";

export default function Search() {
  {/* Esse 'export default' serve para exportarmos uma página completa */ }
  const [cityName, setCityName] = useState<string>();
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [cityList, setCityList] = useState(searchMock);
  const [noResult, setNoResult] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  }; //Isso utiliza o const useState + onChange = {handle...} para capturar dados do input

  const loadCities = async () => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cityName}`);

      const data = await response.json();
      console.log(data);

      setCityList(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    loadCities();
  };

  const handleClear = () => {
    setHasSearch(false);
    setCityName('');
    setNoResult(false);
  };

  return (
    <Layout>
      <h1>Busca</h1>
      <form>
        <label htmlFor="search">Buscar cidade</label>
        <input
          type="text"
          id="search"
          name="search"
          onChange={handleChange}
        // value={cityName}
        />
        <button type="button" onClick={handleClick}>Buscar</button>
      </form>
      {hasSearch ? (
        <div>
          <p>Busca pela cidade: {cityName}</p>
          <button onClick={handleClear}>Limpar Busca</button>

          <ul>
            {
              cityList.map((city) => (
                <li key={city.id}> {/* Esse 'key' serve pq precisamos definí-lo caso citemos um .map */}
                  {city.nome} / {city.estado}
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
};
