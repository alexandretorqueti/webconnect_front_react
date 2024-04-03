//img
import './chat.css'
import MessageOtherUser from './messageOtherUser'
import MessageLocalUser from './messageLocalUser'
import { useEffect, useState } from 'react'
import { Mensagens } from '../../../../services/Mensagens'
import { useGlobalContext } from '../../../../GlobalContext';

function ContentChatComponent({ pessoa, pessoa_logada }) {
    const [mensagens, setMensagens] = useState([]);
    const { setFnEnviarMensagem } = useGlobalContext();

    useEffect(() => {
        const MensagensService = new Mensagens();
        const run = async () => {
            const mensagens_locais = await MensagensService.getMensagensUsuario(pessoa.id);
            setMensagens(mensagens_locais);
        }
        run();
    }, [pessoa])

    useEffect(() => {
        const fnEnviar = ({id,message,pessoa_id_to}) => {
            const newMessagem = {
                id: id,
                mensagem: message,
                data: 'now',
                destinatario: pessoa_id_to,
            }
            const newMensagens = [...mensagens, newMessagem];
            setMensagens(newMensagens);
        }
        setFnEnviarMensagem(fnEnviar);
    }, []);

    return (
    <div className="chat-content scroller">
        {mensagens && mensagens.map((mensagem) =>
            pessoa_logada.id === mensagem.destinatario ?
            <MessageOtherUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa}></MessageOtherUser> :
            <MessageLocalUser key={mensagem.id} mensagem={mensagem} pessoa={pessoa_logada}></MessageLocalUser>
        )}
    </div>
    )
}

export default ContentChatComponent;