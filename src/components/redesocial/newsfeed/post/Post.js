import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ShareOffcanvas from '../../../share-offcanvas'
import Comentario from './Comentario'
import FormNewComentario from './FormNewComentario'
import PostLikes from './PostLikes';
import PostComents from './PostComents';

import MenuPost from './MenuPost';


function PostComponent({ post, icones, children, setPostAtual, setComentarioId }) {
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
                            <PostLikes pessoas_que_curtiram={post.pessoas_que_curtiram} icones={icones} />
                            {post.comentarios.length > 0 &&
                                <PostComents comentarios={post.comentarios} pessoas_que_comentaram={post.pessoas_que_comentaram} />
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
                                hora={comentario.naturalTime}
                                />
                                )
                            )
                        }
                    </ul>
                    <FormNewComentario post={post} setPostAtual={setPostAtual} setComentarioId={setComentarioId}/>
                </div>
            </Card.Body>
        </Card>
    </Col>
  );
}

export default PostComponent;
