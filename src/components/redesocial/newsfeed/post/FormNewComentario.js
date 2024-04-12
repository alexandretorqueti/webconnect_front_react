import { Comentarios } from '../../../../services/RedeSocial.js';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../../GlobalContext.js';
function FormNewComentarioComponent(
    {
      post, 
      setPostAtual,
      comentario,
      setShowInput,
      busca_comentario
    }) {
  const { pessoa_logada } = useGlobalContext();
  const ComentarioService = new Comentarios();



  function handleSubmit(e) {
    async function run() {
      e.preventDefault()
      const PostId = post.id;
      const message = e.target[0].value;
      if (comentario===null) {
        const newComentario = await ComentarioService.post(message, PostId);
        const newPost = {...post}
        const pessoas_que_comentaram = [...newPost.pessoas_que_comentaram];
        // Se a pessoa logada não tiver em pessoas que comentaram, adicionamos
        if (pessoas_que_comentaram.filter(pessoa => pessoa.id === pessoa_logada.id).length === 0) {
            pessoas_que_comentaram.push(pessoa_logada);
        }
        newPost.pessoas_que_comentaram = [...pessoas_que_comentaram];
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


