import { Dropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import './DropdownCurtida.css'

function DropdownCurtidaComponent({icones}) {
  return (
    icones.length > 0 &&
        <Dropdown.Menu className=" py-2">
            {
                icones.map((icone, index) =>
                    <OverlayTrigger
                        key={index}
                        placement="top"
                        overlay={<Tooltip>{icone.nome}</Tooltip>}
                        className="ms-2 me-2" >
                            <img src={icone.url} className="img-fluid me-2 imgCurtida" alt=""/>
                    </OverlayTrigger>
            )}
        </Dropdown.Menu>
  );
}

export default DropdownCurtidaComponent;