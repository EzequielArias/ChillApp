import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiSolidRightArrow } from 'react-icons/bi';

import { ModalBoxContainer, 
         ModalHeader, 
         ModalIMG, 
         ModalInput, 
         ModalKeyboardContainer, 
         ModalMainBox, 
         ModalRollBack, 
         ModalSendButton 
        } from "../styled-components/ChatModal"

export const ChatModal = ({ setModal } : { setModal : React.Dispatch<React.SetStateAction<boolean>>}) => {
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
