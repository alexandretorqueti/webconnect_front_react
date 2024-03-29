import { Link } from "react-router-dom"
import { Comentarios } from '../../../../services/RedeSocial.js';

function FormNewComentarioComponent({post, setPostAtual}) {
  
  function handleSubmit(e) {
    async function run() {
      e.preventDefault()
      const PostId = post.id;
      const comentario = e.target[0].value;
      const newComentario = await (new Comentarios()).post(comentario, PostId);
      post.comentarios.push(newComentario);
      setPostAtual(post);
      e.target[0].value = '';}
    run();
  }

  return (
    <form className="comment-text d-flex align-items-center mt-3" onSubmit={handleSubmit}>
    <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
    <div className="comment-attagement d-flex">
        <Link to="#"><i className="ri-link me-3"></i></Link>
        <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
        <Link to="#"><i className="ri-camera-line me-3"></i></Link>
    </div>
</form>  )
}

export default FormNewComentarioComponent


