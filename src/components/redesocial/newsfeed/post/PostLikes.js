import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'
import DropdownCurtida from './DropdownCurtida';
import { Curtidas } from '../../../../services/RedeSocial.js';

function PostLikesComponent({pessoas_que_curtiram, icones, post_id, minha_curtida}) {
    const [curtida, setCurtida] = useState(null);

    useEffect(() => {
        setCurtida(minha_curtida);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        (new Curtidas()).post(post_id, 0);
        setCurtida (null);
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
                    <DropdownCurtida icones={icones} post_id={post_id} setCurtida={setCurtida} />
                </Dropdown>
            </div> 
            {pessoas_que_curtiram.length > 0 &&
                <div className="total-like-block ms-2 me-3">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                        {pessoas_que_curtiram.length} Likes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pessoas_que_curtiram.map((pessoa, index) =>
                                    <Dropdown.Item key={index} href="javascript:void(0)">
                                        {pessoa.pessoa_fisica__nome}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }
        </div>)}

export default PostLikesComponent;