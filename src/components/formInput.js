import { useState } from 'react'
import { Form } from 'react-bootstrap'
import Error from './error'

function FormInputComponent({ 
    type, 
    label, 
    id, 
    name, 
    placeholder, 
    set, 
    setErrorMessage = () => {}, 
    paramErrorMessage = {},
    required = false, 
    setError = () => {} 
    }) {
    const [touched, setTouched] = useState(false)
    const [message, setMessage] = useState('')

    const handlerSet = (e) => {
        set(e.target.value);
        setTouched(true);

        if (required && e.target.value === '') {
            if (touched) {
                setMessage(`${label} is required`);
            }
            setError(true);
        } else {
            if (touched) {
                setMessage(setErrorMessage(e, paramErrorMessage));
            }
            setError(true);
        }
    }
    if (type === 'checkbox') {
    return (
        <Form.Group className="form-group">
        <Form.Check className="d-inline-block mt-2 pt-1">
            <Form.Check.Input
            type={type} 
            className="me-2" 
            id={id} 
            onChange={(e) => handlerSet(e) }
            />
            <Form.Check.Label>
                {label}
            </Form.Check.Label>
        </Form.Check>
        {touched && message && <Error name={name} message={message} />}
        </Form.Group>
    )
    }
    return (
    <Form.Group className="form-group">
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            className="mb-0"
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={(e) => handlerSet(e) } 
        />
        {touched && message && <Error name={name} message={message} />}
    </Form.Group>
    )
}

export default FormInputComponent;