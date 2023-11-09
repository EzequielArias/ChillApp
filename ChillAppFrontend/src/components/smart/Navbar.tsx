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
//import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocalStorage, useForm } from '../../hooks';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {

  const [selected, setSelected] = useState({
    chats : true,
    novedades : false,
    llamadas : false
  })
  const [ search, setSearch ] = useState(false);
  const [ result, setResult ] = useState(false);
  const { form, formChange } = useForm({
    query_search : ""
  });

  const navigate = useNavigate();
  const location = useLocation();

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

    if(location.pathname !== "/") navigate("/");
    setResult(false)
  }
  
  const handleSearchBar = (e : any) => {
    e.stopPropagation()
    setSearch(!search)
  }

  const searchPerson = (e : any ) =>{

    setSelected({
      chats : false,
      novedades : false,
      llamadas : false
    })

    if(e.key === 'Enter'){
      
      const regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(regExEmail.test(form.query_search)){
        
      setResult(true)
      return navigate(`/query-result?email=${form.query_search}`);
      }

      setResult(true)
      return navigate(`/query-result?name=${form.query_search}`);
    }
  }

  const arrowNavigate = () => {
    setResult(false)
    navigate('/')
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
          {
            result
            ? 
            (
              <AiOutlineArrowLeft onClick={arrowNavigate}/>
            )
            : 
            (
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
            ) 
          }
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
