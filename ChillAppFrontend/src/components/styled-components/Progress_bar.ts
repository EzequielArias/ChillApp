import styled from 'styled-components';
import { RootVariables } from '.';

export const ProgressBarContainer = styled.div 
`
    position : relative;
    width :350px;
    height : 35px;
    border-radius : 5px;
    background-color : #eee;
`


interface ILoadingBar extends React.HTMLAttributes<HTMLDivElement> {
    filled : number;
}

export const LoadingBar = styled.div<ILoadingBar>
`
    height : 100%;
    width : ${props => props.filled}%;
    background : ${RootVariables.__var_DarkPurple};
    transition : width 0.56s;
`

export const Filled = styled.span 
`
    font-weight : 600;
    font-family : 'Franklin Gothic Medium';
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%,-50%);
    color : ${RootVariables.__var_white};
    text-shadow : -1px 0 555px, 0 1px 555px, 1px 0 555px, 0 -1px 555px;
`

export const IsRunningBtn = styled.button 
`

`