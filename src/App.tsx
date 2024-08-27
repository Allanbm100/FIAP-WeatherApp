import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LazyHome = lazy(() => import('./pages/Home/Home'))
const LazySearch = lazy(() => import('./pages/Search/Search'))
const LazyProfile = lazy(() => import('./pages/Profile/Profile'))

function App() {
  return (
    <BrowserRouter>  {/* Isso aqui faz com que consigamos linkar uma página a outra (uma rota), necessita das demais tags abaixo */}
      <Suspense fallback={<>Carregando...</>}> {/* Serve para deixar uma msg enquanto a próxima página carrega */}
        <Routes> {/* Aqui define as rotas em si */}
          <Route path="/" element={<LazyHome />} /> {/* Assim importamos uma página (p.s: Apenas "/" é por ser a Home */}
          <Route path="/busca" element={<LazySearch />} />
          <Route path="/perfil" element={<LazyProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
