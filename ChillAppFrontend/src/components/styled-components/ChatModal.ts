import styled from 'styled-components';
import { RootVariables } from './root';

export const ModalBoxContainer = styled.div 
`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index : 1;

    top : 0;
    left : 0;
`

export const ModalMainBox = styled.div 
`
    background-color : white;
    height : 90%;
    width : 50%;
    z-index : 10;

    display : flex;
    flex-direction : column;
`

export const ModalHeader = styled.div 
`
    display : flex;
    justify-content : space-between;
    align-items : center;
    background-color : ${RootVariables.__var_purple};
`

export const ModalIMG = styled.img 
`
    height : 50px;
    width : 50px;
`

export const ModalKeyboardContainer = styled.div 
`
    display : flex;
`

export const ModalInput = styled.input ``

export const ModalSendButton = styled.button ``

export const ModalMessage = styled.span ``

export const ModalRollBack = styled.span ``