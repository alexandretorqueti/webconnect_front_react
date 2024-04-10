import { Form } from 'react-bootstrap';

const ComboField = ({ name, value, label, changeData, aux }) => {
    const isValid = aux && value && aux.some(item => item.id === value.id);

    return (
        <>
        <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
        <Form.Control as="select" 
            name={name} 
            className="form-select" 
            id={name} 
            value={isValid ? value.id : ""} 
            onChange={(e) => changeData(e, aux.filter((item) => item.id === parseInt(e.target.value))[0])}>
            <option value="">Selecione</option>
            {aux.map((item) => {
                return <option
                    key={item.id}
                    value={item.id}
                >{item.nome}</option>
            })}
        </Form.Control>
        </>
    );
}

export default ComboField;