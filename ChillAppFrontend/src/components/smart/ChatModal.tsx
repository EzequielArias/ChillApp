import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiSolidRightArrow } from 'react-icons/bi';
import { io } from "socket.io-client";
import { ModalBoxContainer, 
         ModalHeader, 
         ModalIMG, 
         ModalInput, 
         ModalKeyboardContainer, 
         ModalMainBox, 
         ModalRollBack, 
         ModalSendButton 
        } from "../styled-components/ChatModal";
import { useEffect } from 'react';
//import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

const socket = io("http://localhost:5555");

export const ChatModal = ({ setModal } : { setModal : React.Dispatch<React.SetStateAction<boolean>>}) => {
 
  const { chat } = useSelector(( state : StoreType ) => state.chat )

  const initialState = {
    from : "",
    date : "",
    text : ""
  }

  //const { form, formChange } = useForm(initialState);

  const sendMessage = () => {}

  useEffect(() => {
    
    socket.on('receiveMessage', () => {

    })

    return () => {
      socket.off('receiveMessage');
    }
  },[])

  return (
    <ModalBoxContainer>
        <ModalMainBox>

          <ModalHeader>
            <ModalRollBack onClick={() => setModal(false)}> <AiOutlineArrowLeft/> </ModalRollBack>
            <ModalIMG src='https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' alt='Pwned'/>
          </ModalHeader>

          <ModalKeyboardContainer>
            <ModalInput/>
            <ModalSendButton> <BiSolidRightArrow/> </ModalSendButton>
          </ModalKeyboardContainer>

        </ModalMainBox>
    </ModalBoxContainer>
  )
}
