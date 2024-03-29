import { Dropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import './DropdownCurtida.css'
import { Curtidas } from '../../../../services/RedeSocial.js';

function DropdownCurtidaComponent({icones, post_id, setCurtida}) {
    const handleClick = (e) => {
        const run = async () => {
            e.preventDefault();
            e.stopPropagation();
            const icone_id = e.target.dataset.id;
            const curtida = await (new Curtidas()).post(post_id, icone_id);
            setCurtida(curtida);
        }
        run();
    }


  return (
    icones.length > 0 &&
        <Dropdown.Menu className=" py-2">
            {
                icones.map((icone, index) =>
                    <OverlayTrigger
                        key={icone.id}
                        placement="top"
                        overlay={<Tooltip>{icone.nome}</Tooltip>}
                        className="ms-2 me-2"
                    >
                            <img data-id={icone.id} src={icone.icone} className="img-fluid me-2 imgCurtida" alt="" onClick={handleClick}/>
                    </OverlayTrigger>
            )}
        </Dropdown.Menu>
  );
}

export default DropdownCurtidaComponent;