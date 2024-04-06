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
  const [pessoa_logada, setPessoaLogada] = useState({});
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState({});
  const [naoLogado, setNaoLogado] = useState(false);
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    localStorage.setItem('csrfToken', token);
    const PessoasService = new Pessoas();
    const run = async () => {
      if (location.href.indexOf('auth/sign-in') === -1) {
        let naoLogadoLocal = false;
        let pessoa_logada = {};
        try {
          pessoa_logada = await PessoasService.getPessoaLogada().catch((error) => {
            naoLogadoLocal = true;
            throw error;
          });
        } catch (error) {
          naoLogadoLocal = true
        }
        // ou naoLoagadoLocal é true ou pessoa_logada.detail === 'Invalid token'
        if (naoLogadoLocal || pessoa_logada.detail === 'Invalid token') {
          setNaoLogado(true);
        }
        setPessoaLogada(pessoa_logada);
        if (pessoa_logada && pessoa_logada.id) {
          const newSocket = new Socket(
              {
              id: pessoa_logada.id,
              type: 'private',
              wsScheme: window.location.protocol === 'https:' ? 'wss' : 'ws',
              pessoaLogadaId: pessoa_logada.id, 
              recebida: function(msg) { 
                setMensagem(msg);
              },
              userId: pessoa_logada.id,
              });
          setSocket(newSocket);
        }
      }
    }
    run();
  }, []);

  // Cada mensagem recebida é processada aqui e enviada para o componente que precisa
  
  useEffect(() => {
    const centralDeMensagens = () => {
      if (mensagem.message) {
        const mensagens_local = [...mensagens, mensagem];
        setMensagens(mensagens_local);
      }
    };
    const run = () => {
      centralDeMensagens();
    };
    run();
  }, [JSON.stringify(mensagem)]);

  return (
    <GlobalContext.Provider value={
        { 
          socket, 
          pessoa_logada, 
          TIPOSMENSAGENS, 
          MENSAGENS, 
          mensagens, 
          naoLogado
        }
      }>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar o socket
export const useGlobalContext = () => useContext(GlobalContext);
