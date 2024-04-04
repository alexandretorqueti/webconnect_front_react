//img
import './chat.css'
import MessageOtherUser from './messageOtherUser'
import MessageLocalUser from './messageLocalUser'
import { useEffect, useState  } from 'react'
import { Mensagens } from '../../../../services/Mensagens'
import { useGlobalContext } from '../../../../GlobalContext';
import  { OverlayTrigger, Tooltip } from 'react-bootstrap';


function ContentChatComponent({ pessoa, pessoa_logada, mensagens, setMensagens, divMensagensRef }) {
    const { setFnReceberMensagem: setFnReceberMensagem } = useGlobalContext();
    const [pagina, setPagina] = useState(1);
    const [continua, setContinua] = useState(true);

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
            const { pagina_de_mensagens, tem_outra } = await MensagensService.getMensagensUsuario(pessoa.id, pagina);
            setMensagens(pagina_de_mensagens);
            setContinua(tem_outra);
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

    const carregaProximaPagina = async () => {
        const MensagensService = new Mensagens();
        const localPagina = pagina + 1;
        setPagina(localPagina);
        const { pagina_de_mensagens, tem_outra } = await MensagensService.getMensagensUsuario(pessoa.id, localPagina);
        setContinua(tem_outra);
        setMensagens([...pagina_de_mensagens,...mensagens]);
        setTimeout(() => {
            divMensagensRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100);
    }

    useEffect(() => {
        setFnReceberMensagem((data) => fnReceber(data, mensagens));
    }, [mensagens, divMensagensRef]);

    return (
    <div ref={divMensagensRef} className="chat-content scroller" style={{ 'overscrollBehavior': 'none' }}>
        {continua &&
        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">More Messages</Tooltip>}>
            <span className="d-inline-block" onClick={carregaProximaPagina}>
                <i className="ri-more-fill"></i>
            </span>
        </OverlayTrigger>
        }
        {mensagens && mensagens.map((mensagem) =>
            pessoa_logada.id === mensagem.destinatario ?
            <MessageOtherUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa}></MessageOtherUser> :
            <MessageLocalUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa_logada}></MessageLocalUser>
        )}
    </div>
    )
}

export default ContentChatComponent;