import React from 'react';
import { Col, Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ShareOffcanvas from '../../../share-offcanvas'
import CustomToggle from '../../../dropdowns'

import user2 from '../../../../assets/images/user/02.jpg'
import user3 from '../../../../assets/images/user/03.jpg'
import icon1 from '../../../../assets/images/icon/01.png'
import icon2 from '../../../../assets/images/icon/02.png'
import icon3 from '../../../../assets/images/icon/03.png'
import icon4 from '../../../../assets/images/icon/04.png'
import icon5 from '../../../../assets/images/icon/05.png'
import icon6 from '../../../../assets/images/icon/06.png'
import icon7 from '../../../../assets/images/icon/07.png'
// Importe os demais ícones da mesma maneira



function PostComponent({ userName, userPhoto, postTime, postContent, postPhoto, children }) {
  return (
    <Col sm={12}>
    <Card className=" card-block card-stretch card-height">
        <Card.Body>
            <div className="user-post-data">
                <div className="d-flex justify-content-between">
                    <div className="me-3">
                        <img className="rounded-circle img-fluid avatar-50" src={userPhoto} alt="" style={{ objectFit: 'unset' }} />
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="mb-0 d-inline-block">{userName}</h5>
                                {children}
                                <p className="mb-0 text-primary">{postTime}</p>
                            </div>
                            <div className="card-post-toolbar">
                                <Dropdown>
                                    <Dropdown.Toggle variant="bg-transparent">
                                    <span className="material-symbols-outlined">
                                        more_horiz
                                    </span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                        <Dropdown.Item className=" p-3" to="#">
                                            <div className="d-flex align-items-top">
                                                <div className="h4 material-symbols-outlined">
                                                    <i className="ri-save-line"></i>
                                                </div>
                                                <div className="data ms-2">
                                                    <h6>Save Post</h6>
                                                    <p className="mb-0">Add this to your saved items</p>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item className= "p-3" to="#">
                                                <div className="d-flex align-items-top">
                                                <i className="ri-close-circle-line h4"></i>
                                                <div className="data ms-2">
                                                    <h6>Hide Post</h6>
                                                    <p className="mb-0">See fewer posts like this.</p>
                                                </div>
                                            </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item className=" p-3" to="#">
                                                <div className="d-flex align-items-top">
                                                    <i className="ri-user-unfollow-line h4"></i>
                                                    <div className="data ms-2">
                                                        <h6>Unfollow User</h6>
                                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                                    </div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item className=" p-3" to="#">
                                                <div className="d-flex align-items-top">
                                                    <i className="ri-notification-line h4"></i>
                                                    <div className="data ms-2">
                                                        <h6>Notifications</h6>
                                                        <p className="mb-0">Turn on notifications for this post</p>
                                                    </div>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <p>{postContent}</p>
                </div>
                <div className="user-post">
                    <Link to="#"><img src={postPhoto} alt="" className="img-fluid rounded w-100"/></Link>
                </div>
                <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="like-data">
                                    <Dropdown>
                                        <Dropdown.Toggle  as={CustomToggle} >
                                            <img src={icon1} className="img-fluid" alt=""/>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className=" py-2">
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2" ><img src={icon1} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2" ><img src={icon2} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2" ><img src={icon3} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2" ><img src={icon4} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2" ><img src={icon5} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2" ><img src={icon6} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2" ><img src={icon7} className="img-fluid me-2" alt=""/></OverlayTrigger>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="total-like-block ms-2 me-3">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                        140 Likes
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item  href="#">Max Emum</Dropdown.Item>
                                            <Dropdown.Item  href="#">Bill Yerds</Dropdown.Item>
                                            <Dropdown.Item  href="#">Hap E. Birthday</Dropdown.Item>
                                            <Dropdown.Item  href="#">Tara Misu</Dropdown.Item>
                                            <Dropdown.Item  href="#">Midge Itz</Dropdown.Item>
                                            <Dropdown.Item  href="#">Sal Vidge</Dropdown.Item>
                                            <Dropdown.Item  href="#">Other</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="total-comment-block">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}  id="post-option" >
                                    20 Comment
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item  href="#">Max Emum</Dropdown.Item>
                                        <Dropdown.Item  href="#">Bill Yerds</Dropdown.Item>
                                        <Dropdown.Item  href="#">Hap E. Birthday</Dropdown.Item>
                                        <Dropdown.Item  href="#">Tara Misu</Dropdown.Item>
                                        <Dropdown.Item  href="#">Midge Itz</Dropdown.Item>
                                        <Dropdown.Item  href="#">Sal Vidge</Dropdown.Item>
                                        <Dropdown.Item  href="#">Other</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <ShareOffcanvas />
                    </div>
                <hr/>
                <ul className="post-comments list-inline p-0 m-0">
                    <li className="mb-2">
                        <div className="d-flex">
                            <div className="user-img">
                                <img src={user2} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                            </div>
                            <div className="comment-data-block ms-3">
                                <h6>Monty Carlo</h6>
                                <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                <div className="d-flex flex-wrap align-items-center comment-activity">
                                    <Link to="#">like</Link>
                                    <Link to="#">reply</Link>
                                    <Link to="#">translate</Link>
                                    <span> 5 min </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex">
                            <div className="user-img">
                                <img src={user3} alt="user1" className="avatar-35 rounded-circle img-fluid"/>
                            </div>
                            <div className="comment-data-block ms-3">
                                <h6>Paul Molive</h6>
                                <p className="mb-0">Lorem ipsum dolor sit amet</p>
                                <div className="d-flex flex-wrap align-items-center comment-activity">
                                    <Link to="#">like</Link>
                                    <Link to="#">reply</Link>
                                    <Link to="#">translate</Link>
                                    <span> 5 min </span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <form className="comment-text d-flex align-items-center mt-3" >
                    <input type="text" className="form-control rounded" placeholder="Enter Your Comment"/>
                    <div className="comment-attagement d-flex">
                        <Link to="#"><i className="ri-link me-3"></i></Link>
                        <Link to="#"><i className="ri-user-smile-line me-3"></i></Link>
                        <Link to="#"><i className="ri-camera-line me-3"></i></Link>
                    </div>
                </form>
            </div>
        </Card.Body>
    </Card>
    </Col>
  );
}

export default PostComponent;
