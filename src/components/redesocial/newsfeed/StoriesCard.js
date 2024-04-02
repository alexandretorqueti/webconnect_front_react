import  {}  from 'react'
import { Link } from 'react-router-dom'
import Card from '../../Card'


//image

import s1 from '../../../assets/images/page-img/s1.jpg'
import s2 from '../../../assets/images/page-img/s2.jpg'
import s3 from '../../../assets/images/page-img/s3.jpg'

function StoriesCardComponent() {
  return (
    <Card>
        <div className="card-header d-flex justify-content-between">
            <div className="header-title">
                <h4 className="card-title">Stories</h4>
            </div>
        </div>
        <Card.Body>
            <ul className="media-story list-inline m-0 p-0">
                <li className="d-flex mb-3 align-items-center">
                    <i className="ri-add-line"></i>
                    <div className="stories-data ms-3">
                        <h5>Creat Your Story</h5>
                        <p className="mb-0">time to story</p>
                    </div>
                </li>
                <li className="d-flex mb-3 align-items-center active">
                    <img src={s2} alt="story-img" className="rounded-circle img-fluid"/>
                    <div className="stories-data ms-3">
                        <h5>Anna Mull</h5>
                        <p className="mb-0">1 hour ago</p>
                    </div>
                </li>
                <li className="d-flex mb-3 align-items-center">
                    <img src={s3} alt="story-img" className="rounded-circle img-fluid"/>
                    <div className="stories-data ms-3">
                        <h5>Ira Membrit</h5>
                        <p className="mb-0">4 hour ago</p>
                    </div>
                </li>
                <li className="d-flex align-items-center">
                    <img src={s1} alt="story-img" className="rounded-circle img-fluid"/>
                    <div className="stories-data ms-3">
                        <h5>Bob Frapples</h5>
                        <p className="mb-0">9 hour ago</p>
                    </div>
                </li>
            </ul>
            <Link to="#" className="btn btn-primary d-block mt-3">See All</Link>
        </Card.Body>
    </Card>
  );
}

export default StoriesCardComponent;