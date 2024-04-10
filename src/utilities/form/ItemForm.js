import { Form } from 'react-bootstrap';
import TextField from './TextField';
import ComboField from './ComboField';
import ImageField from './ImageField';
import DateField from './DateField';
import CheckField from './CheckField';


const ItemForm =  ({ name, value, label, type, changeData, dataAux, exclude = [] }) => {
    if (!label) return (null);
    if (label === '') return (null);
    if (value === null || value === undefined) 
        value = '';
    let sm = 6;
    if (type === 'FileField') {
        sm = 12;
    }
    if (exclude.indexOf(name) > -1)
        return <input type="hidden" name={name} value={value}></input>
    else
        return <Form.Group className={"form-group col-sm-" + sm}>
        {
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

export default ItemForm;