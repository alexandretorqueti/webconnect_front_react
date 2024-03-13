import { Link } from 'react-router-dom'

function ComentarioComponent({userName, userPhoto, comentario}) {
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
                    <span> 5 min </span>
                </div>
            </div>
        </div>
    </li>
);
}

export default ComentarioComponent;