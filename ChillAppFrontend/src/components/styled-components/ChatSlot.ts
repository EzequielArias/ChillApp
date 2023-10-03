import styled from 'styled-components';

export const ChatSlotContainer = styled.div 
`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 15px;
    width : 490px;

    &:hover {
        background-color : #dcdcdc;
        cursor : pointer;
        transition : 0.3s;
    }
`

export const UserInfoContainer = styled.div 
`
    width : 300px;
    height : 50px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    padding : 0 10px 0 10px;
`
export const ImgContainer = styled.div 
`
    display : flex;
    align-items : center;
    justify-content : center;
`

export const HourContainer = styled.div 
`
    display : flex;
    justify-content : end;
    width : 100%;
    padding : 0 10px 0 10px;
`

export const Title = styled.h1 
`
    font-size : 45px;
`

export const ChatIMG = styled.img 
`
    border-radius : 50%;
    height : 65px;
    width : 65px;
`

export const Hour = styled.span 
`
    padding : 0 7px 0 7px;
`

export const UserName = styled.span 
`
    font-weigth : bold;
`

export const Message = styled.span
`
    font-size : 15px;
    color : green;
    white-space: nowrap;
    overflow : hidden;
    text-overflow: ellipsis;
`