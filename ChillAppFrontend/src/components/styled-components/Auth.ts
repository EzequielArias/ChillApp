import styled from 'styled-components';
import { RootVariables } from './index';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

export const AuthContainer = styled.div 
`
    position : relative;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : ${RootVariables.__var_LightBackground};

    height : 80vh;
    width : 100%;
`

export const AuthForm = styled.div 
`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    background-color : ${RootVariables.__var_DarkPurple};
    padding : 20px;

    padding: 20px;
    border-radius: 5px; 
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9); 
`

export const AuthInputs = styled.input 
`
    border : none;
    margin : 5px;
    padding : 5px;
    font-size : 15px;
    background-color : ${RootVariables.__var_DarkPurple};

    color : ${RootVariables.__var_white};

    border-bottom : 0.5px solid gray;

    &::placeholder {
        color : ${RootVariables.__var_white};
    }
`

export const AuthButton = styled.button 
`
    background-color : ${RootVariables.__var_purple};

    margin : 5px 0 5px 0 ;
    padding : 5px;
    font-size : 15px;
    border-radius : 8px;
    border : none;

    &:hover {
        background-color : ${RootVariables.__var_lightPurple};
        transition : 0.3s;
        cursor : pointer;
    }
`

export const AuthAdvice = styled.span 
`
    margin : 5px;
    
    &:hover {
        cursor : pointer;
        color : ${RootVariables.__var_white};
        transition : 0.3s;
    }
`

export const ModalContainer = styled.div 
`
    position : absolute;
    background-color : ${RootVariables.__var_LightBackground};
    height : 100%;
    width : 100%
`

export const AuthModal = styled.ul 
`
    display : flex;
    height : 100%;
    width : 100%
    justify-content : end;
    align-items : center;
    overflow : hidden;
`

export const ModalAvatars = styled.img 
`
    height : 100%;
    width : 490px;
`

export const LeftArrow = styled(BsFillArrowLeftCircleFill) 
`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 20px;
  font-size: 50px;
  font-weight: 700;
  color: ${RootVariables.__var_lightPurple};
  z-index: 1;
  cursor: pointer;
`

export const RightArrow = styled(BsFillArrowRightCircleFill) 
`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 20px;
  font-size: 50px;
  font-weight: 700;
  color: ${RootVariables.__var_lightPurple};
  z-index: 1;
  cursor: pointer;
`
