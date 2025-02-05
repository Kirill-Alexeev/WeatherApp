import React from "react";
import searchIcon from "../img/icons/other_icons/search_icon.svg";
import burgerMenuIcon from "../img/icons/other_icons/burger_menu_icon.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__wrap">
        <button className="search__btn">
          <img src={searchIcon} alt="Поиск" className="search__img" />
        </button>
        <button className="menu__btn">
          <img src={burgerMenuIcon} alt="Меню" className="menu__img" />
        </button>
      </div>
    </header>
  );
}

export default Header;
