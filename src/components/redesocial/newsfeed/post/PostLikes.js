import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'
import DropdownCurtida from './DropdownCurtida';
import { Curtidas } from '../../../../services/RedeSocial.js';

function PostLikesComponent({pessoas_que_curtiram, icones, post_id, minha_curtida}) {
    const [url, setUrl] = useState(null);
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        (new Curtidas()).post(post_id, 0);
        setUrl('');
    }
    return (
        <div className="d-flex align-items-center">
            <div className="like-data">
                <Dropdown>
                    <Dropdown.Toggle  as={CustomToggle} >
                        {(minha_curtida && minha_curtida != null && minha_curtida.icone.nome && url === null) ?
                        <img data-controle="1" src={minha_curtida.icone.url} className="img-fluid" alt="" onClick={handleClick}/>
                        :
                            (url && url != null && url !== '') ? 
                            <img data-controle="2" src={url} className="img-fluid" alt="" onClick={handleClick}/>
                            :
                            <i data-controle="3" className="las la-thumbs-up" style={{ fontSize: '31px'}}></i>
                        }
                    </Dropdown.Toggle>
                    <DropdownCurtida icones={icones} post_id={post_id} setUrl={setUrl} />
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
                                    <Dropdown.Item key={pessoa.id} href="javascript:void(0)">
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