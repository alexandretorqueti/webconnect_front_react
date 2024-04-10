import { Form, Button, Row } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'


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



const ImageField = ({ name, value, changeData }) => {
    const fileInput = useRef(null);

    const handlePencilClick = () => {
        fileInput.current.click();
    };
    const handleFileChange = (event) => {
        changeData(event, URL.createObjectURL(event.target.files[0]));
    };
    return (
        <div className="profile-img-edit">
            <img className="profile-pic" src={value} alt="profile-pic" style={{ 'maxHeight' : '100%' }}/>
            <div className="p-image">
                <i className="ri-pencil-line upload-button text-white" onClick={handlePencilClick}></i>
                <input 
                    ref={fileInput} 
                    className="file-upload"
                    type="file" 
                    accept="image/*"
                    name={name}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}
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

const DateField = ({ name, value, label, changeData }) => {
    return (
        <>
        <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
        <Form.Control type="date" className="form-control" id={name} name={name} value={value} onChange={changeData} />
        </>
    );
}

const CheckField = ({ name, value, label, changeData, aux }) => {
    return (
        <>
        <Row>
        <Form.Label htmlFor="fname"  className="form-label">{label}:</Form.Label>
        </Row>
        <Row>
        {aux.map((item) => {
            return <Form.Check
                key={item.id}
                type="checkbox"
                name={name}
                label={item.nome}
                value={item.id}
                checked={value.indexOf(item.id) > -1}
                onChange={(event) => changeData(event, event.target.checked ? [...value, item.id] : value.filter((item_id) => item_id !== item.id)) }
            />
        })}
        </Row>
        </>
    );
}

const ItemForm =  ({ name, value, label, type, changeData, dataAux, exclude = [] }) => {
    if (!label) return (null);
    if (label === '') return (null);
    if (value === null || value === undefined) 
        value = '';
    return <Form.Group className="form-group col-sm-6">
    {
        exclude.indexOf(name) > -1 ?
        <input type="hidden" name={name} value={value}></input> :
        type === 'CharField' ?
        <TextField name={name} value={value} label={label} multiline={false} changeData={changeData}></TextField> :
        type === 'TextField' ?
        <TextField name={name} value={value} label={label} multiline={true} changeData={changeData}></TextField> :
        type.indexOf('AutoField') > -1 ?
        '' :
        type.indexOf('FileField') > -1 ?
        <ImageField name={name} value={value} label={label} changeData={changeData}></ImageField> :
        type.indexOf('ForeignKey') > -1 ?
        <ComboField name={name} value={value} label={label} changeData={changeData} aux={dataAux[name]}></ComboField> :
        type.indexOf('DateField') > -1 ?
        <DateField name={name} value={value} label={label} changeData={changeData}></DateField> :
        type.indexOf('ManyToManyField') > -1 ?
        <CheckField name={name} value={value} label={label} changeData={changeData} aux={dataAux[name]}></CheckField> :
        <TextField name={name} value={value} label={label} changeData={changeData}></TextField>
    }
    </Form.Group>;
}

function FormComponent({ data, dataAux, fnUpdateData, exclude=[] }) {
    const [ fields, setFields ] = useState([]);
    const [ dados, setDados ] = useState(data);

    const handleSubmit = (event) => {
        event.preventDefault();
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