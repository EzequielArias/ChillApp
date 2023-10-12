import {
    NavbarContainer,
    LogoText,
    InfoContainer,
    SectionContainer,
    SectionItem,
    ToolsContainer
} from '../styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useLocalStorage } from '../../hooks';

export const Navbar = () => {

  const [selected, setSelected] = useState({
    chats : true,
    novedades : false,
    llamadas : false
  })

  const dispatch = useDispatch();

  const handleSelected = (item : string) => {
    if(item === 'chat')
    {
      setSelected(() => {
        return {
          chats : true,
          novedades : false,
          llamadas : false
        }
      })
    }

    if(item === 'novedades')
    {
      setSelected(() => {
        return {
          chats : false,
          novedades : true,
          llamadas : false
        }
      })
    }

    if(item === 'llamadas')
    {
      setSelected(() => {
        return {
          chats : false,
          novedades : false,
          llamadas : true
        }
      })
    }
  }
  
  //useLocalStorage()
  // Cambiar las propiedades de styledcomponents solo a un isActive : boolean;
  return (
    <NavbarContainer>
        <InfoContainer>
          <LogoText to={"/"}>ChillApp</LogoText>
          <ToolsContainer>
            <AiOutlineSearch/>
            <BsThreeDotsVertical/>
          </ToolsContainer>
        </InfoContainer>
        <SectionContainer>
          <ul>
            <SectionItem 
              isActive={selected.chats}
              onClick={() => handleSelected('chat')}
              >
              Chats
            </SectionItem>
            <SectionItem 
              isActive={selected.novedades}
              onClick={() => handleSelected('novedades')}
              >
              Novedades
            </SectionItem>
            <SectionItem 
              isActive={selected.llamadas}
              onClick={() => handleSelected('llamadas')}
             >
              Llamadas
            </SectionItem>
          </ul>
        </SectionContainer>
    </NavbarContainer>
  )
}
