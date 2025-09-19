import { useOutlet } from "react-router-dom";
import './layout.scss'
import { cloneElement, type ReactElement } from "react";
import Header from "../components/Header/Header";
import { NavigatorType } from "../components/Navigator/Navigator";
import { Navigator } from "../components/Navigator/Navigator"
import { useModal } from "../utils/modalContext";
import { ModalType } from "../shared/types/modal.types";
import ModalDrawer from "../components/ModalDrawer/ModalDrawer";
import ButtonCustom from "../components/ButtomCustom/ButtonCustom";
import logo from "../assets/logo-spartan.png"
// import Header from "../components/Header/Header";
// import ModalDrawer from "../components/ModalDrawer/ModalDrawer";
// import ModalMulta, { ModalMultaType } from "../components/ModalMulta/ModalMulta";
// import { useModal } from "../utils/menuContext";
// import { ModalType } from "../shared/types/modalMulta.types";
// import SettingsModal from "../components/SettingsModal/SettingsModal";

const Layout = () => {
      const outletElement = useOutlet();

    const { modalType, isRightMenuOpen, closeRightMenu } = useModal();
    console.log("isRightMenuOpen", isRightMenuOpen)

    const renderModal = () => {
        switch (modalType) {
            case ModalType.MENU:
                return <div style={{ width: '100%', height: '100%', backgroundColor: 'grey'}}>
                    <div key="headerModal" style={{ height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: "center" , padding: '5px 15px', marginBottom: "30px"}}>
                        <img style={{ height: "30px"}} src={logo} alt="" />
                        <ButtonCustom border={false} onClick={closeRightMenu} >
                            <a style={{ fontSize: "20px"}}>X</a>
                        </ButtonCustom>
                    </div>
                    <Navigator type={NavigatorType.DRAWER_TYPE} />;
                </div> 
        }
    }

    // const navigate = useNavigate();
    // const homeMatch = useMatch(APP_ROUTES.home);
    // const resumeMatch = useMatch(APP_ROUTES.resume);
    // const addMultaMatch = useMatch(APP_ROUTES.addMulta);
    // const updateMultaMatch = useMatch(APP_ROUTES.updateMulta);

    return (
        <>
            <div className="layout">
                {/* {homeMatch ? */}
                {/* <> */}
                    <Header />
                    <div style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column'}}>   
                        {cloneElement(outletElement as ReactElement)}
                    </div>
                {/* </> */}
                {/* :
                <>
                    <Header />
                    <div className="main_content">
                        {cloneElement(outletElement as ReactElement)}
                    </div>
                </>
                } */}
            </div>

            <ModalDrawer
                placement="right"
                visible={isRightMenuOpen}
            >
                {renderModal()}
            </ModalDrawer>
        </>
    )
}

export default Layout