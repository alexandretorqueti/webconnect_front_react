import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Menu from '../../../Menu';
import { Comentarios } from '../../../../services/RedeSocial';
import ModalConfirm from '../../../ModalConfirm';

function ComentarioComponent({userName, userPhoto, comentario, hora, comentarioId, setDeleteComentario}) {
    const [itens, setItens] = useState([]);
    const [show, setShow] = useState(false);
    const handleConfirm = async () => {
        const result = await (new Comentarios()).delete(comentarioId);
        if (result.status === 'success') {
            setDeleteComentario(comentarioId);
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
        <div className="d-flex">
            <div className="user-img">
                <img src={userPhoto} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
            </div>
            <div className="comment-data-block ms-3">
                <h6>{userName}</h6>
                <p className="mb-0">{comentario}</p>
                <div className="d-flex flex-wrap align-items-center comment-activity">
                    <Link to="#">like</Link>
                    <Link to="#">reply</Link>
                    <Link to="#">translate</Link>
                    <span> {hora} </span>
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