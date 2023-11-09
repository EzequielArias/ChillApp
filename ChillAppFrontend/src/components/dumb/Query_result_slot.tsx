import Swal from 'sweetalert2';

import { 
        ResultSlot, 
        ResultIMG, 
        SlotLIItemsContainer, 
        SlotUser
    } from '../styled-components'

import { RootVariables } from '../styled-components';

import { IQueryUsers } from '../../redux/slices'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useFetchAndLoad } from '../../hooks';

import { newChat } from '../../services';
import { StoreType } from '../../redux/store';

export const Query_result_slot = ({el, Avatars} : { el : IQueryUsers, Avatars : string[]}) => {
  
  const { callEndpoint } = useFetchAndLoad();
  const { id } = useSelector(( state : StoreType ) => state.user );

  const navigate = useNavigate();
  
  const handleClick = async () => {

    const { value } = await Swal.fire({
      title : `Enviar mensaje`,
      icon : "question",
      text : `Quieres enviarle un mensaje a ${el.name} ?`,
      confirmButtonColor : RootVariables.__var_lightPurple,
      showDenyButton : true,
      confirmButtonText : "Si"
    })

    if(value)
    {
      try {
        const token = localStorage.getItem('jwt') as string
        const { data } = await callEndpoint(newChat(token, { userId1 : el.id, userId2 : id}))
        console.log(data)
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <>
       <ResultSlot onClick={handleClick}>
          <ResultIMG src={Avatars.find(img => img.includes(el.img))} alt=""/>
          <SlotLIItemsContainer>
            <SlotUser>{el.email}</SlotUser>
          </SlotLIItemsContainer>
        </ResultSlot>
    </>
  )
}
