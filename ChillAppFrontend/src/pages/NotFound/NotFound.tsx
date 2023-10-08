import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3100');

export const NotFound = () => {

  const websocket = () => {
    socket.emit('connection', "HOLA MUNDO WEBSOCKETS");
    console.log('SOCKET MANDANDO')
  }

  return (
      <>
      <div>NotFound</div>
      <span onClick={websocket}>HAZ CLICK PARA PROBAR</span>
      </>
    )
}
