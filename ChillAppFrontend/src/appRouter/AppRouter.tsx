import { Routes, Route } from "react-router-dom"
import { nav } from "./navigation"
import { useSelector } from "react-redux"
import { StoreType } from "../redux/store"
import { Navbar } from "../components"
import { useLocalStorage } from "../hooks"
import { useEffect } from "react"

export const AppRouter = () => {

  const { isAdmin, isAuthenticated } = useSelector((state : StoreType) => state.user )
  const { isLoaded } = useSelector((state : StoreType) => state.rendering )

  const { getUserData } = useLocalStorage()

  useEffect(() => {
    
    getUserData()
    return () => {

    }

  },[])


  if(!isLoaded){
    return (
      <h1>
        LOADING COMPONENTS...
      </h1>
    )
  }

  return (
    <>
      <Navbar/>
        <Routes>
            { 
              nav.map((r, i) => {
                if(r.isAdmin && r.isAuthenticated && isAdmin && isAuthenticated){
                  return <Route path={r.path} element={<r.element/>} key={i}/>
                }
                else if(r.isAuthenticated && isAuthenticated)
                {
                  return <Route path={r.path} element={<r.element/>} key={i}/>
                }
                else if(!r.isAuthenticated)
                {
                  return <Route path={r.path} element={<r.element/>} key={i}/>
                }
                return null
                })
            }
        </Routes>
    </>
  )
}

