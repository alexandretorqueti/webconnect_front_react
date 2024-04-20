//content.js
import './chat.css'
import MessageOtherUser from './messageOtherUser'
import MessageLocalUser from './messageLocalUser'
import { useEffect, useState  } from 'react'
import { Mensagens } from '../../../../services/Mensagens'
import { useGlobalContext } from '../../../../GlobalContext';
import  { OverlayTrigger, Tooltip } from 'react-bootstrap';
import useOnReceiveMessage from '../../../../services/UseOnReceiveMessage';

function ContentChatComponent({ pessoa, pessoa_logada, divMensagensRef }) {
    const { TIPOSMENSAGENS } = useGlobalContext();

    const [pagina, setPagina] = useState(1);
    const [continua, setContinua] = useState(true);
    const [mensagens_chat, setMensagensChat] = useState([]);

    useOnReceiveMessage(TIPOSMENSAGENS.MENSAGEM_ENTRE_USUARIOS, (message) => {
        const mensagem_atual = message;
            if ( (mensagem_atual.pessoa_id_to === pessoa_logada.id && mensagem_atual.pessoa_id_from === pessoa.id)
                 /*OU*/ || (mensagem_atual.pessoa_id_from === pessoa_logada.id && mensagem_atual.pessoa_id_to === pessoa.id) )
            {
                const { id, message, pessoa_id_to } = mensagem_atual;
                const newMessagem = {
                    id: id,
                    mensagem: message,
                    data: 'now',
                    destinatario: pessoa_id_to,
                }
                const msgLocal = [...mensagens_chat, newMessagem];
                setMensagensChat(msgLocal);
                setTimeout(() => {
                    if (divMensagensRef.current)
                        divMensagensRef.current.scrollTop = divMensagensRef.current.scrollHeight;
                }
                , 100);
            }
    });

    useEffect(() => {
        const MensagensService = new Mensagens();
        const run = async () => {
            const { pagina_de_mensagens, tem_outra } = await MensagensService.getMensagensUsuario(pessoa.id, pagina);
            setMensagensChat(pagina_de_mensagens);
            setContinua(tem_outra);
            setTimeout(() => {
                if (divMensagensRef.current)
                    divMensagensRef.current.scrollTop = divMensagensRef.current.scrollHeight;
            }, 100);
        }
        run();
    }, [pessoa]);

    const carregaProximaPagina = async () => {
        const MensagensService = new Mensagens();
        const localPagina = pagina + 1;
        setPagina(localPagina);
        const { pagina_de_mensagens, tem_outra } = await MensagensService.getMensagensUsuario(pessoa.id, localPagina);
        setContinua(tem_outra);
        setMensagensChat([...pagina_de_mensagens,...mensagens_chat]);
        setTimeout(() => {
            if (divMensagensRef.current)
                divMensagensRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100);
    }

    return (
    <div ref={divMensagensRef} className="chat-content scroller">
        {continua &&
        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">More Messages</Tooltip>}>
            <span className="d-inline-block" onClick={carregaProximaPagina}>
                <i className="ri-more-fill"></i>
            </span>
        </OverlayTrigger>
        }
        {mensagens_chat && mensagens_chat.map((mensagem) =>
            pessoa_logada.id !== mensagem.destinatario ?
            <MessageOtherUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa}></MessageOtherUser> :
            <MessageLocalUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa_logada}></MessageLocalUser>
        )}
    </div>
    )
}

export default ContentChatComponent;

