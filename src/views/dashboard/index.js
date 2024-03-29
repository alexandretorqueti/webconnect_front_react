import React, {useEffect, useState, useRef}  from 'react'
import { Row, Col, Container } from 'react-bootstrap'

import Post from '../../components/redesocial/newsfeed/post/Post'
import StoriesCard from '../../components/redesocial/newsfeed/StoriesCard'
import EventsCard from '../../components/redesocial/newsfeed/EventsCard'
import Birthday from '../../components/redesocial/newsfeed/Birthday'
import SuggestedPage from '../../components/redesocial/newsfeed/SuggestedPage'
import PostTop from '../../components/redesocial/newsfeed/post/PostTop'
//image

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
    const loaderRef = useRef(null);
    const [pagina, setPagina] = useState(1);
    const [continuar, setContinuar] = useState(true);
    const [icones, setIcones] = useState([]);
    const [stories, setStories] = useState([]);
    const [events, setEvents] = useState([]);
    const [birthdays, setBirthdays] = useState([]);
    const [suggestedPages, setSuggestedPages] = useState([]);
    const [temColunaDaDireita, setTemColunaDaDireita] = useState(false);
    const [larcuraColunaDoMeio, setLarguraColunaDoMeio] = useState(8);
    const [pessoa_logada, setPessoaLogada] = useState();
    const PostPaginadoService = new PostPaginado();
    const IconesService = new Icones();
    const PessoasService = new Pessoas();
    
    const verificaVisibilidade = () => {
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
    
            if (loaderRef.current) {
                observer.observe(loaderRef.current);
                const entry = observer.takeRecords()[0]; // Obtem o último registro de observação
                if (entry && entry.isIntersecting) {
                    setIsVisible(entry.isIntersecting);
                }
            }
    
            return () => {
            if(loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
            }
    }

    useEffect(() => {
        verificaVisibilidade();
    }, [loaderRef]);

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
            const icones = await IconesService.get();
            setIcones(icones);
            setPessoaLogada(await PessoasService.getUsuarioLogado());
        }
        run();
        if (stories.length > 0 || events.length > 0 || birthdays.length > 0 || suggestedPages.length > 0) {
            setTemColunaDaDireita(true);
        }
        if (temColunaDaDireita) {
            setLarguraColunaDoMeio(8);
        } else {
            setLarguraColunaDoMeio(10);
        }

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
                    <Col lg={larcuraColunaDoMeio} className="col m-0 p-0">
                        <PostTop pessoa_logada={pessoa_logada} posts={posts} setPosts={setPosts}></PostTop>
                        {(posts.length > 0 && posts.map((post, index) => {
                            return <Post 
                            key={index} 
                            post={post}
                            icones={icones}
                            ></Post>
                            })
                        )}
                    </Col>
                    {((stories.length > 0) || (events.length > 0) || (birthdays.length > 0) || (suggestedPages.length > 0)) && (
                        <Col lg={4}>
                            {stories.length > 0 && 
                                <StoriesCard></StoriesCard>
                            }
                            {events.length > 0 &&
                                <EventsCard></EventsCard>
                            }
                            {birthdays.length > 0 &&
                                <Birthday></Birthday>
                            }
                            {suggestedPages.length > 0 &&
                                <SuggestedPage></SuggestedPage>
                            }
                        </Col>
                    )}
                    <div className="col-sm-12 text-center">
                        {continuar ? <img ref={loaderRef} src={loader} alt="loader" style={{height: "100px"}}/> : 
                        <p>Não há mais dados</p>}
                    </div>
                </Row>
            </Container>                
            </div>
        </>
    )
}

export default Index
