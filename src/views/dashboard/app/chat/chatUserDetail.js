import {Row, Col} from 'react-bootstrap'
import './chat.css'

function ChatUserDetailComponent({ pessoa }) {
  return (
    <div className="chatuser-detail text-left mt-4">
        <Row>
            <Col md="6" className="col-6  title">Name:</Col>
            <Col md="6" className="col-6  text-right">{pessoa.nome}</Col>
        </Row>
        <hr/>
        <Row>
            <Col md="6" className="col-6 title">Tel:</Col>
            <Col md="6" className="col-6 text-right">072 143 9920</Col>
        </Row>
        <hr/>
        <Row>
            <Col md="6" className="col-6 title">Date Of Birth:</Col>
            <Col md="6" className="col-6 text-right">{pessoa.pessoa_fisica.data_nascimento}</Col>
        </Row>
        <hr/>
        {pessoa.pessoa_fisica.genero &&
        <>
        <Row>
            <Col md="6" className="col-6 title">Gender:</Col>
            <Col md="6" className="col-6 text-right">{pessoa.pessoa_fisica.genero.nome}</Col>
        </Row>
        <hr/>
        </>
        }
        {pessoa.pessoa_fisica.estadocivil &&
        <>
        <Row>
            <Col md="6" className="col-6 title">marital status:</Col>
            <Col md="6" className="col-6 text-right">{pessoa.pessoa_fisica.estadocivil.nome}</Col>
        </Row>
        <hr/>
        </>
        }
        {pessoa.pessoa_juridica &&
        <>
            <Row>
                <Col md="6" className="col-6 title">CNPJ:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.cnpj}</Col>
            </Row>
            <hr/>
            <Row>
                <Col md="6" className="col-6 title">Razão Social:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.razao_social}</Col>
            </Row>
            <hr/>
            <Row>
                <Col md="6" className="col-6 title">Nome Fantasia:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.nome_fantasia}</Col>
            </Row>
            <hr/>
            <Row>
                <Col md="6" className="col-6 title">Inscrição Estadual:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.inscricao_estadual}</Col>
            </Row>
            <hr/>
            <Row>
                <Col md="6" className="col-6 title">Inscrição Municipal:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.inscricao_municipal}</Col>
            </Row>
            <hr/>
            <Row>
                <Col md="6" className="col-6 title">Data de Fundação:</Col>
                <Col md="6" className="col-6 text-right">{pessoa.pessoa_juridica.data_fundacao}</Col>
            </Row>
            <hr/>
        </>
    }
    </div>
  );
}

export default ChatUserDetailComponent;