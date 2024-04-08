import ModalBusca from "./ModalBusca";
import { Pessoas } from "../../services/Pessoas";
import { useEffect } from "react";

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


    useEffect(() => {
        // A cada alteração do filtro, se ele tiver mais de 3 caracteres, esperamos 2 segundos e realizamos a busca
        if (filtro.length > 2) {
            const timer = setTimeout(() => {
                run();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [filtro]);

    return (
        <>
        <div className="iq-search-bar device-search  position-relative">
        
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

