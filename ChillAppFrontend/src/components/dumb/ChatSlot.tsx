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

import { useState } from 'react';

export const ChatSlot = ( { name, message } : { name : string, message : any[] } ) => {

  const [ modal, setModal ] = useState<boolean>(false);

  return (
    <>
    { modal && <ChatModal setModal={setModal}/>}
    <ChatSlotContainer onClick={() => setModal(true)}>
      <ImgContainer>
       <ChatIMG 
        alt='' 
        src='https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/1366_2000.jpeg'
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
