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
         ModalTextBallon,
         EmojiContainer
        } from "../styled-components/ChatModal";
import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { Message } from '../../redux/slices';
import { Avatars } from '../../assets';
import Pickers, { EmojiClickData } from 'emoji-picker-react';
import { CiFaceSmile } from "react-icons/ci";
//import { FiChevronDown } from "react-icons/fi";
import { ChatMessage } from '..';
import { useFetchAndLoad } from '../../hooks';
import { getById } from '../../services';

const socket = io("http://localhost:5555");

export const ChatModal = ({ setModal, chatId } : { setModal : React.Dispatch<React.SetStateAction<boolean>>, chatId : string}) => {
 
  const tk = localStorage.getItem('jwt') as string;
  const { chat } = useSelector(( state : StoreType ) => state.chat );
  const { id } = useSelector((state : StoreType) => state.user );
  const receiver_data = chat.find((usr) => usr.chatId === chatId)!.userChat;
  const { form, formChange, setForm } = useForm<{message : string}>({message : ""}, socket, receiver_data)
  const [ typing, setTyping ] = useState(false)
  const [ data, setData ] = useState<Message[]>([]);
  const [ emojiPicker, setEmojiPicker ] = useState(false);
  const { callEndpoint } = useFetchAndLoad();


  const sendMessage = (
      e :
      React.KeyboardEvent<HTMLInputElement> | 
      React.MouseEvent<HTMLButtonElement>
      ) => {
        if('key' in e){
          if(e.key === "Enter"){
            socket.emit('send-msg', {
              text : form.message,
              senderId : id,
              receiverId : receiver_data.id
            })
          setForm({ message : ""})
          setData(( prev ) => {
          return [
            ...prev,
            {
              _id : "qasd",
              user : id,
              text :  form.message
            }
          ]
        })
          }
        } else if ('button' in e){
          socket.emit('send-msg', {
            text : form.message,
            senderId : id,
            receiverId : receiver_data.id
          })
          setForm({ message : ""})
          setData(( prev ) => {
            return [
              ...prev,
              {
                _id : "qasd",
                user : id,
                text :  form.message
              }
            ]
          })
        }

        const messagesContainer = document.getElementById('messageContainer');

        if(messagesContainer){
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
  }

  const onEmojiClick = (emojiObject : EmojiClickData | React.MouseEvent<HTMLDivElement> ) => {
    setEmojiPicker(!emojiPicker);

    if(!('emoji' in emojiObject)) return

    if(emojiObject && emojiObject.emoji) setForm( prev => { return { message : prev.message + emojiObject.emoji} })
  }


  useEffect(() => {
    
    const fillChat = async () => {
      const { data } = await callEndpoint(getById(tk, chatId))
      setData(data.messages)
    } 

    fillChat()

    socket.emit('new user', {
      userId : id
    })
  
    socket.on('is-typing', ( data ) => {
      setTyping(data)
    })

    socket.on('receive-msg', ( data ) => {
      const json = JSON.parse(data),
            object = JSON.parse(json)
            console.log(object);
            setData(prev => {

              const newData = [...prev]

              newData.push({
                _id : object.id,
                user : object.message.owners[0],
                text : object.message.text
              }) 

              return newData
            })
        })
    return () => {
      socket.off('is-typing');
      socket.off('receive-msg');
      socket.emit('logout', id);
    }
  },[])


  return (
    <ModalBoxContainer>
        <ModalMainBox>

          <ModalHeader>
            <ModalRollBack onClick={() => {
              setModal(false)
              socket.emit('logout', id)
            }}> <AiOutlineArrowLeft/> </ModalRollBack>
            <ModalPersonName>{receiver_data.name}</ModalPersonName>
            <ModalIMG src={
              Avatars.find((el) => el.includes(receiver_data.img))
            } alt='Pwned'/>
          </ModalHeader>

          <ModalMsgContainer id='messageContainer'>
            {
              data.map((el, index) => {
                return (
                  <ModalTextBallon key={index} isMyMessage={id === el.user ? false : true}>
                    <ModalMessage> 
                      <span>{el.text}</span>
                      {
                        id === el.user
                        ? (<ChatMessage id={el._id} chatId={chatId} setData={setData} msg={el.text}/>)
                        : ""
                      }
                    </ModalMessage>
                  </ModalTextBallon>
                )
              }) 
            }
          <span>{ typing ? "escribiendo..." : ""}</span>
          </ModalMsgContainer>
          <ModalKeyboardContainer>
            <EmojiContainer onClick={onEmojiClick}>
              <CiFaceSmile/>
            </EmojiContainer>
            <ModalInput
            type='text'
            name='message'
            value={form.message}
            onChange={formChange}
            onKeyDown={sendMessage}
            />
            <ModalSendButton onClick={sendMessage}> <BiSolidRightArrow/> </ModalSendButton>
          </ModalKeyboardContainer>
          { emojiPicker && <Pickers width={'100%'} onEmojiClick={onEmojiClick}/> }
        </ModalMainBox>
    </ModalBoxContainer>
  )
}
