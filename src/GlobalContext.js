// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from './services/Socket';
import { Pessoas } from './services/Pessoas';

const GlobalContext = createContext();

const TIPOSMENSAGENS = {
  MENSAGEM_ENTRE_USUARIOS: '1',
  EVENTOS_DO_CHAT: '2',
};

const MENSAGENS = {
  USUARIO_OFFLINE: '0',
  USUARIO_ONLINE: '1',
  USUARIO_ENTROU_CAMPO_CHAT: '2',
  USUARIO_SAIU_CAMPO_CHAT: '3',
  USUARIO_COMECOU_A_DIGITAR: '4',
  USUARIO_PAROU_DE_DIGITAR: '5',
  USUARIO_ALTEROU_TEXTO_DIGITADO: '6',
  USUARIO_PAROU_ALTERAR_TEXTO_DIGITADO: '7',
};


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
    <GlobalContext.Provider value={{ socket, pessoa_logada, TIPOSMENSAGENS, MENSAGENS }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useGlobalContext = () => useContext(GlobalContext);
