import {
    Card, 
    Dropdown,
    Image,
    Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomToggle from "../../../dropdowns";
import { Mensagens } from "../../../../services/Mensagens";
import { useEffect, useState } from "react";

function Messages() {
    const [minhas_mensagens, setMinhasMensagens] = useState([]);
    useEffect(() => {
        const MensagemService = new Mensagens();
        const run = async () => {
            try {
                const data = await MensagemService.getMinhasMensagens();
                setMinhasMensagens([...data]);
            } catch (error) {
                console.log(error);
            }
        }
        run();
    }, []);

    if (minhas_mensagens.length === 0) {
        return '';
    } else {
        return <Dropdown as="li" className="nav-item">
            <Dropdown.Toggle
            href="#"
            as={CustomToggle}
            variant="d-flex align-items-center"
            >
            <i className="material-symbols-outlined">mail</i>
            <Badge pill bg="danger" className="position-absolute" style={{ top: '35px', right: '0px', width: '20px', height: '20px', fontSize: '0.75rem', padding: '0.25em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {minhas_mensagens.length}
            </Badge>
            <span className="mobile-text d-none ms-3">
            Message
            </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="sub-drop">
            <Card className="shadow-none m-0">
            <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title bg-primary">
                <h5 className="mb-0 text-white">All Message</h5>
            </div>
            <small className="badge bg-light text-dark">{minhas_mensagens.length}</small>
            </Card.Header>
            <Card.Body className="p-0 ">
            {minhas_mensagens.map((mensagem) => {
                return (
                    <Link key={mensagem.id} to="#" className="iq-sub-card">
                        <div className="d-flex align-items-center" data-bs-toggle="tooltip" title={mensagem.pessoa_fisica.nome}>
                            <div className="">
                                <Image
                                    className="avatar-40 rounded"
                                    src={mensagem.pessoa_fisica.foto_url}
                                    alt=""
                                    loading="lazy"
                                />
                            </div>
                            <div className="w-100 ms-3">
                                <h6 className="mb-0">{mensagem.mensagem}</h6>
                                <small className="float-left font-size-12">{mensagem.data}</small>
                            </div>
                        </div>
                    </Link>
                );
            })}
            </Card.Body>
            </Card>
            </Dropdown.Menu>
        </Dropdown>
    }
}

export default Messages;