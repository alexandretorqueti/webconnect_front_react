import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Menu from '../../../Menu';
import { Comentarios, CurtidasComentarios } from '../../../../services/RedeSocial';
import ModalConfirm from '../../../ModalConfirm';

function ComentarioComponent({ comentario , setDeleteComentario, setMinhaCurtidaComentario}) {
    const [itens, setItens] = useState([]);
    const [show, setShow] = useState(false);
    
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
    <li className="mb-2">
        <div className="d-flex justify-content-between">
            <div className='d-flex'>
                <div className="user-img">
                    <img src={comentario.pessoa_fisica.foto_url} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                </div>
                <div className="comment-data-block ms-3">
                    <h6>{comentario.pessoa_fisica.nome}</h6>
                    <p className="mb-0">{comentario.comentario}</p>
                    <div className="d-flex flex-wrap align-items-center comment-activity">
                        <Link onClick={LikeComentario}>
                            {(comentario.minha_curtida) ? 'unlike' : 'like'}&nbsp;
                            ({comentario.quantidade_curtidas})
                        </Link>
                        <Link>reply</Link>
                        <span> {comentario.naturalTime} </span>
                    </div>
                </div>
            </div>
            <Menu itens={itens} />
            <ModalConfirm 
                show={show} 
                setShow={setShow} 
                handleConfirm={handleConfirm} 
                title="Delete Coment"
                message="Are you sure you want to delete this comment?"
            />
        </div>
    </li>
);
}

export default ComentarioComponent;