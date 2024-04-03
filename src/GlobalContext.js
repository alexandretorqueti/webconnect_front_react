// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from './services/socket';
import { Pessoas } from './services/Pessoas';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [pessoa_logada, setPessoaLogada] = useState();

  const recebida = (mensagem) => {
    console.log('mensagem recebida', mensagem);
  }

  useEffect(() => {
    console.log('socket', socket);
  }, [socket]);

  useEffect(() => {
    const PessoasService = new Pessoas();
    const run = async () => {
      const pessoa_logada = await PessoasService.getPessoaLogada();
      setPessoaLogada(pessoa_logada);
      if (pessoa_logada && pessoa_logada.id) {
        const newSocket = new Socket(
            {
            id: pessoa_logada.id,
            type: 'private',
            wsScheme: window.location.protocol === 'https:' ? 'wss' : 'ws',
            pessoaLogadaId: pessoa_logada.id, 
            recebida: (mensagem) => recebida(mensagem),
            userId: pessoa_logada.id,
            });
        setSocket(newSocket);
      }
    };

    run();

    return () => {
      // Verifica se o socket existe antes de tentar desconectar
      if (socket) {
        socket.close();
      }
    };
    
  }, []);

  return (
    <GlobalContext.Provider value={{ socket, pessoa_logada }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useGlobalContext = () => useContext(GlobalContext);
