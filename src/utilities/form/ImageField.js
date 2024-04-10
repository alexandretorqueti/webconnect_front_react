import { useRef } from 'react';

const ImageField = ({ name, value, changeData }) => {
    const fileInput = useRef(null);

    const handlePencilClick = () => {
        fileInput.current.click();
    };
    const handleFileChange = (event) => {
        changeData(event, URL.createObjectURL(event.target.files[0]));
    };
    if (value === null || value === undefined || value === '')
        value = 'https://via.placeholder.com/150';
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

export default ImageField;