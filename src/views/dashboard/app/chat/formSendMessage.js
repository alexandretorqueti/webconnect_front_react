import { useState } from 'react';
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // importe o CSS do Quill
import './chat.css'


const FormSendMessage = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar a mensagem
        console.log('Mensagem enviada:', message);
        setMessage('');
    };



    return (
        <div className="chat-footer p-3 bg-white" style={{ 'min-height' : '100vh' }}>
            <Form className="d-flex align-items-center" action="#" onSubmit={handleSubmit}>
                <div className="chat-attagement d-flex">
                    <Link to="#"><i className="far fa-smile pe-3" aria-hidden="true"></i></Link>
                    <Link to="#"><i className="fa fa-paperclip pe-3" aria-hidden="true"></i></Link>
                </div>
                <ReactQuill 
                    theme="snow" 
                    value={message} 
                    onChange={setMessage} 
                    className="me-3 react-quill-custom" 
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['image', 'code-block'],
                        ]
                    }}/>
                <Button type="submit" variant="primary d-flex align-items-center"><i className="far fa-paper-plane" aria-hidden="true"></i><span className="d-none d-lg-block ms-1">Send</span></Button>
            </Form>
        </div>
    );
};

export default FormSendMessage;