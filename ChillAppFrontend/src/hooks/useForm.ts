import { useState } from "react"

export const useForm = <T> ( initialState : Partial<T> ) => {

  const [form, setForm] = useState({
    ...initialState as T
  })

  const formChange = ( e : any) => {
    e.preventDefault();
    setForm((prev) => {
      return {
        ...prev,
        [ e.target.name ] : e.target.value
      }
    })
  }

  return {
    formChange,
    form,
    setForm
  }
  
}
