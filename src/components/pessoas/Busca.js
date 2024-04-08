import {
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalBusca from "./ModalBusca";
import { Pessoas } from "../../services/Pessoas";

function BuscaComponent({ 
        show, 
        handleShow, 
        handleClose, 
        pessoasSemRelacao, 
        setPessoasSemRelacao, 
        pessoasComRelacao, 
        setPessoasComRelacao, 
        filtro,
        setFiltro}) {

    const PessoaService = new Pessoas();
    const run = async () => {
        try {
            const data = await PessoaService.getPessoasSemRelacao(1, filtro);
            setPessoasSemRelacao([...data]);
            handleShow();
        } catch (error) {
            console.log(error);
        }
    }
    const clickSearch = () => {
        run();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        run();
    }

    return (
        <>
        <div className="iq-search-bar device-search  position-relative">
        <form
          action="#"
          className="searchbox"
          
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFullscreenSm"
          onSubmit={handleSubmit}
        >
          <Link className="search-link d-none d-lg-block" to="/">
            <span className="material-symbols-outlined">search</span>
          </Link>
          <Form.Control
            type="text"
            className="text search-input form-control bg-soft-primary  d-none d-lg-block"
            placeholder="Search here"
            onChange={(e) => setFiltro(e.target.value)}
            onFocus={handleClose}
          />

          <Link
            className="d-lg-none d-flex d-none d-lg-block"
            onClick={clickSearch}
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
            filtro={filtro}
            setFiltro={setFiltro}
        ></ModalBusca>
      </div>

    </>
    );
}

export default BuscaComponent;