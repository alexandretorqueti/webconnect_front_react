import React, {useEffect, useState}  from 'react'
import { Row, Col, Container, Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import CustomToggle from '../../components/dropdowns'
import Post from '../../components/redesocial/newsfeed/Post/Post'
import FormNewPost from '../../components/redesocial/newsfeed/Post/FormNewPost'

//image
import user1 from '../../assets/images/user/1.jpg'
import user01 from '../../assets/images/user/01.jpg'
import user2 from '../../assets/images/user/02.jpg'
import user3 from '../../assets/images/user/03.jpg'
import img1 from '../../assets/images/small/07.png'
import img2 from '../../assets/images/small/08.png'
import img3 from '../../assets/images/small/09.png'
import p1 from '../../assets/images/page-img/p1.jpg'
import s1 from '../../assets/images/page-img/s1.jpg'
import s2 from '../../assets/images/page-img/s2.jpg'
import s3 from '../../assets/images/page-img/s3.jpg'
import s4 from '../../assets/images/page-img/s4.jpg'
import s5 from '../../assets/images/page-img/s5.jpg'
import p2 from '../../assets/images/page-img/p2.jpg'
import img42 from '../../assets/images/page-img/42.png'
import img9 from '../../assets/images/small/img-1.jpg'
import img10 from '../../assets/images/small/img-2.jpg'
import loader from '../../assets/images/page-img/page-load-loader.gif'


const Index = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://webconnect.com.br/redesocial/posts/1/***todos***', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Algo deu errado');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <div id="content-page" className="content-page">

            <Container>
                <Row>
                    <Col lg={8} className="row m-0 p-0">
                        <Col sm={12} >
                            <Card id="post-modal-data" className="card-block card-stretch card-height">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Create Post</h4>
                                    </div>
                                </div>
                                <Card.Body >
                                    <div className="d-flex align-items-center">
                                        <div className="user-img">
                                            <img src={user1} alt="user1" className="avatar-60 rounded-circle"/>
                                        </div>
                                        <form className="post-text ms-3 w-100 "   onClick={handleShow}>
                                            <input type="text" className="form-control rounded" placeholder="Write something here..." style={{border:"none"}}/>
                                        </form>
                                    </div>
                                    <hr></hr>
                                    <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
                                        <li className="me-3 mb-md-0 mb-2">
                                            <Link to="#" className="btn btn-soft-primary">
                                                <img src={img1} alt="icon" className="img-fluid me-2"/> Photo/Video
                                            </Link>
                                        </li>
                                        <li className="me-3 mb-md-0 mb-2">
                                            <Link to="#" className="btn btn-soft-primary">
                                                <img src={img2} alt="icon" className="img-fluid me-2"/> Tag Friend
                                            </Link>
                                        </li>
                                        <li className="me-3">
                                            <Link to="#" className="btn btn-soft-primary">
                                                <img src={img3} alt="icon" className="img-fluid me-2"/> Feeling/Activity
                                            </Link>
                                        </li>
                                        <li>
                                            <button className=" btn btn-soft-primary">
                                                <div className="card-header-toolbar d-flex align-items-center">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as='div'className="lh-1">
                                                        <span className="material-symbols-outlined">
                                                            more_horiz
                                                        </span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item  onClick={handleShow}  href="#">Check in</Dropdown.Item>
                                                            <Dropdown.Item  onClick={handleShow}  href="#">Live Video</Dropdown.Item>
                                                            <Dropdown.Item  onClick={handleShow}  href="#">Gif</Dropdown.Item> 
                                                            <Dropdown.Item  onClick={handleShow}  href="#">Watch Party</Dropdown.Item> 
                                                            <Dropdown.Item  onClick={handleShow}  href="#">Play with Friend</Dropdown.Item> 
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>   
                                </Card.Body>
                                <FormNewPost show={show} handleClose={handleClose}/>
                            </Card>
                        </Col>
                        <Post userName="Luiza" userPhoto={user3} postTime="Uma hora atrás" postContent="Lorem ipsum aaa sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus" postPhoto={p1}>
                            <span className="mb-0 ps-1 d-inline-block">Add New Post</span>
                        </Post>
                        <Post userName="Carlos" userPhoto={user2} postTime="AGORA" postContent="bla bla bla" postPhoto={p2}></Post>

                    </Col>

                    <Col lg={4}>
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
                        <Card>
                            <div className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Events</h4>
                                </div>
                                <div className="card-header-toolbar d-flex align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                            <i className="ri-more-fill h4"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className=" dropdown-menu-right" aria-labelledby="dropdownMenuButton">
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
                                <ul className="media-story list-inline m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center ">
                                        <img src={s4} alt="story1" className="rounded-circle img-fluid"/>
                                        <div className="stories-data ms-3">
                                            <h5>Web Workshop</h5>
                                            <p className="mb-0">1 hour ago</p>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <img src={s5} alt="story2" className="rounded-circle img-fluid"/>
                                        <div className="stories-data ms-3">
                                            <h5>Fun Events and Festivals</h5>
                                            <p className="mb-0">1 hour ago</p>
                                        </div>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
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
                    </Col>
                    <div className="col-sm-12 text-center">
                        <img src={loader} alt="loader" style={{height: "100px"}}/>
                    </div>
                </Row>
            </Container>                
            </div>
        </>
    )
}

export default Index
