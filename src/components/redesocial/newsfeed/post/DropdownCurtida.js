import { Dropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import './DropdownCurtida.css'
import { Curtidas } from '../../../../services/RedeSocial.js';

function DropdownCurtidaComponent({icones, post_id, setUrl}) {
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const icone_id = e.target.dataset.id;
        (new Curtidas()).post(post_id, icone_id);
        setUrl(e.target.src);
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
                            <img data-id={icone.id} src={icone.url} className="img-fluid me-2 imgCurtida" alt="" onClick={handleClick}/>
                    </OverlayTrigger>
            )}
        </Dropdown.Menu>
  );
}

export default DropdownCurtidaComponent;