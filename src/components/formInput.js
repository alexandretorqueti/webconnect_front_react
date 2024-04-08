import { useEffect, useState } from 'react'
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
    inputValid,
    setInputValid = () => {},
    errorList = {},
    }) {
    const [touched, setTouched] = useState(false)
    const [message, setMessage] = useState('')

    const handlerSet = (e) => {
        set(e.target.value);
        setTouched(true);
        let mensagem = '';
        const localInputValid = { ...inputValid };
        localInputValid[id] = false;
        if (required && e.target.value === '') {
            if (touched) {
                mensagem = `${label} is required`;
            }
        } else {
            if (touched) {
                mensagem = setErrorMessage(e, paramErrorMessage);
            }
        }
        setMessage(mensagem);
        if (mensagem === undefined || mensagem === undefined || mensagem === '') {
            localInputValid[id] = true;
        }

        setInputValid(localInputValid);
    }

    useEffect(() => {
        const localInputValid = { ...inputValid };
        localInputValid[id] = false;
        setInputValid(localInputValid);
    }, [])

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
        {touched && (message || (errorList && JSON.stringify(errorList) != '{}')) && <Error name={name} message={message} errorList={errorList[name]}/>}
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
        {touched && (message || (errorList && JSON.stringify(errorList) != '{}')) && <Error name={name} message={message} errorList={errorList[name]}/>}
    </Form.Group>
    )
}

export default FormInputComponent;