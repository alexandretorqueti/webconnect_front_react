import React, {useEffect, useState, useRef}  from 'react'
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
import { PostPaginado, Icones } from '../../services/RedeSocial'
import { Pessoas } from '../../services/Pessoas'

const Index = ({}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [posts, setPosts] = useState([]);
    const [vezes, setVezes] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementoRef = useRef(null);
    const [pagina, setPagina] = useState(1);
    const [continuar, setContinuar] = useState(true);
    const [icones, setIcones] = useState([]);
    const [stories, setStories] = useState([]);
    const [events, setEvents] = useState([]);
    const [birthdays, setBirthdays] = useState([]);
    const [suggestedPages, setSuggestedPages] = useState([]);

    const [pessoa_logada, setPessoaLogada] = useState();
    const PostPaginadoService = new PostPaginado();
    const IconesService = new Icones();
    const PessoasService = new Pessoas();

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            // Atualiza o estado quando a visibilidade do elemento muda
            setIsVisible(entry.isIntersecting);
        },
        {
            rootMargin: '0px',
            threshold: 0.1 // Ajuste o threshold conforme necessário
        }
        );

        if (elementoRef.current) {
            observer.observe(elementoRef.current);
        }

        return () => {
        if(elementoRef.current) {
            observer.unobserve(elementoRef.current);
        }
        };
    }, [elementoRef]);

    const carrega = async (paginaAtual) => {
        const run = async () => {
            const { continuar, pagina } = await PostPaginadoService.get(paginaAtual);
            setPosts(posts.concat(pagina));
            setContinuar(continuar);
        }

        await run();
    }

    useEffect(() => {
        const run = async () => {
            carrega(1);
            const icones = await IconesService.get();
            setIcones(icones);
            setPessoaLogada(await PessoasService.getUsuarioLogado());
        }
        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            if (isVisible) {
                setPagina(pagina + 1);
                carrega(pagina);
            }
        }
        run();
    }, [isVisible]);

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
                                            {pessoa_logada !== undefined &&
                                            <img src={pessoa_logada.foto_url} alt={pessoa_logada.nome} className="avatar-60 rounded-circle"/>
                                            }
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
                                <FormNewPost show={show} handleClose={handleClose} pessoa_logada={pessoa_logada}/>
                            </Card>
                        </Col>
                        {(posts.length > 0 && posts.map((post, index) => {
                            return <Post 
                            key={index} 
                            post={post}
                            icones={icones}
                            ></Post>
                            })
                        )}
                    </Col>
                    <Col lg={4}>
                        {   stories.length > 0 && 
                            <StoriesCard></StoriesCard>
                            // TODO
                        }
                        {   events.length > 0 &&
                            <EventsCard></EventsCard>
                        }
                        {  birthdays.length > 0 &&
                            <Birthday></Birthday>
                        }
                        {   suggestedPages.length > 0 &&
                            <SuggestedPage></SuggestedPage>
                        }
                    </Col>
                    <div className="col-sm-12 text-center">
                        {continuar ? <img ref={elementoRef} src={loader} alt="loader" style={{height: "100px"}}/> : 
                        <p>Não há mais dados</p>}
                    </div>
                </Row>
            </Container>                
            </div>
        </>
    )
}

export default Index
