import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import { RootVariables } from './root';

// #C080FF

interface SectionProps extends React.LiHTMLAttributes<HTMLLIElement> {
    isactive : boolean;
}

export const NavbarContainer = styled.div 
`
    position : relative;
    background-color : #AF69EE;
    display : flex;
    flex-direction : column;
`

interface IToolsContainer extends React.HTMLAttributes<HTMLDivElement> {
    active? : boolean;
}

export const ToolsContainer = styled.div<IToolsContainer>
`
    display : flex;
    justify-content : space-evenly;
    align-items : center;
    font-size : 35px;
    padding : 15px;
    color : white;
    width : ${props => props.active ? '365px' : '45px'};
    height : 45px;
    position : relative;
    background : ${RootVariables.__var_DarkPurple};
    border-radius : 60px;
    transition : 0.5s;
    overflow : hidden;

    &:hover {
        cursor : pointer;
    }
`

export const SearchInput = styled.input 
`
    padding : 4px;
    border : none;
    background : ${RootVariables.__var_DarkPurple};
    outline : none;
    color : ${RootVariables.__var_white};
    font-size : 15px;
    transition : 0.4s;
    overflow : hidden;
`

export const DivIcon = styled.div 
`
    position : absolute;
    top : 0 ;
    left : 0 ;
    height : 45px;
    width : 45px;
    background : ${RootVariables.__var_DarkPurple};
    border-radius : 60px;
    display : flex;
    justify-content : center;
    align-items : center;
    z-index : 0;
    cursor : pointer;

    &:before {
        content : '';
        position : absolute;
        width : 15px;
        height : 15px;
        border : 3px solid ${RootVariables.__var_white};
        border-radius : 50%;
        transform : translate(-4px,-4px);
    }

    &:after {
        content : '';
        position : absolute;
        width : 3px;
        height : 12px;
        background : ${RootVariables.__var_white};
        transform : translate(6px,6px) rotate(315deg);
    }
`

export const DivInput = styled.div 
`
    position : relative;
    width : 300px;
    height : 45px;
    left : 60px;
    display : flex;
    justify-content : center;
    align-items : center;

    & > input {
        position : absolute;
        width : 100%;
        height : 100%;
        top : 0;
        border : none;
        outline : none;
        background : ${RootVariables.__var_DarkPurple};
        font-size : 20px;
        padding : 10px 0;
        z-index : 1100;
        color : ${RootVariables.__var_white};
    }  
`

export const InfoContainer = styled.section 
`
    display : flex;
    justify-content : space-between;
    align-items : center;
    margin-right : 20px;

    & > svg {
        font-size : 30px;
        color : ${RootVariables.__var_white};

        &:hover {
            cursor : pointer;
        }
    }
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
    color : ${props => props.isactive ? RootVariables.__var_white : RootVariables. __var_gray};

    &:after {
        content : "";
        position : absolute;
        background-color : #fff;
        height : 3px;
        width : ${props => props.isactive ? '100%' : '0'};
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

