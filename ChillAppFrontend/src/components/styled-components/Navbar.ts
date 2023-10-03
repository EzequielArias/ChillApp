import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import { RootVariables } from './root';

// #C080FF

interface SectionProps extends React.LiHTMLAttributes<HTMLLIElement> {
    isActive : boolean;
}

export const NavbarContainer = styled.div 
`
    background-color : #AF69EE;
    display : flex;
    flex-direction : column;
`

export const ToolsContainer = styled.div 
`
    display : flex;
    justify-content : end;
    align-items : center;
    font-size : 35px;
    padding : 15px;
    color : white;
    width : 100%;

    & > svg {
        &:hover {
        background-color : ${RootVariables.__var_lightPurple};
        cursor : pointer;
        }
    }
`

export const InfoContainer = styled.section 
`
    display : flex;
    justify-content : space-evenly;
    align-items : center;

    
`

export const SectionContainer = styled.section 
`
    display : flex;

    & > ul {
        width : 100%;
        display : flex;
        justify-content : space-evenly;
        background-color :  #AF69EE;
    }
`

export const SectionItem = styled.li<SectionProps> 
`
    list-style : none;
    font-size : 20px;
    width : 100%;
    text-align : center;
    position : relative;
    padding : 5px;
    letter-spacing : 0.5px;
    color : ${props => props.isActive ? RootVariables.__var_white : RootVariables. __var_gray};

    &:after {
        content : "";
        position : absolute;
        background-color : #fff;
        height : 3px;
        width : ${props => props.isActive ? '100%' : '0'};
        left : 0;
        bottom : 0;
        transition : 0.3s;
    }

    &:hover:after{
        width : 100%;
    }

    &:hover{
        cursor : pointer;
        background-color : ${RootVariables.__var_lightPurple};
        color : ${RootVariables.__var_white};
        transition : 0.3s;
    }
`

export const LogoText = styled(Link) 
`
    text-decoration : none;
    border : none;
    font-weight : bold;
    font-size : 35px;
    color : white;
    padding : 15px;
`

