import { useState } from "react"

export const useForm = <T> ( initialState : Partial<T>, socket? : any, ...args : any[]) => {

  const [form, setForm] = useState({
    ...initialState as T
  })

  const formChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [ e.target.name ] : e.target.value
      }
    })

    if(socket){
      console.log(e.target.value.length)
      e.target.value.length > 0 
      ? socket.emit('is-typing', { receiverId : args[0].id, typing : true}) 
      : socket.emit('is-typing', { receiverId : args[0].id, typing : false}) 
    }

  }

  

  return {
    formChange,
    form,
    setForm
  }
  
}
