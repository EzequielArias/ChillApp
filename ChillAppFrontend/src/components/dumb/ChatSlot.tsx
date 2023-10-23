import { ChatModal } from '../smart';
import {
  ChatSlotContainer,
  ChatIMG,
  UserName,
  UserInfoContainer,
  ImgContainer,
  Message,
  Hour,
  HourContainer
} from '../styled-components';
import { Avatars } from '../../assets';
import { useState } from 'react';

export const ChatSlot = ( { name, message, chatId, img } : { name : string, message : any[], chatId : string, img : string } ) => {

  const [ modal, setModal ] = useState<boolean>(false);

  return (
    <>
    { modal && <ChatModal setModal={setModal} chatId={chatId} />}
    <ChatSlotContainer onClick={() => setModal(true)}>
      <ImgContainer>
       <ChatIMG 
        alt='' 
        src={Avatars.find(avatar => avatar.includes(img))}
        />
      </ImgContainer>
      <UserInfoContainer>
       <UserName>@{ name }</UserName>
       <Message>{message[message.at(-1)]}</Message>
      </UserInfoContainer>
      <HourContainer>
        <Hour>10 : 15</Hour>
      </HourContainer>
    </ChatSlotContainer>
    </>
  )
}
