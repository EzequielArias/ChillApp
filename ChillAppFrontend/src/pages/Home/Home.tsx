import { Chat, News, Call } from "../../components"
import styled from 'styled-components';

const Test = styled.div 
`
overflow : hidden;
width : 100%;
display : flex;

& > ul {
  display : flex;
  flex-direction : center;
  width : 100%;
  
}

`

export const Home = () => {

  const FC = [Chat, News, Call];

  return (
    <Test>
      <ul>
      {
        FC.map((El, i) => {
          return (
            <li key={i}>
              <El/>
            </li>
          )
        })
      }
      </ul>
    </Test>
  )
}
