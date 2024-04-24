import {Link} from 'react-router-dom'
import './chat.css'
import FotoPessoaComponent from '../../../../components/pessoas/FotoPessoa';

const MessageLocalUserComponent = ({ mensagem, pessoa }) => {
    return (
        <div className="chat chat-left">
            <div className="chat-user">
                <Link className="avatar m-0" to="">
                    <FotoPessoaComponent pessoa={pessoa} avatar={35}/>
                </Link>
                <span className="chat-time mt-1">{mensagem.data}</span>
            </div>
            <div className="chat-detail">
                <div className="chat-message">
                    <p>{mensagem.mensagem}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageLocalUserComponent;