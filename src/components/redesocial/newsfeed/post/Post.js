import React from 'react';
import { Col, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ShareOffcanvas from '../../../share-offcanvas'
import CustomToggle from '../../../dropdowns'
import Comentario from './Comentario'
import FormNewComentario from './FormNewComentario'
import DropdownCurtida from './DropdownCurtida';

import icon1 from '../../../../assets/images/icon/01.png'
import MenuPost from './MenuPost';
// Importe os demais ícones da mesma maneira



function PostComponent({ post, icones, children }) {
  return (
    <Col sm={12}>
        <Card className=" card-block card-stretch card-height">
            <Card.Body>
                <div className="user-post-data">
                    <div className="d-flex justify-content-between">
                        <div className="me-3">
                            <img className="rounded-circle img-fluid avatar-50" src={post.pessoa_fisica.foto_url} alt="" style={{ objectFit: 'unset' }} />
                        </div>
                        <div className="w-100">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="mb-0 d-inline-block">{post.pessoa_fisica.nome}</h5>
                                    {children}
                                    <p className="mb-0 text-primary">{post.data_criacao}</p>
                                </div>
                                <MenuPost />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <p>{post.content}</p>
                </div>
                <div className="user-post">
                    <Link to="#"><img src={post.primeira_foto} alt="" className="img-fluid rounded w-100"/></Link>
                </div>
                <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="like-data">
                                    <Dropdown>
                                        <Dropdown.Toggle  as={CustomToggle} >
                                            <img src={icon1} className="img-fluid" alt=""/>
                                        </Dropdown.Toggle>
                                        <DropdownCurtida icones={icones} />
                                    </Dropdown>
                                </div> 
                                {post.pessoas_que_curtiram.length > 0 &&
                                    <div className="total-like-block ms-2 me-3">
                                        <Dropdown>
                                            <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                            {post.pessoas_que_curtiram.length} Likes
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    post.pessoas_que_curtiram.map((pessoa, index) =>
                                                        <Dropdown.Item key={index} href="javascript:void(0)">
                                                            {pessoa.pessoa_fisica__nome}
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                }
                            </div> 
                            {post.comentarios.length > 0 &&
                                <div className="total-comment-block ms-2 me-3">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                        {post.comentarios.length} Comment
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {
                                                post.pessoas_que_comentaram.map((pessoa, index) => 
                                                    <Dropdown.Item key={index} href="javascript:void(0)">
                                                        {pessoa.pessoa_fisica__nome}
                                                    </Dropdown.Item>
                                                )
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            }
                        </div>
                        <ShareOffcanvas />
                    </div>
                    <hr/>
                    <ul className="post-comments list-inline p-0 m-0">
                        {
                            (
                                post.comentarios.length > 0 && post.comentarios.map((comentario, index) =>
                                <Comentario
                                key={index}
                                userName={comentario.pessoa_fisica.nome} 
                                userPhoto={comentario.pessoa_fisica.foto_url}
                                comentario={comentario.comentario}
                                />
                                )
                            )
                        }
                    </ul>
                    <FormNewComentario post={post}/>
                </div>
            </Card.Body>
        </Card>
    </Col>
  );
}

export default PostComponent;
