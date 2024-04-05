import { useEffect, useState, useRef} from 'react';
import {Card} from 'react-bootstrap';
import PessoaLogada from '../../../pessoas/Pessoa';
import { Pessoas } from '../../../../services/Pessoas';
import { Mensagens } from '../../../../services/Mensagens';
import { useGlobalContext } from '../../../../GlobalContext';

const RightSidebar = () => {
    const { mensagens, TIPOSMENSAGENS, MENSAGENS } = useGlobalContext();
    const [posicaoMensagem, setPosicaoMensagem] = useState(0);
    const [pessoas, setPessoas] = useState([]);
    const PessoasService = new Pessoas();
    const [tick, setTick] = useState(0);
    const [minuto, setMinuto] = useState(0);
    const minutoRef = useRef(minuto);
    const tickRef = useRef(tick);
    const carregaDados = async () => {
        try {
            const data = await PessoasService.getPessoasComRelacao();
            setPessoas(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    useEffect(() => {
        let posicao = posicaoMensagem;
        while (mensagens[posicao])
        {
            const mensagemAtual = mensagens[posicao];
            if (mensagemAtual['tipo'] === TIPOSMENSAGENS.EVENTOS_DO_CHAT) {
                const { pessoa_id_from, message } = mensagemAtual;
                if (message === MENSAGENS.USUARIO_OFFLINE || message === MENSAGENS.USUARIO_ONLINE) {
                    const pessoa = pessoas.find(pessoa => pessoa.id == pessoa_id_from);
                    if (pessoa) {
                        const pessoas_local = [...pessoas].map(p => {
                            if (p.id == pessoa_id_from) {
                                p.status_online = message === MENSAGENS.USUARIO_ONLINE ? true : false;
                                if (p.status_online) {
                                    p.hora_ultimo_login_humanizada = 'agora';
                                }
                            }
                            return p;
                        });
                        setPessoas(pessoas_local);
                    }
                }
            }
            posicao++;
            setPosicaoMensagem(posicao);
        }
    }, [mensagens.length]);
    const MensagensService = new Mensagens();
    

    useEffect(() => {
        const pessoas_local = [...pessoas];
        const run = async () => {
            for (const p of pessoas_local) {
                if (p.hora_ultimo_login) {
                    const result = await MensagensService.getDiff(p.hora_ultimo_login);
                    if (result.diferenca) {
                        p.hora_ultimo_login_humanizada = result.diferenca;
                    }
                }
            }
            setPessoas(pessoas_local);
        }
        run();

    }, [minuto]);

    useEffect(() => {
        minutoRef.current = minuto;
        tickRef.current = tick;
    }, [minuto, tick]);

    useEffect(() => {
        carregaDados();
        setInterval(() => {
            const localTick = tickRef.current;
            setTick(localTick + 1);
            if (tickRef.current % 300 === 0) {
                const minuto_local = minutoRef.current;
                setMinuto(minuto_local + 1);
            }
        }, 1000);
    }, []);

    const minirightsidebar =() =>{
        document.getElementById('rightSidebar').classList.toggle('right-sidebar');
        document.body.classList.toggle('right-sidebar-close');
    }
    return (
        <>
            <div className="right-sidebar-mini" id="rightSidebar">
                <div className="right-sidebar-panel p-0">
                    <Card className="shadow-none">
                        <Card.Body className="p-0">
                            <div className="media-height p-3" data-scrollbar="init">
                                {
                                pessoas.map((pessoa, index) => 
                                    <PessoaLogada key={index}
                                    nome={pessoa.nome}
                                    foto={pessoa.foto_url}
                                    horaLogado={pessoa.hora_ultimo_login_humanizada}
                                    online={pessoa.status_online}
                                    numeroNotificacoes={pessoa.quantidade_de_mensagens_nao_lidas} />
                                )}
                            </div>
                            <div className="right-sidebar-toggle bg-primary text-white mt-3 d-flex" onClick={minirightsidebar}>
                              <span className="material-symbols-outlined">chat</span>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
            
        </>
    )
}

export default RightSidebar
