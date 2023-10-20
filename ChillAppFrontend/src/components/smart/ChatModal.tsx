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
import { useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { MessageText, getMessages } from '../../redux/slices';

const socket = io("http://localhost:5555");

export const ChatModal = ({ setModal, chatId } : { setModal : React.Dispatch<React.SetStateAction<boolean>>, chatId : string}) => {
 
  const { currentOpenChat, chat } = useSelector(( state : StoreType ) => state.chat );
  const { id } = useSelector((state : StoreType) => state.user );
  const { form, formChange } = useForm<{message : string}>({message : ""})
  const [ typing, setTyping ] = useState(false)
  const [ data, setData ] = useState<MessageText[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    
    // hay que traer la logica de el reduxSlice y pasarla a un state normal de react

    const currentChat = chat.find( el => el.chatId === chatId )?.userChat.messages;

    if(currentChat){
      setData(currentChat)
    }

    socket.on('is-typing', (data) => {
      setTyping(data)
    })

    socket.on('receive-msg', ( data ) => {
      const json = JSON.parse(data),
            object = JSON.parse(json)

            setData(prev => {

              const newData = [...prev]

              newData.push({
                user : object.message.owners[0],
                text : object.message.text
              }) 

              return newData
            })
    })

    return () => {
      socket.off('is-typing')
      socket.off('receive-msg')
    }
  },[])

  const sendMessage = () => socket.emit('send-msg', {
    text : form.message,
    senderId : id,
    receiverId : chat.find((el) => el.chatId === chatId )?.userChat.id
  })


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
              data.map((el, index) => {
                return (
                  <ModalTextBallon key={index} isMyMessage={id === el.user ? false : true}>
                    <ModalMessage> {el.text} </ModalMessage>
                  </ModalTextBallon>
                )
              })
            }

          <span>{ typing ? "escribiendo..." : ""}</span>
          </ModalMsgContainer>

          <ModalKeyboardContainer>
            <ModalInput
            type='text'
            name='message'
            value={form.message}
            onChange={formChange}
            />
            <ModalSendButton onClick={sendMessage}> <BiSolidRightArrow/> </ModalSendButton>
          </ModalKeyboardContainer>

        </ModalMainBox>
    </ModalBoxContainer>
  )
}
