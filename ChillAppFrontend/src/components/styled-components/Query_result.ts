import styled from 'styled-components';
import { RootVariables } from '.';

export const QueryResultContainer = styled.div 
`
    background-color : ${RootVariables.__var_LightGray};
    height : 84vh;
    width : 100%;
    position : relative;
`

export const ResultULContainer = styled.ul 
`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    padding : 5px;
`

export const ResultSlot = styled.li 
`
    height : 10vh;
    background-color : ${RootVariables.__var_white};
    margin : 3px;
    border-radius : 15px;

    display : flex;
    align-items : center;
    justify-content : space-evenly;

    &:hover {
        cursor : pointer;
        transform : scale(1.02);
    }
`

export const SlotLIItemsContainer = styled.span 
`
    display : flex;
    justify-content : center;
    align-items : center;
`

export const SlotUser = styled.span 
`
    color : black;
`

export const ResultIMG = styled.img 
`
    height : 50px;
    width : 50px;
    border-radius : 50%;
`

export const LoaderQuery = styled.div 
`
    position : absolute;
    width : 100%;
    height: 100%;
    background-color : red;
    opacity : 0.6;
`

