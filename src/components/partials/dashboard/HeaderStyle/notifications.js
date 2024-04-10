import {
    Card, 
    Dropdown,
    Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomToggle from "../../../dropdowns";
import { Mensagens } from "../../../../services/Mensagens";
import { useEffect, useState } from "react";

import { useGlobalContext } from "../../../../GlobalContext";

function Notifications() {
    const MensagemService = new Mensagens();
    const { mensagens, TIPOSMENSAGENS, pessoa_logada } = useGlobalContext();
    const [notificacoes, setNotificacoes] = useState([]);
    const [posicaoMensagem, setPosicaoMensagem] = useState(0);

    useEffect(() => {
        const run = async () => {
            try {
                const data = await MensagemService.getNotificacoes();
                setNotificacoes([...data]);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        run();
    }, []);

    useEffect(() => {
        let posicao = posicaoMensagem;
        while (mensagens[posicao])
        {
            const mensagemAtual = mensagens[posicao];
            if (mensagemAtual['tipo'] === TIPOSMENSAGENS.MENSAGEM_ENTRE_USUARIOS) {
                const notificacoes_local = [...notificacoes];
                if (mensagemAtual.pessoa_id_to === pessoa_logada.id)
                {
                    const { pessoa_id_from } = mensagemAtual;
                    notificacoes_local.map((msg) => {
                        if (msg.pessoa_fisica.id === pessoa_id_from)
                        {
                            msg.hora_ultima_mensagem = 'now';
                            setNotificacoes([...notificacoes_local]);
                        }
                    })
                }
            }

            posicao++;
            setPosicaoMensagem(posicao);
        }
    }, [mensagens]);

    if (notificacoes.length === 0) {
        return '';
    } else {
        return (
        <>
        <Dropdown as="li" className="nav-item ">
        <Dropdown.Toggle
        href="#"
        as={CustomToggle}
        variant="search-toggle d-flex align-items-center"
        >
        <i className="material-symbols-outlined">notifications</i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="sub-drop">
        <Card className="shadow-none m-0">
        <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title bg-primary">
            <h5 className="mb-0 text-white ">All Notifications</h5>
            </div>
            <small className="badge  bg-light text-dark">{notificacoes.length}</small>
        </Card.Header>
        <Card.Body className="p-0">
            {notificacoes.map((notificacao) => {
                return <Link key={notificacao.pessoa_fisica.id} to="#" className="iq-sub-card">
                <div className="d-flex align-items-center">
                    <div className="">
                    <Image
                        className="avatar-40 rounded"
                        src={notificacao.pessoa_fisica.foto_url}
                        alt=""
                        loading="lazy"
                    />
                    </div>
                    <div className="ms-3 w-100">
                    <h6 className="mb-0 ">{notificacao.tipo}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">{notificacao.pessoa_fisica.nome}</p>
                        <small className="float-right font-size-12">
                        {notificacao.hora_ultima_mensagem}
                        </small>
                    </div>
                    </div>
                </div>
                </Link>
            })}
        </Card.Body>
        </Card>
        </Dropdown.Menu>
        </Dropdown>
        </>
        );
    }
}

export default Notifications;