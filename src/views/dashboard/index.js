import React, {useEffect, useState}  from 'react'
import { Row, Col, Container, Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Post from '../../components/redesocial/newsfeed/post/Post'
import FormNewPost from '../../components/redesocial/newsfeed/post/FormNewPost'
import StoriesCard from '../../components/redesocial/newsfeed/StoriesCard'
import EventsCard from '../../components/redesocial/newsfeed/EventsCard'
import Birthday from '../../components/redesocial/newsfeed/Birthday'
import SuggestedPage from '../../components/redesocial/newsfeed/SuggestedPage'

//image
import user1 from '../../assets/images/user/1.jpg'
import img1 from '../../assets/images/small/07.png'
import img2 from '../../assets/images/small/08.png'
import img3 from '../../assets/images/small/09.png'
import loader from '../../assets/images/page-img/page-load-loader.gif'


const Index = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [context, setContext] = useState([]);
    const [vezes, setVezes] = useState(0);
    const [postsCarregados, setPostsCarregados] = useState(false);

    useEffect(() => {
        console.log('Passei aqui ' + vezes + ' vezes');
        setVezes(vezes + 1);
        const fazlogin = async () => {
            const fetchPosts = async () => {
                try {
                    const response0 = await fetch('https://webconnect.com.br/pessoas/ajax_login', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                        'Content-Type': 'application/json',
                        // Outros headers necessários, como tokens CSRF se seu servidor Django os requerer
                        },
                        body: JSON.stringify({
                        username: 'alexandre',
                        password: 'Safira2023*!',
                        }),
                    });
                    const response = await fetch('https://webconnect.com.br/redesocial/posts_json/1/***todos***', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            // Outros headers necessários, como tokens CSRF se seu servidor Django os requerer
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Algo deu errado');
                    }
                    const data = await response.json();
                    setContext(data);

                    setPostsCarregados(true);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchPosts();
        }
        fazlogin();
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
                        {(postsCarregados && context.posts.map((postJsonString, index) => {
                            const post = JSON.parse(postJsonString);                            
                            return <Post 
                            key={index} 
                            userName={post.fields.pessoa_fisica.nome}
                            userPhoto={post.fields.pessoa_fisica.foto}
                            postTime={post.fields.data_criacao}
                            postContent={post.fields.content}
                            postPhoto={post.fields.foto}></Post>
                            })
                        )}
                    </Col>
                    <Col lg={4}>
                        <StoriesCard></StoriesCard>
                        <EventsCard></EventsCard>
                        <Birthday></Birthday>
                        <SuggestedPage></SuggestedPage>
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
