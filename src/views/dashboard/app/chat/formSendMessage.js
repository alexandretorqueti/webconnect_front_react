import { useState } from 'react';
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useGlobalContext } from '../../../../GlobalContext';
import './chat.css'


const FormSendMessage = ({ pessoa, pessoa_logada }) => {
    const [message, setMessage] = useState('');
    const { socket } = useGlobalContext();
    const handleSubmit = (e) => {
        

        e.preventDefault();

        if (message.trim() === '') {
            return;
        }

        socket.tenta_enviar(
            {
                message: message,
                pessoa_id_from: pessoa_logada.id,
                pessoa_id_to: pessoa.id,
                type: 'private'
            }
        )
        
        console.log('Mensagem enviada:', message);
        setMessage('');
    };



    return (
        <div className="chat-footer p-3 bg-white" style={{ 'minHeight' : '100vh' }}>
            <Form className="d-flex align-items-center" action="#" onSubmit={handleSubmit}>
                <div className="chat-attagement d-flex">
                    <Link to="#"><i className="far fa-smile pe-3" aria-hidden="true"></i></Link>
                    <Link to="#"><i className="fa fa-paperclip pe-3" aria-hidden="true"></i></Link>
                </div>
                <Form.Control 
                    type="text" 
                    placeholder="Type your message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="me-3 react-quill-custom" />

                <Button type="submit" variant="primary d-flex align-items-center"><i className="far fa-paper-plane" aria-hidden="true"></i><span className="d-none d-lg-block ms-1">Send</span></Button>
            </Form>
        </div>
    );
};

export default FormSendMessage;