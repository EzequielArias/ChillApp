import { 
    AuthContainer, 
    AuthButton, 
    AuthForm, 
    AuthInputs, 
    AuthAdvice,
    ModalAvatars,
    AuthModal,
    ModalContainer,
    LeftArrow,
    RightArrow
  } from "../../components/styled-components"
import { useState, useRef, useEffect } from "react"
import { Avatars } from '../../assets'

export const Auth = () => {

  const [ auth, setAuth ] = useState(false);
  const [ modal , setModal ] = useState(false)
  const [ currentIndexCard, setCurrentIndexCard] = useState(0)
  const [ data, setData ] = useState({
    name : "",
    email : "",
    avatar : ""
  });

  const listRef = useRef<HTMLUListElement>(null)


  useEffect(() => {
    if(listRef.current){
      let listCurrent = listRef.current

      if(listCurrent.querySelector("li > img")){
      let cardNode = listCurrent.querySelectorAll("li > img")[currentIndexCard]
        if(cardNode)
        {
          cardNode.scrollIntoView({
            behavior : "smooth"
          })
        }}
      }

    

  },[currentIndexCard])


  const handleIndexCard = (action : string) => {
    if(action === 'foward')
    {
      if(currentIndexCard + 1 >= Avatars.length) return;
      setCurrentIndexCard(currentIndexCard + 1);
    }
  
    if(action === 'back')
    {
      if(currentIndexCard <= 0) return;
      setCurrentIndexCard(currentIndexCard - 1);
    }
  }

  const handleChange = (e : any ) => {

    if(!e.target.name){
      setModal(false)
      setData(prev => {
        return {
          ...prev,
          avatar : Avatars[currentIndexCard]
        }
      })
      return
    }

    setData(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleSubmit = (e : any) => {
    setModal(true)
  }

  return (
    <AuthContainer>
      { modal && 
      <ModalContainer>
        <LeftArrow onClick={() => handleIndexCard('back')} />
        <RightArrow onClick={() => handleIndexCard('foward')} />
       <AuthModal ref={listRef} >
        {
          Avatars.map((el, i) => {
            return (<>
            ( 
            <li key={i}>
              <ModalAvatars src={el} alt="" onClick={handleChange}/>
            </li> 
            )</>)
          })
        }  
       </AuthModal>
      </ModalContainer>
      }
      <AuthForm>
        <AuthInputs 
          type="email" 
          name="email" 
          placeholder=" Email"
          onChange={handleChange}
          value={data.email}
          />
        <AuthInputs
         type="password" 
         name="pass"
         placeholder="password"
         onChange={handleChange}
         value={data.name}
         />
        <AuthButton>{auth ? 'Registrarse'  : 'Iniciar sesion' }</AuthButton>
        <AuthAdvice 
          onClick={() => setModal(true)}
          style={auth ? { display : 'block' } : { display : 'none' }}
          >Selecciona tu Avatar !</AuthAdvice>
        <AuthAdvice onClick={() => setAuth(!auth)}>
          {auth ? 'Ya tienes una cuenta ? Iniciar sesion' : 'No tienes una cuenta ? Registrarse'}
        </AuthAdvice>
      </AuthForm>
    </AuthContainer>
  )
}

