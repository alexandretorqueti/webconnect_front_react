import { Comentarios } from '../../../../services/RedeSocial.js';
import PropTypes from 'prop-types';

function FormNewComentarioComponent(
    {
      post, 
      setPostAtual,
      comentario,
      setShowInput,
      busca_comentario
    }) {
  
  const ComentarioService = new Comentarios();



  function handleSubmit(e) {
    async function run() {
      e.preventDefault()
      const PostId = post.id;
      const message = e.target[0].value;
      if (comentario===null) {
        const newComentario = await ComentarioService.post(message, PostId);
        const newPost = {...post}
        newPost.comentarios.push(newComentario);
        setPostAtual(newPost);
      } else {
        const newComentario = await ComentarioService.post(message, PostId, comentario.id);
        const newPost = {...post}
        const comentarioEncontrado = busca_comentario(comentario.id, newPost.comentarios);
        if (comentarioEncontrado) {
        comentarioEncontrado.respostas.push(newComentario);
          setPostAtual(newPost);
          setShowInput(false);
        }
      }
      
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
  busca_comentario: PropTypes.func.isRequired,
};

export default FormNewComentarioComponent


