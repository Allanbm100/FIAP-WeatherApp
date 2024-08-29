import { BiHeart, BiHomeAlt, BiSearch, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StyledMenu, StyledMenuItem, StyledWrapperMenu } from "./Menu.style";

export const Menu = () => {
  return (
    <StyledMenu> {/* Isso substitui o <nav>, está no menu.style.ts como funciona*/}
      <StyledWrapperMenu> {/* Isso substitui o <ul>, está no menu.style.ts como funciona*/}
        <StyledMenuItem> {/* Isso substitui o <li>, está no menu.style.ts como funciona*/}
          <BiHomeAlt size="1.5rem" color="#38aede" />
          <Link to="/">Início</Link> {/* Substituita da tag <a> */}
        </StyledMenuItem>
        <StyledMenuItem>
          <BiSearch size="1.5rem" color="#38aede" />
          <Link to="/busca">Buscar</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <BiHeart size="1.5rem" color="#38aede" />
          <Link to="#">Favoritos</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <BiUserCircle size="1.5rem" color="#38aede" />
          <Link to="/perfil">Perfil</Link>
        </StyledMenuItem>
      </StyledWrapperMenu>
    </StyledMenu>
  );
};
