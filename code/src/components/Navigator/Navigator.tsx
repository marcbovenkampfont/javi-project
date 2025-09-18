import { NavLink } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/constants/appRoutes'
import { useModal } from '../../utils/modalContext';

export const NavigatorType = {
    DRAWER_TYPE: "drawer_type",
    HEADER_TYPE: "header_type"
} as const;

export type NavigatorType = (typeof NavigatorType)[keyof typeof NavigatorType]

type NavigatorProps = {
    type: NavigatorType;
}

export const Navigator: React.FC<NavigatorProps> = ({type}) => {

  const { closeRightMenu } = useModal()

  const onHandleClick = () => {
    if (type === NavigatorType.DRAWER_TYPE) {
      closeRightMenu()
    }
  }

  return (
    <nav className={`${type === NavigatorType.HEADER_TYPE ? "header__nav header__nav--desktop" : "header__nav header__nav--mobile"}`}>
      <NavLink onClick={onHandleClick} to={APP_ROUTES.home} className={({isActive}) => "header__nav-link " + (isActive ? "header__nav-link--active" : "") } >Index</NavLink>
      <NavLink onClick={onHandleClick} to={APP_ROUTES.entrenamientos} className={({isActive}) => "header__nav-link " + (isActive ? "header__nav-link--active" : "") } >Entrenamientos</NavLink>
      <NavLink onClick={onHandleClick} to={APP_ROUTES.roles} className={({isActive}) => "header__nav-link " + (isActive ? "header__nav-link--active" : "") } >Roles</NavLink>
      <NavLink onClick={onHandleClick} to={APP_ROUTES.perfil} className={({isActive}) => "header__nav-link " + (isActive ? "header__nav-link--active" : "") } >Perfil</NavLink>
      <NavLink onClick={onHandleClick} to={"*"} className={({isActive}) => "header__nav-link " + (isActive ? "header__nav-link--active" : "") } >Resultados</NavLink>
    </nav>
  )
}
