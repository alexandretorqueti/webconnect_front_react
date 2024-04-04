import { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import PessoaLogada from '../../../pessoas/Pessoa'
import { Pessoas } from '../../../../services/Pessoas'
const RightSidebar = () => {
    const [pessoas, setPessoas] = useState([]);
    const PessoasService = new Pessoas();
    const carregaDados = async () => {
        try {
            const data = await PessoasService.getPessoasComRelacao();
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
