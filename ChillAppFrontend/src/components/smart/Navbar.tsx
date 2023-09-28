import {
    NavbarContainer,
    SimpleText
} from '../styled-components';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const dispatch = useDispatch();

  const handleClick = () => dispatch(login("asd"));

  return (
    <NavbarContainer>
        <SimpleText onClick={handleClick}>TEXTO DE EJEMPLO</SimpleText>
        <Link to={"/admin-dashboard"}>hacia el dashboard</Link>
    </NavbarContainer>
  )
}
