import React from "react";
import "./Header.scss";
import { Navigator, NavigatorType } from "../Navigator/Navigator"
import { useModal } from "../../utils/modalContext";
import { ModalType } from "../../shared/types/modal.types";
import ButtonCustom from "../ButtomCustom/ButtonCustom";

const Header: React.FC = () => {

  const { openRightMenu } = useModal()

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Spartan Race</h1>
        <Navigator type={NavigatorType.HEADER_TYPE} />
        {/* <div className="header__menu-cont"> */}
        <ButtonCustom className="header__menu-btn" border={true} onClick={() => openRightMenu(ModalType.MENU)}>
          ☰
        </ButtonCustom>
          {/* <button className="header__menu-cont-btn" onClick={() => openRightMenu(ModalType.MENU)}>
            ☰
          </button> */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Header;
