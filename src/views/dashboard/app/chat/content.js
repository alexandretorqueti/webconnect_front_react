//img
import './chat.css'
import MessageOtherUser from './messageOtherUser'
import MessageLocalUser from './messageLocalUser'
import { useEffect  } from 'react'
import { Mensagens } from '../../../../services/Mensagens'
import { useGlobalContext } from '../../../../GlobalContext';

function ContentChatComponent({ pessoa, pessoa_logada, mensagens, setMensagens, divMensagensRef }) {
    const { setFnReceberMensagem: setFnReceberMensagem } = useGlobalContext();

    const fnReceber = ({id, message, pessoa_id_to}, msg) => {
        if (msg.filter(m => m.id === id).length === 0) {
            const newMessagem = {
                id: id,
                mensagem: message,
                data: 'now',
                destinatario: pessoa_id_to,
            }
            const msgLocal = [...msg, newMessagem]
            setMensagens(msgLocal);

            setFnReceberMensagem((data) => fnReceber(data, msgLocal));
            setTimeout(() => {
                divMensagensRef.current.scrollTop = divMensagensRef.current.scrollHeight;
            }, 100);
        }
    }
    useEffect(() => {
        const MensagensService = new Mensagens();
        const run = async () => {
            const mensagens_locais = await MensagensService.getMensagensUsuario(pessoa.id);
            setMensagens(mensagens_locais);

            let element = divMensagensRef.current;
            const parentDivs = [];
    
            while (element.parentNode) {
                element = element.parentNode;
                if (element.tagName === 'DIV') {
                    parentDivs.push(element);
                }
            }
            parentDivs.forEach(div => div.style.overflow = 'hidden');
            setTimeout(() => {
                divMensagensRef.current.scrollTop = divMensagensRef.current.scrollHeight;
            }, 100);
    
        }
        run();
    }, [pessoa]);

    useEffect(() => {
        setFnReceberMensagem((data) => fnReceber(data, mensagens));
        setTimeout(() => {
            divMensagensRef.current.scrollTop = divMensagensRef.current.scrollHeight;
        }, 100);
    }, [mensagens, divMensagensRef]);

    return (
    <div ref={divMensagensRef} className="chat-content scroller" style={{ 'overscrollBehavior': 'none' }}>
        {mensagens && mensagens.map((mensagem) =>
            pessoa_logada.id === mensagem.destinatario ?
            <MessageOtherUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa}></MessageOtherUser> :
            <MessageLocalUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa_logada}></MessageLocalUser>
        )}
    </div>
    )
}

export default ContentChatComponent;