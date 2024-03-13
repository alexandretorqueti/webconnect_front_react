import React, { useEffect, useState } from 'react'
import {Card, Image} from 'react-bootstrap'
import PessoaLogada from '../../../pessoas/PessoaLogada'

//image
import user1 from '../../../../assets/images/user/01.jpg'
import user2 from '../../../../assets/images/user/02.jpg'
import user3 from '../../../../assets/images/user/03.jpg'
import user4 from '../../../../assets/images/user/04.jpg'
import user5 from '../../../../assets/images/user/11.jpg'
import user6 from '../../../../assets/images/user/12.jpg'

const RightSidebar = () => {
    const [pessoas, setPessoas] = useState([]);
    
    const carregaDados = async () => {
        try {
            const response = await fetch('http://localhost:8000/pessoas/api/pessoas_com_relacao', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Token ' + localStorage.getItem('token')
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
                                    <PessoaLogada key={index} nome={pessoa.nome} foto={pessoa.foto_url} horaLogado="Agora" />
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
