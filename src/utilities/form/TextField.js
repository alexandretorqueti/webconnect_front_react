import { Form } from 'react-bootstrap'

const TextField = ({ name, value, label, multiline, changeData }) => {
    return (
    <>
    <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
    <Form.Control 
        as={multiline ? "textarea" : "input"}
        className="form-control" 
        id={name}
        name={name}
        placeholder={label} 
        value={value} 
        onChange={changeData} />
    </>
    );
}
export default TextField;