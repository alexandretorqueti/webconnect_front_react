import React from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'
import DropdownCurtida from './DropdownCurtida';
import icon1 from '../../../../assets/images/icon/01.png'

function postLikesComponent({pessoas_que_curtiram, icones}) {
    return (
        <div className="d-flex align-items-center">
            <div className="like-data">
                <Dropdown>
                    <Dropdown.Toggle  as={CustomToggle} >
                        <img src={icon1} className="img-fluid" alt=""/>
                    </Dropdown.Toggle>
                    <DropdownCurtida icones={icones} />
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

export default postLikesComponent;