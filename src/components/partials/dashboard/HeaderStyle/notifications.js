import {
    Card, 
    Dropdown,
    Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomToggle from "../../../dropdowns";

//image
import user2 from "../../../../assets/images/user/02.jpg";
import user3 from "../../../../assets/images/user/03.jpg";
import user4 from "../../../../assets/images/user/04.jpg";

import { Mensagens } from "../../../../services/Mensagens";
import { useEffect, useState } from "react";

function Notifications() {
    const MensagemService = new Mensagens();
    const [notificacoes, setNotificacoes] = useState([]);

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
        <small className="badge  bg-light text-dark">4</small>
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
                <h6 className="mb-0 ">{notificacao.pessoa_fisica.nome}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">95 MB</p>
                    <small className="float-right font-size-12">
                    {notificacao.numero_de_mensagens}
                    </small>
                </div>
                </div>
            </div>
            </Link>
        })}
        <Link to="#" className="iq-sub-card">
        <div className="d-flex align-items-center">
            <div className="">
            <Image
                className="avatar-40 rounded"
                src={user2}
                alt=""
                loading="lazy"
            />
            </div>
            <div className="ms-3 w-100">
            <h6 className="mb-0 ">New customer is join</h6>
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Cyst Bni</p>
                <small className="float-right font-size-12">
                5 days ago
                </small>
            </div>
            </div>
        </div>
        </Link>
        <Link to="#" className="iq-sub-card">
        <div className="d-flex align-items-center">
            <div className="">
            <Image
                className="avatar-40 rounded"
                src={user3}
                alt=""
                loading="lazy"
            />
            </div>
            <div className="ms-3 w-100">
            <h6 className="mb-0 ">Two customer is left</h6>
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Cyst Bni</p>
                <small className="float-right font-size-12">
                2 days ago
                </small>
            </div>
            </div>
        </div>
        </Link>
        <Link to="#" className="iq-sub-card">
        <div className="d-flex align-items-center">
            <div className="">
            <Image
                className="avatar-40 rounded"
                src={user4}
                alt=""
                loading="lazy"
            />
            </div>
            <div className="w-100 ms-3">
            <h6 className="mb-0 ">New Mail from Fenny</h6>
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Cyst Bni</p>
                <small className="float-right font-size-12">
                3 days ago
                </small>
            </div>
            </div>
        </div>
        </Link>
    </Card.Body>
    </Card>
    </Dropdown.Menu>
    </Dropdown>
    </>
    );
}

export default Notifications;