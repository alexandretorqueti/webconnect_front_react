import { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import PessoaLogada from '../../../pessoas/Pessoa'

const RightSidebar = () => {
    const [pessoas, setPessoas] = useState([]);
    
    const carregaDados = async () => {
        try {
            const response = await fetch('http://localhost:8000/pessoas/api/pessoas_com_relacao', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            setPessoas(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    useEffect(() => {
        carregaDados();
    }, []);

    const minirightsidebar =() =>{
        document.getElementById('rightSidebar').classList.toggle('right-sidebar');
        document.body.classList.toggle('right-sidebar-close');
    }
    return (
        <>
            <div className="right-sidebar-mini" id="rightSidebar">
                <div className="right-sidebar-panel p-0">
                    <Card className="shadow-none">
                        <Card.Body className="p-0">
                            <div className="media-height p-3" data-scrollbar="init">
                                {
                                pessoas.map((pessoa, index) => 
                                    <PessoaLogada key={index}
                                    nome={pessoa.nome}
                                    foto={pessoa.foto_url}
                                    horaLogado={pessoa.hora_ultimo_login_humanizada}
                                    online={pessoa.status_online}
                                    numeroNotificacoes={pessoa.quantidade_de_mensagens_nao_lidas} />
                                )}
                            </div>
                            <div className="right-sidebar-toggle bg-primary text-white mt-3 d-flex" onClick={minirightsidebar}>
                              <span className="material-symbols-outlined">chat</span>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
            
        </>
    )
}

export default RightSidebar
