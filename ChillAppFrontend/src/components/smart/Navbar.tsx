import {
    NavbarContainer,
    LogoText,
    InfoContainer,
    SectionContainer,
    SectionItem,
    ToolsContainer,
    SearchInput,
    DivIcon,
    DivInput
} from '../styled-components';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useLocalStorage, useForm } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const [selected, setSelected] = useState({
    chats : true,
    novedades : false,
    llamadas : false
  })
  const [ search, setSearch ] = useState(false);
  const { form, formChange } = useForm({
    query_search : ""
  });
  const navigate = useNavigate();

  const { getUserData } = useLocalStorage()

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
  
  const handleSearchBar = (e : any) => {
    e.stopPropagation()
    setSearch(!search)
  }

  const searchPerson = (e : any ) =>{
    if(e.key === 'Enter'){
      console.log(e.target.value)
      return navigate('/query-result')
    }
  }

  useEffect(() => {
    
    getUserData()
    
    return () => {

    }

  },[])

  return (
    <>
    <NavbarContainer>
        <InfoContainer>
          <LogoText to={"/"}>ChillApp</LogoText>
          <ToolsContainer 
            onClick={handleSearchBar}
            active={search}
            >
              <DivIcon></DivIcon>
              <DivInput>
                <input
                type='text'
                placeholder='search'
                name='query_search'
                onClick={(e) => e.stopPropagation()}
                onChange={formChange}
                onKeyDown={searchPerson}
                />
              </DivInput>
          </ToolsContainer>
        </InfoContainer>
        
        <SectionContainer>
          <ul>
            <SectionItem 
              isactive={selected.chats}
              onClick={() => handleSelected('chat')}
              >
              Chats
            </SectionItem>
            <SectionItem 
              isactive={selected.novedades}
              onClick={() => handleSelected('novedades')}
              >
              Novedades
            </SectionItem>
            <SectionItem 
              isactive={selected.llamadas}
              onClick={() => handleSelected('llamadas')}
             >
              Llamadas
            </SectionItem>
          </ul>
        </SectionContainer>
    </NavbarContainer>

  </>
  )
}
