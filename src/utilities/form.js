import { Form, Button, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ItemForm from './form/ItemForm'
import loader from '../assets/images/page-img/page-load-loader.gif'

function FormComponent({ data, dataAux, fnUpdateData, exclude=[] }) {
    const [ fields, setFields ] = useState([]);
    const [ dados, setDados ] = useState(data);
    const [ showLoader, setShowLoader ] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoader(true);
        const formData = new FormData(event.target);
        const run = async () => {
            await fnUpdateData(formData);
        }
        run();
    }

    const changeData = (event, value) => {
        if (value)
            setDados({...dados, [event.target.name]: value})
        else    
            setDados({...dados, [event.target.name]: event.target.value})
    }
    
    useEffect(() => {
        const temVerbose = dados._field_details && Object.keys(dados._field_details).length > 0;
        let campos = []
        if (temVerbose) {
            campos = ([...Object.keys(dados._field_details)]);
        } else {
            campos = ([...Object.keys(dados)]);
        }
        setFields(campos);
        console.log(dataAux);
        console.log(fnUpdateData);
    }, []);

    return (
    <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
        { fields.map((prop, index) => {
            return <ItemForm key={index}
                name={prop}
                value={dados[prop]}
                label={dados._field_details[prop]['verbose_name']}
                type={dados._field_details[prop]['type']}
                changeData={changeData}
                dataAux={dataAux}
                exclude={exclude}
            ></ItemForm>
        })}
        </Row>
        <Button
            type="submit" 
            className="btn btn-primary me-2" 
            disabled={showLoader}
        >Submit</Button>
        {showLoader && <img src={loader} alt="loader" style={{height: "100px"}}/>}
    </Form>
    )
}

export default FormComponent;
