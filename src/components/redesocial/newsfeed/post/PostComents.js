import { Dropdown } from 'react-bootstrap';
import CustomToggle from '../../../dropdowns'
import { useEffect, useState } from 'react';


function PostComentsComponent({ comentarios, pessoas_que_comentaram, deleteComentario }) {
    const [quantidadeComentarios, setQuantidadeComentarios] = useState(comentarios.filter(comentario => !comentario.deleted).length);

    useEffect(() => {
        //Aqui tenho que contar os comentários que não tem o deleted
        const quantidade = comentarios.filter(comentario => !comentario.deleted).length;
        setQuantidadeComentarios(quantidade);        
    }, [JSON.stringify(comentarios), deleteComentario]);

    return (
    <div className="total-comment-block ms-2 me-3">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}  id="post-option" >
            {quantidadeComentarios} Comment
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    pessoas_que_comentaram.map((pessoa, index) => 
                        <Dropdown.Item key={index} href="#" onClick={(e) => e.preventDefault()}>
                            {pessoa.nome}
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    </div>)}

export default PostComentsComponent;
