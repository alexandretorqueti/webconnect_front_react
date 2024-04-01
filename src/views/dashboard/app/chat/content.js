//img
import './chat.css'
import MessageOtherUser from './messageOtherUser'
import MessageLocalUser from './messageLocalUser'
import { useEffect, useState } from 'react'
import { Mensagens } from '../../../../services/Mensagens'

function ContentChatComponent({ pessoa, pessoa_logada }) {
    const [mensagens, setMensagens] = useState([]);
    useEffect(() => {
        const MensagensService = new Mensagens();
        const run = async () => {
            const mensagens_locais = await MensagensService.getMensagensUsuario(pessoa.id);
            setMensagens(mensagens_locais);
        }
        run();
    }, [pessoa])

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