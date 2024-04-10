import { Form } from 'react-bootstrap';

const DateField = ({ name, value, label, changeData }) => {
    return (
        <>
        <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
        <Form.Control type="date" className="form-control" id={name} name={name} value={value} onChange={changeData} />
        </>
    );
}

export default DateField;