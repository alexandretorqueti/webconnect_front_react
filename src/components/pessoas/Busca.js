import {
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";


import ModalBusca from "./ModalBusca";

function BuscaComponent({ show, handleShow, handleClose, pessoasSemRelacao, setPessoasSemRelacao, pessoasComRelacao, setPessoasComRelacao }) {
    
    return (
        <>
        <div className="iq-search-bar device-search  position-relative">
        <form
          action="#"
          className="searchbox"
          onClick={handleShow}
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFullscreenSm"
        >
          <Link className="search-link d-none d-lg-block" to="/">
            <span className="material-symbols-outlined">search</span>
          </Link>
          <Form.Control
            type="text"
            className="text search-input form-control bg-soft-primary  d-none d-lg-block"
            placeholder="Search here..."
          />
          <Link
            className="d-lg-none d-flex d-none d-lg-block"
            to="/"
            onClick={handleShow}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalFullscreenSm"
          >
            <span className="material-symbols-outlined">search</span>
          </Link>
        </form>

        <ModalBusca 
            show={show} 
            handleClose={handleClose} 
            handleShow={handleShow} 
            pessoasSemRelacao={pessoasSemRelacao}
            setPessoasSemRelacao={setPessoasSemRelacao}
            pessoasComRelacao={pessoasComRelacao}
            setPessoasComRelacao={setPessoasComRelacao}
        ></ModalBusca>
      </div>

    </>
    );
}

export default BuscaComponent;