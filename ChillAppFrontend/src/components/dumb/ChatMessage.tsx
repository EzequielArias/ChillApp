import { DropMenu, ItemList, ItemText } from '../styled-components/ChatModal';
import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import { useFetchAndLoad } from '../../hooks';
import { deleteMessage, editMsg } from '../../services'; 
import { MessageText } from '../../redux/slices';
import Swal from 'sweetalert2';

export const ChatMessage = (
            { 
            id, 
            chatId, 
            setData,
            msg
            } 
            : 
            { 
            id : string, 
            chatId : string, 
            setData :  React.Dispatch<React.SetStateAction<MessageText[]>> ,
            msg : string
            }
        ) => {

    const [ showMenu, setShowMenu ] = useState(false);
    const { callEndpoint } = useFetchAndLoad();
    const tk = localStorage.getItem('jwt') as string;

    const onClickDelete = async () => {
        const { data } = await callEndpoint(deleteMessage({ messageId : id, chatId, tk}));
        setData(prev => {
            const newArr = [...prev].filter(el => el._id !== id)
            return newArr;
        });
    };

    const onClickEdit = async () => {

        const { value } = await Swal.fire({
            text : "Edita tu mensaje",
            input : "text",
            confirmButtonText : "OK",
            inputValue : msg
        });
        
        const { data } = await callEndpoint(editMsg({ tk, messageId : id, chatId, body : value }));

        setData(prev => {
            const newArr = prev.map((el) => el._id === id ? { _id : data.id, text : data.text, user : data.senderId } : el)
            console.log(newArr)
            return newArr;
        })
    };

    const showDropMenu = () => setShowMenu(!showMenu);

  return (
    <>
    <FiChevronDown onClick={showDropMenu}/>
    {
        showMenu 
        ? 
        (
        <DropMenu onMouseLeave={() => setShowMenu(false)}>
            <ItemList onClick={onClickDelete}>
                <ItemText>Eliminar</ItemText>
            </ItemList>
            <ItemList onClick={onClickEdit}>
                <ItemText>Editar</ItemText>
            </ItemList>
        </DropMenu>
        )
        : ""
    }
    </>
  )
}
