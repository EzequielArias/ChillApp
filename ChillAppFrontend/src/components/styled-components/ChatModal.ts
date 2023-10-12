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
    width : 98%;
    z-index : 10;
    margin : 5px;
    padding-bottom : 5px;

    display : flex;
    flex-direction : column;
`

export const ModalHeader = styled.div 
`
    display : flex;
    justify-content : space-between;
    align-items : center;
    background-color : ${RootVariables.__var_purple};

    padding : 15px;
`

export const ModalPersonName = styled.span 
`
    color : ${RootVariables.__var_white};
    font-size : 20px;
`

export const ModalIMG = styled.img 
`
    border-radius : 50%;
    height : 50px;
    width : 50px;
`

export const ModalMsgContainer = styled.div 
`
    margin : 10px;
    height : 70vh;
    display : flex;
    flex-direction : column;
`

interface TextBallon extends React.HTMLAttributes<HTMLSpanElement> {
    isMyMessage : boolean
}

export const ModalTextBallon = styled.span<TextBallon>  
`
    width : 100%;
    display : flex;
    justify-content : ${props => props.isMyMessage ? 'flex-start' : 'flex-end'};
`

export const ModalMessage = styled.p 
`
    padding : 10px;
    border-radius : 10px;
    background-color : black;
    width : 50%;
    color : white;
`

export const ModalKeyboardContainer = styled.div 
`
    width : 100%;
    display : flex;
    margin : 5px;
`

export const ModalInput = styled.input 
`
    width : 90%;
    border-radius : 15px;
    font-size : 15px;
    outline : none;
    padding-left : 5px;

`

export const ModalSendButton = styled.button 
`
    width : 9%;
    background-color : ${RootVariables.__var_DarkPurple};
    border-radius : 15px;
    padding : 5px;

    &:hover {
        background-color : ${RootVariables.__var_lightPurple};
        transition : 0.2s;
        cursor : pointer;
    }

    & svg {
        color : ${RootVariables.__var_white};
    }
`

export const ModalRollBack = styled.span 
`
    

    & svg {
        font-size : 20px;

        &:hover {
            color : ${RootVariables.__var_white};
            transition : 0.2s;
            cursor : pointer;
        }
    }
`