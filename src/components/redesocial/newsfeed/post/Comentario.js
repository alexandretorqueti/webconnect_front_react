import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Menu from '../../../Menu';
import { Comentarios, CurtidasComentarios } from '../../../../services/RedeSocial';
import ModalConfirm from '../../../ModalConfirm';
import { useGlobalContext } from '../../../../GlobalContext';
import FormNewComentario from './FormNewComentario';
import Pessoa from '../../../pessoas/Pessoa';
import './Comentario.css';

function ComentarioComponent({ 
    comentario , 
    setDeleteComentario, 
    setMinhaCurtidaComentario,
    post,
    setPostAtual,
    busca_comentario
    }) {
    const { pessoa_logada } = useGlobalContext();
    const [itens, setItens] = useState([]);
    const [show, setShow] = useState(false);
    const [showInput, setShowInput] = useState(false);
    
    const LikeComentario = async () => {
        const result = await (new CurtidasComentarios()).post(comentario.id);
            setMinhaCurtidaComentario(
                {
                    comentario_id: comentario.id,
                    curtida: result.id > 0
                }
            );
    }
    
    const handleConfirm = async () => {
        const result = await (new Comentarios()).delete(comentario.id);
        if (result.status === 'success') {
            const post_local = {...post};
            const pessoas_que_comentaram = [...post_local.pessoas_que_comentaram];
            const index = pessoas_que_comentaram.findIndex(pessoa => pessoa.id === pessoa_logada.id);
            if (index !== -1) {
                pessoas_que_comentaram.splice(index, 1);
            }
            post_local.pessoas_que_comentaram = pessoas_que_comentaram;
            setPostAtual(post_local);
            setDeleteComentario(comentario.id);
        } 
    }

    useEffect(() => {
        setItens([{
            id: 1,
            title: 'Delete',
            content: 'Delete this comment',
            icon: 'ri-delete-bin-line',
            enabled: true,
            visible: true,
            action: () => {
                setShow(true);
            }
        }]);
    }, []);
    return (
    (comentario.deleted) ? null : (
    <>
        <li className="mb-2">
            <Pessoa pessoa={comentario.pessoa_fisica} avatar="50">
                <div className='justify-content-between d-flex comentario-content'>
                    <div className="comment-data-block ms-3">
                        <p className="mb-0">{comentario.comentario}</p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">
                            <Link onClick={LikeComentario}>
                                {(comentario.minha_curtida) ? 'unlike' : 'like'}&nbsp;
                                ({comentario.quantidade_curtidas})
                            </Link>
                            {(!showInput) &&
                                <Link onClick={() => setShowInput(true)}>reply</Link>
                            }
                            <span> {comentario.naturalTime} </span>
                        </div>
                    </div>
                    {pessoa_logada && pessoa_logada.id === comentario.pessoa_fisica.id && <Menu itens={itens} />}
                </div>
            </Pessoa>
            
                
            <ModalConfirm 
                show={show} 
                setShow={setShow} 
                handleConfirm={handleConfirm} 
                title="Delete Coment"
                message="Are you sure you want to delete this comment?"
            />
            
        </li>
        <li className="mb-2">
            {showInput &&
                    <div className="comment-data-block ms-3">
                        <FormNewComentario 
                            post={post} 
                            setPostAtual={setPostAtual}
                            comentario={comentario}
                            setShowInput={setShowInput}
                            busca_comentario={(id, lista) => busca_comentario(id, lista)}
                            />
                    </div>
            }
            {comentario.respostas.length > 0 &&
                    <ul className="post-comments list-inline m-0" style={{ paddingLeft: '50px' }}>
                        {comentario.respostas.map((resposta) => (
                            <ComentarioComponent 
                                key={resposta.id} 
                                comentario={resposta} 
                                setDeleteComentario={setDeleteComentario} 
                                setMinhaCurtidaComentario={setMinhaCurtidaComentario}
                                post={post}
                                setPostAtual={setPostAtual}
                                busca_comentario={(id, lista) => busca_comentario(id, lista)}
                            />
                        ))}
                    </ul>
                    }
                   
        </li>
    </>)
);}

export default ComentarioComponent;