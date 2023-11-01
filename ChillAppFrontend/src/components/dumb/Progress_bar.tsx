import { useState, useEffect } from 'react'
import { Filled, LoadingBar, ProgressBarContainer } from '../styled-components'


export const Progress_bar = ({ loading } : { loading : boolean} ) => {

    const [ filled, setFilled ] = useState(0)
    const [ isRunning ] = useState(loading)

    useEffect(() => {
        if(filled < 100 && isRunning){
            setTimeout(() => setFilled(prev => prev += 2), 50)
        }
    },[filled, isRunning])

    return (
    <div style={{
        position : "absolute", 
        width : '100%', 
        height : '100%', 
        backgroundColor : 'gray', 
        opacity : '0.8',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
        }}>
        <ProgressBarContainer>
            <LoadingBar filled={filled}></LoadingBar>
            <Filled>{filled}%</Filled>
        </ProgressBarContainer>
    </div>
  )
}
