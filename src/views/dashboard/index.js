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

import { Socket } from '../../services/socket'
import { useEffect, useState, useRef } from 'react'

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const loaderRef = useRef(null);
    const [pagina, setPagina] = useState(1);
    const [continuar, setContinuar] = useState(true);
    const [icones, setIcones] = useState([]);
    const [stories ] = useState([]);
    const [events ] = useState([]);
    const [birthdays ] = useState([]);
    const [suggestedPages ] = useState([]);
    const [temColunaDaDireita, setTemColunaDaDireita] = useState(false);
    const [larcuraColunaDoMeio, setLarguraColunaDoMeio] = useState(8);
    const [pessoa_logada, setPessoaLogada] = useState();
    const [postAtual, setPostAtual] = useState(null);
    const PostPaginadoService = new PostPaginado();
    const IconesService = new Icones();
    const PessoasService = new Pessoas();
    const [socket, setSocket] = useState(null)

    
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
        console.log('socket', socket);
    }, [socket]);

    const recebida = (mensagem) => {
        console.log('mensagem recebida', mensagem);
    }

    useEffect(() => {
        const run = async () => {
            const icones = await IconesService.get();
            setIcones(icones);
            const pessoa_logada = await PessoasService.getUsuarioLogado();
            setPessoaLogada(pessoa_logada);
            if (pessoa_logada && pessoa_logada.id) {
                const newSocket = new Socket(
                    {
                    id: pessoa_logada.id,
                    type: 'private',
                    wsScheme: window.location.protocol === 'https:' ? 'wss' : 'ws',
                    pessoaLogadaId: pessoa_logada.id, 
                    recebida: (mensagem) => recebida(mensagem),
                    userId: pessoa_logada.id,
                    });
                setSocket(newSocket);
            }
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

    useEffect(() => {
        if (postAtual && !postAtual.deleted) {
            const index = posts.findIndex((post) => post.id === postAtual.id);
            if (index !== -1) {
                const newPosts = [...posts];
                newPosts[index] = postAtual;
                setPosts(newPosts);
            }
        } else {
            if (postAtual && postAtual.deleted) {
                const index = posts.findIndex((post) => post.id === postAtual.id);
                if (index !== -1) {
                    const newPosts = [...posts];
                    newPosts.splice(index, 1);
                    setPosts(newPosts);
                }
            }
        }
    }, [JSON.stringify(postAtual)]);
        

    return (
        <>
            <div id="content-page" className="content-page">

            <Container>
                <Row>
                    <Col lg={larcuraColunaDoMeio} className="col m-0 p-0">
                        <PostTop pessoa_logada={pessoa_logada} posts={posts} setPosts={setPosts}></PostTop>
                        {(posts.length > 0 && posts.map((post) => {
                            return <Post 
                            key={post.id} 
                            post={post}
                            icones={icones}
                            postAtual={postAtual}
                            setPostAtual={setPostAtual}
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
