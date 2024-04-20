// UseOnReceiveMessage.js

import { useEffect } from 'react';
import { useGlobalContext } from '../GlobalContext';

const useOnReceiveMessage = (tipo, onReceiveMessage) => {
   const { mensagem } = useGlobalContext();   

   useEffect(() => {
      if (mensagem && mensagem.tipo === tipo) {
         onReceiveMessage(mensagem);
      }
   }, [mensagem.id, mensagem.message, mensagem.pessoa_id_from, mensagem.pessoa_id_to, mensagem.tipo]);
};

export default useOnReceiveMessage;


