import { Form, Row } from 'react-bootstrap';

const CheckField = ({ name, value, label, changeData, aux }) => {
    return (
        <>
        <Row>
        <Form.Label htmlFor="fname"  className="form-label d-block">{label}:</Form.Label>
        </Row>
        <Row>
        {aux.map((item) => {
            return <Form.Check
                key={item.id}
                type="checkbox"
                name={name}
                label={item.nome}
                value={item.id}
                className="form-check form-check-inline" 
                checked={value.indexOf(item.id) > -1}
                onChange={(event) => changeData(event, event.target.checked ? [...value, item.id] : value.filter((item_id) => item_id !== item.id)) }
            />
        })}
        </Row>
        </>
    );
}

export default CheckField;