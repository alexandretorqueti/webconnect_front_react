import React from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'


function PostComentsComponent({ comentarios, pessoas_que_comentaram }) {
  return (
    <div className="total-comment-block ms-2 me-3">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}  id="post-option" >
            {comentarios.length} Comment
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    pessoas_que_comentaram.map((pessoa, index) => 
                        <Dropdown.Item key={index} href="javascript:void(0)">
                            {pessoa.pessoa_fisica__nome}
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    </div>)}

export default PostComentsComponent;
