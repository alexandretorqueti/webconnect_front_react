import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'
import DropdownCurtida from './DropdownCurtida';
import { Curtidas } from '../../../../services/RedeSocial.js';
import { useGlobalContext } from '../../../../GlobalContext';

function PostLikesComponent({pessoas_que_curtiram, icones, post_id, minha_curtida}) {
    const [curtida, setCurtida] = useState(null);
    const {pessoa_logada} = useGlobalContext();
    const [quem_curtiu, setQuemCurtiu] = useState([]);

    const curtiu = (curtida) => {
        const pessoas_que_curtiram_local = [...quem_curtiu];

        if (curtida) {
            const pessoa_logada_local = {...pessoa_logada};
            if (pessoas_que_curtiram_local.filter(pessoa => pessoa.id === pessoa_logada_local.id).length === 0) {
                pessoas_que_curtiram_local.push(pessoa_logada_local);
            }
            setQuemCurtiu(pessoas_que_curtiram_local);
        } else {
            const index = pessoas_que_curtiram_local.findIndex(pessoa => pessoa.id === pessoa_logada.id);
            if (index > -1) {
                pessoas_que_curtiram_local.splice(index, 1);
            }
            setQuemCurtiu(pessoas_que_curtiram_local);
        }
        setCurtida(curtida);
    }

    useEffect(() => {
        setQuemCurtiu(pessoas_que_curtiram);
        curtiu(minha_curtida);
        //Aqui precisamos adicionar ao array pessoas_que_curtiram a pessoa logada, caso minha_curtida não seja nulo.
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        (new Curtidas()).post(post_id, 0);
        curtiu (null);
    }
    return (
        <div className="d-flex align-items-center">
            <div className="like-data">
                <Dropdown>
                    <Dropdown.Toggle  as={CustomToggle} >
                        {(curtida && curtida != null && curtida.icone && curtida.icone.nome) ?
                            <img data-controle="1" src={curtida.icone.icone} className="img-fluid" alt="" onClick={handleClick}/>
                        :
                            <i data-controle="3" className="las la-thumbs-up" style={{ fontSize: '31px'}}></i>
                        }
                    </Dropdown.Toggle>
                    <DropdownCurtida icones={icones} post_id={post_id} setCurtida={(curtida) => curtiu(curtida)} />
                </Dropdown>
            </div> 
            {quem_curtiu.length > 0 &&
                <div className="total-like-block ms-2 me-3">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                        {quem_curtiu.length} Likes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                quem_curtiu.map((pessoa, index) =>
                                    <Dropdown.Item key={index} href="#" onClick={(e) => e.preventDefault()}>
                                        {pessoa.nome}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }
        </div>)}

export default PostLikesComponent;