import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const changeData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
}

const TextField = ({ name, value, label, multiline }) => {
    return (
    <>
    <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
    <Form.Control 
        as={multiline ? "textarea" : "input"}
        className="form-control" 
        id={name}
        placeholder={label} 
        value={value} 
        onChange={changeData} />
    </>
    );
}

const ItemForm =  ({ name, value, label, type }) => {
    if (!label) return (null);
    if (label === '') return (null);
    return <Form.Group className="form-group col-sm-6">
    {
        type === 'CharField' ?
        <TextField name={name} value={value} label={label} multiline={false}></TextField> :
        type === 'TextField' ?
        <TextField name={name} value={value} label={label} multiline={true}></TextField> :
        type.indexOf('AutoField') > -1 ?
        '' :
        <TextField name={name} value={value} label={label}></TextField>
    }
    </Form.Group>;
}

function FormComponent({ data, dataAux, fnUpdateData, exclude=[] }) {
    const [ fields, setFields ] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        const temVerbose = data._field_details && Object.keys(data._field_details).length > 0;
        let campos = []
        if (temVerbose) {
            campos = ([...Object.keys(data._field_details)]);
        } else {
            campos = ([...Object.keys(data)]);
        }
        campos = campos.filter((item) => {
            return exclude.indexOf(item) === -1;
        });
        setFields(campos);
        console.log(dataAux);
        console.log(fnUpdateData);
    }, []);
    return (
    <Form onSubmit={handleSubmit}>
        { fields.map((prop, index) => {
            return <ItemForm key={index}
                name={prop}
                value={data[prop]}
                label={data._field_details[prop]['verbose_name']}
                type={data._field_details[prop]['type']}
            ></ItemForm>
        })}
        <Button type="submit" className="btn btn-primary me-2">Submit</Button>
    </Form>
    )
}

export default FormComponent;

/*

    const handlePencilClick = () => {
        fileInput.current.click();
    };
    const handleFileChange = (event) => {
        changeData(event, URL.createObjectURL(event.target.files[0]));
      };

*/