import React from 'react';
import { Col, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ShareOffcanvas from '../../../share-offcanvas'
import CustomToggle from '../../../dropdowns'
import Comentario from './Comentario'
import FormNewComentario from './FormNewComentario'
import PostLikes from './PostLikes';


import MenuPost from './MenuPost';
// Importe os demais ícones da mesma maneira

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
