import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiSolidRightArrow } from 'react-icons/bi';
import { io } from "socket.io-client";
import { ModalBoxContainer, 
         ModalHeader, 
         ModalIMG, 
         ModalInput, 
         ModalKeyboardContainer, 
         ModalMainBox, 
         ModalMessage, 
         ModalMsgContainer, 
         ModalPersonName, 
         ModalRollBack, 
         ModalSendButton, 
         ModalTextBallon
        } from "../styled-components/ChatModal";
import { useEffect } from 'react';
//import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

//const socket = io("http://localhost:5555");

export const ChatModal = ({ setModal } : { setModal : React.Dispatch<React.SetStateAction<boolean>>}) => {
 
  const { chat } = useSelector(( state : StoreType ) => state.chat )

  const initialState = {
    from : "",
    date : "",
    text : ""
  }

  const arr = [
    {
      user : false,
      message : "hola que tal ?"
    },
    {
      user : true,
      message : "Todo chill vos ?"
    },
    {
      user : false,
      message : "Pinta algo hoy ? "
    }
  ]

  //const { form, formChange } = useForm(initialState);

  const sendMessage = () => {
  //  socket.emit('is-typing', "MENSAJE DEL FRONT-END")
  }

  return (
    <ModalBoxContainer>
        <ModalMainBox>

          <ModalHeader>
            <ModalRollBack onClick={() => setModal(false)}> <AiOutlineArrowLeft/> </ModalRollBack>
            <ModalPersonName>Ezequiel Arias</ModalPersonName>
            <ModalIMG src='https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' alt='Pwned'/>
          </ModalHeader>

          <ModalMsgContainer>
            {
              arr.map((msg, index) => {
                return (
                  <ModalTextBallon key={index} isMyMessage={msg.user}>
                    <ModalMessage> {msg.message} </ModalMessage>
                  </ModalTextBallon>
                )
              })
            }
          </ModalMsgContainer>

          <ModalKeyboardContainer>
            <ModalInput/>
            <ModalSendButton onClick={sendMessage}> <BiSolidRightArrow/> </ModalSendButton>
          </ModalKeyboardContainer>

        </ModalMainBox>
    </ModalBoxContainer>
  )
}
