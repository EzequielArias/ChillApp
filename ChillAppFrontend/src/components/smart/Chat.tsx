import { useEffect } from "react"
import { ChatSlot } from ".."
import { GetChats } from "../../services/chat-service"
import { useDispatch, useSelector } from "react-redux"
import { useFetchAndLoad } from "../../hooks"
import { getChats } from "../../redux/slices"
import { ChatUserAdapter } from "../../adapter"
import { StoreType } from "../../redux/store"

export const Chat = () => {

  const { callEndpoint, loading } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { id } = useSelector(( state : StoreType ) => state.user);
  const { chat } = useSelector(( state : StoreType ) => state.chat);

  useEffect(() => {
    
    const fillChats = async () => {
    const { data } = await callEndpoint(GetChats(localStorage.getItem('jwt')!));
    dispatch(getChats(ChatUserAdapter( data, id )))
    }

    fillChats();

    return () => {

    }
  },[])

  return (
    <div>
      {
        chat.length === 0 ?
        (<h1>Cargando compi...</h1>) :
        (chat.map((el) => {
          return (
          <ChatSlot
            key={el.chatId}
            name={el.userChat.name}
            message={el.userChat.messages}
            chatId={el.chatId}
            img={el.userChat.img}
          />
          )
        })) 
      }
    </div>
  )
}
