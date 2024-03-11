import React, {}  from 'react'
import Card from '../../../components/Card'


//image
import user01 from '../../../assets/images/user/01.jpg'
import user2 from '../../../assets/images/user/02.jpg'


function BirthdayComponent() {
  return (
    <Card>
    <div className="card-header d-flex justify-content-between">
        <div className="header-title">
            <h4 className="card-title">Upcoming Birthday</h4>
        </div>
    </div>
    <Card.Body>
        <ul className="media-story list-inline m-0 p-0">
            <li className="d-flex mb-4 align-items-center">
                <img src={user01} alt="story3" className="rounded-circle img-fluid"/>
                <div className="stories-data ms-3">
                    <h5>Anna Sthesia</h5>
                    <p className="mb-0">Today</p>
                </div>
            </li>
            <li className="d-flex align-items-center">
                <img src={user2} alt="story-img" className="rounded-circle img-fluid"/>
                <div className="stories-data ms-3">
                    <h5>Paul Molive</h5>
                    <p className="mb-0">Tomorrow</p>
                </div>
            </li>
        </ul>
    </Card.Body>
    </Card>
  );
}

export default BirthdayComponent;