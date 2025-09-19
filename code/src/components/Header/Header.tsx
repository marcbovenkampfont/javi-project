import React from "react";
import "./Header.scss";
import { Navigator, NavigatorType } from "../Navigator/Navigator"
import { useModal } from "../../utils/modalContext";
import { ModalType } from "../../shared/types/modal.types";
import ButtonCustom from "../ButtomCustom/ButtonCustom";
import logo from "../../assets/logo-spartan.png"

const Header: React.FC = () => {

  const { openRightMenu } = useModal()

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__title">
          <img className="header__title-logo" src={logo} alt="" />
          <h1 className="header__title-text">Spartan Race</h1>
        </div>
        <Navigator type={NavigatorType.HEADER_TYPE} />
        <ButtonCustom className="header__menu-btn" border={true} onClick={() => openRightMenu(ModalType.MENU)}>
          ☰
        </ButtonCustom>
      </div>
    </header>
  );
};

export default Header;
