import {
    Dropdown,
    Card,
    Form,
    Row, 
    Col
  } from "react-bootstrap";
import { Link } from "react-router-dom";
  
import CustomToggle from "../dropdowns";
import { Pessoas } from "../../services/Pessoas";
import { useEffect, useState } from "react";
import Pessoa from './Pessoa';

function SearchComponent({ pessoasComRelacao, setPessoasComRelacao }) {
    const [ pessoas, setPessoas ] = useState([]);
    const [ filtro, setFiltro ] = useState('');
    const PessoaService = new Pessoas();
    useEffect(() => {
        const run = async () => {
          const localPessoasSemRelacao = await (new Pessoas()).getPessoasSemRelacao(1, filtro);
          setPessoas(localPessoasSemRelacao);
        }
        run();
      }, []);
      const run = async () => {
        try {
            const data = await PessoaService.getPessoasSemRelacao(1, filtro);
            setPessoas([...data]);
        } catch (error) {
            console.log(error);
        }
    }
      useEffect(() => {
        const timer = setTimeout(() => {
            run();
        }, 1500);
        return () => clearTimeout(timer);
        
    }, [filtro]);
    const handleFollow = (pessoa) => {
        const run = async () => {
            try {
                await PessoaService.Seguir(pessoa.id);
                const pessoasSemRelacao_local = pessoas.filter(p => p.id !== pessoa.id);
                setPessoas(pessoasSemRelacao_local);

                const pessoasComRelacao_local = [...pessoasComRelacao];
                const pessoa_local = {...pessoa};
                setPessoasComRelacao([ pessoa_local, ...pessoasComRelacao_local ])

            } catch (error) {
                console.log(error);
            }
        }
        run();
    }
    return (
    <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle
        href="/"
        as={CustomToggle}
        variant="d-flex align-items-center"
        >
        <span className="material-symbols-outlined">search</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="sub-drop sub-drop-large">
        <Card className="shadow-none m-0" >
        <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title">
            <h5 className="mb-0 text-white">Search</h5>
            </div>
            <small className="badge  bg-light text-dark ">{ pessoas.length }</small>
        </Card.Header>
        <Card.Body className="p-0">
            <div className="text-center">
                <Form.Control
                    type="text"
                    className="text search-input bg-soft-primary"
                    placeholder="Search here..."
                    style={{ color: 'green' }}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>
            {pessoas && pessoas.map((pessoa) =>
            <Pessoa key={pessoa.id} pessoa={pessoa} showHoraLogin={false} showMensagensNaoLidas={false} avatar="50">
                <Row className="d-flex align-items-right justify-content-end">
                    <Col className="mb-0">{pessoa.quantidade_seguidores} Follower</Col>
                    <Col className="d-flex align-items-center">
                        <Link
                            to="#"
                            className="me-3 btn btn-primary rounded"
                            onClick={() => handleFollow(pessoa)}
                        >
                            Follow
                        </Link>
                    </Col>
                </Row>
            </Pessoa>
            )};
            
        </Card.Body>
        </Card>
        </Dropdown.Menu>
    </Dropdown>
    );
}

export default SearchComponent;