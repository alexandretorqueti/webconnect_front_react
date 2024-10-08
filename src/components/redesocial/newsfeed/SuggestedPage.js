import  {}  from 'react'
import { Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../Card'
import CustomToggle from '../../dropdowns'


//image

import img42 from '../../../assets/images/page-img/42.png'
import img9 from '../../../assets/images/small/img-1.jpg'
import img10 from '../../../assets/images/small/img-2.jpg'

function SuggestedPageComponent() {
    return (
        <Card>
        <div className="card-header d-flex justify-content-between">
            <div className="header-title">
                <h4 className="card-title">Suggested Pages</h4>
            </div>
            <div className="card-header-toolbar d-flex align-items-center">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-fill h4"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right" aria-labelledby="dropdownMenuButton01">
                        <Dropdown.Item  href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                        <Dropdown.Item  href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                        <Dropdown.Item  href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                        <Dropdown.Item  href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                        <Dropdown.Item  href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        <Card.Body>
            <ul className="suggested-page-story m-0 p-0 list-inline">
                <li className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                        <img src={img42} alt="story-img" className="rounded-circle img-fluid avatar-50"/>
                        <div className="stories-data ms-3">
                        <h5>Iqonic Studio</h5>
                        <p className="mb-0">Lorem Ipsum</p>
                        </div>
                    </div>
                    <img src={img9} className="img-fluid rounded" alt="Responsive"/>
                    <div className="mt-3"><Link to="#" className="btn d-block"><i className="ri-thumb-up-line me-2"></i> Like Page</Link></div>
                </li>
                <li>
                    <div className="d-flex align-items-center mb-3">
                        <img src={img42} alt="story-img" className="rounded-circle img-fluid avatar-50"/>
                        <div className="stories-data ms-3">
                        <h5>Cakes & Bakes </h5>
                        <p className="mb-0">Lorem Ipsum</p>
                        </div>
                    </div>
                    <img src={img10} className="img-fluid rounded" alt="Responsive"/>
                    <div className="mt-3"><Link to="#" className="btn d-block"><i className="ri-thumb-up-line me-2"></i> Like Page</Link></div>
                </li>
            </ul>
        </Card.Body>
        </Card>
    );
    }

export default SuggestedPageComponent;