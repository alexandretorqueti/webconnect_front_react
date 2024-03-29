import { Comentarios } from '../../../../services/RedeSocial.js';
import PropTypes from 'prop-types';

function FormNewComentarioComponent(
    {
      post, 
      setPostAtual
    }) {
  
  function handleSubmit(e) {
    async function run() {
      e.preventDefault()
      const PostId = post.id;
      const comentario = e.target[0].value;
      const newComentario = await (new Comentarios()).post(comentario, PostId);
      const newPost = {...post}
      newPost.comentarios.push(newComentario);
      setPostAtual(newPost);
      e.target[0].value = '';}
    run();
  }

  return (
    <form className="comment-text d-flex align-items-center mt-3" onSubmit={handleSubmit}>
      <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
      <div className="comment-attagement d-flex">
      </div>
    </form>  
  )
}


FormNewComentarioComponent.propTypes = {
  post: PropTypes.object.isRequired,
  setPostAtual: PropTypes.func.isRequired,
};

export default FormNewComentarioComponent


