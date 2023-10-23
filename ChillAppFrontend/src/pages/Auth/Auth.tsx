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
import { useFetchAndLoad, useForm } from "../../hooks";
import { LogIn, Register } from "../../services";
import { login } from "../../redux/slices";
import { useDispatch } from "react-redux";
import { AuthAdapter } from "../../adapter";
import { useNavigate } from "react-router-dom";

export const Auth = () => {

  const [ auth, setAuth ] = useState(false);
  const [ modal , setModal ] = useState(false)
  const [ currentIndexCard, setCurrentIndexCard] = useState(0)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    password : "",
    email : "",
    avatar : "",
    name : ""
  }

  const { form, formChange, setForm } = useForm(initialState);
  const { loading, callEndpoint } = useFetchAndLoad();
  const listRef = useRef<HTMLUListElement>(null);

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

  const succesfullLogIn = () => navigate("/");

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

  const handleImage = (e : any) => {
    if(!e.target.name){
      setForm((prev) => {
        return {
          ...prev,
          avatar : Avatars[currentIndexCard]
        }
      })
      setModal(false)
    }
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    
    const formData = {
        name : form.name,
        email: form.email,
        password: form.password,
        img : form.avatar.split("/").at(-1) as string
      };

    const jsonData = JSON.stringify(formData);

    let tk : string;
    if(auth)
    {
      const { data } = await callEndpoint(Register(formData));
      dispatch(login(AuthAdapter(data)));
      tk = data.token;
    }else{
      const { data } = await callEndpoint(LogIn(jsonData))
      dispatch(login(AuthAdapter(data)));
      tk = data.token;
    }
    localStorage.setItem('jwt', tk);
    return succesfullLogIn();
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
              <ModalAvatars src={el} alt="" onClick={handleImage}/>
            </li> 
            )</>)
          })
        }  
       </AuthModal>
      </ModalContainer>
      }
      <AuthForm>
        {
          auth && 
          <AuthInputs
          type="text"
          name="name"
          placeholder="Tu nombre"
          onChange={formChange}
          value={form.name}
          />
        }
        <AuthInputs 
          type="email" 
          name="email" 
          placeholder=" Email"
          onChange={formChange}
          value={form.email}
          />
        <AuthInputs
         type="password" 
         name="password"
         placeholder="Password"
         onChange={formChange}
         value={form.password}
         />
        <AuthButton onClick={handleSubmit} >{auth ? 'Registrarse'  : 'Iniciar sesion' }</AuthButton>
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
