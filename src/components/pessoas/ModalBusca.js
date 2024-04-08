import {
    Form,
    Modal,
  } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchItem from "../SearchItem";
import SuggestionsItem from "../SuggestionsItem";
import { Pessoas } from "../../services/Pessoas";

function ModalBuscaComponent({ 
        show, 
        handleClose, 
        handleShow, 
        pessoasSemRelacao, 
        setPessoasSemRelacao, 
        pessoasComRelacao, 
        setPessoasComRelacao,
        setFiltro}) {
    const handleCloseUser = () => console.log("handleCloseUser");
    const PessoaService = new Pessoas();

    const handleFollow = (pessoa) => {
        const run = async () => {
            try {
                await PessoaService.Seguir(pessoa.id);
                const pessoasSemRelacao_local = pessoasSemRelacao.filter(p => p.id !== pessoa.id);
                setPessoasSemRelacao(pessoasSemRelacao_local);

                const pessoasComRelacao_local = [...pessoasComRelacao];
                const pessoa_local = {...pessoa};
                setPessoasComRelacao([ pessoa_local, ...pessoasComRelacao_local ])

            } catch (error) {
                console.log(error);
            }
        }
        run();
    }
    return (
    <Modal
    show={show}
    onHide={handleClose}
    className="search-modal"
    id="post-modal"
    style={{ top: '103px', overflow: 'hidden' }}
    >
    <div className="modal-fullscreen-lg-down m-0">
        <Modal.Header className="py-2">
        <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
            <form
            action="#"
            className="searchbox w-50"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalFullscreenSm"
            onClick={handleShow}
            onSubmit={(e) => {
                e.preventDefault();
                handleShow();
            }}
            >
            <Link className="search-link" to="/">
                <span className="material-symbols-outlined">
                search
                </span>
            </Link>

            <Form.Control
                type="text"
                className="text search-input bg-soft-primary"
                placeholder="Search here..."
                onChange={(e) => setFiltro(e.target.value)}
                style={{ color: 'green' }}
            />
            </form>

            <Link
            to="/"
            className="material-symbols-outlined text-dark"
            onClick={handleClose}
            >
            close
            </Link>
        </div>
        {/* <Modal.Title> */}
        <div className="d-flex align-items-center justify-content-between ms-auto w-100">
            <h5 className=" h4" id="exampleModalFullscreenLabel">
            Recent
            </h5>

            <Link to="/" className="text-dark">
            Clear All
            </Link>
        </div>
        {/* </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="p-0">
        <div className="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
            <h5 className=" h4" id="exampleModalFullscreenLabel">
            Recent
            </h5>

            <Link to="/" className="text-dark">
            Clear All
            </Link>
        </div>
        { pessoasSemRelacao && pessoasSemRelacao.map((pessoa) =>
        <SearchItem 
            key={pessoa.id} 
            name={pessoa.nome} 
            image={pessoa.foto_url} 
            handleClose={handleCloseUser}
            handleFollow={() => handleFollow(pessoa)}
            ></SearchItem>
        )}
        <div className="">
            <h4 className="px-3 py-2">Suggestions</h4>
            
            <div className="suggestion-card px-3 d-flex">
            { pessoasSemRelacao && pessoasSemRelacao.map((pessoa) =>
            <SuggestionsItem 
            key={pessoa.id} 
            name={pessoa.nome} 
            imagem={pessoa.foto_url}
            handleFollow={() => handleFollow(pessoa)}
            ></SuggestionsItem>
            )}
            </div>
        </div>
        </Modal.Body>
    </div>
    </Modal> )
}

export default ModalBuscaComponent;