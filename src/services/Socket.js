/* eslint-disable max-len */
/**
 * Classe que gerencia o socket.
 *
 * @class
 * @name Socket
 * @description Gerencia o socket, fazendo com que ele se reconecte caso a conexão caia, e também
 * fazendo com que as mensagens sejam enviadas na ordem correta, mesmo que a conexão caia.
 */
export class Socket {
  /**
     * Construtor da classe Socket.
     * @constructor
     * @param {Object} config - Configurações do socket.
     * @param {string} config.id - ID do socket.
     * @param {string} config.type - Tipo do socket. Pode ser 'group' ou 'private'.
     * @param {Function} config.recebida - Função de callback para mensagens recebidas.
     * @param {string} config.pessoaLogadaId - ID do usuário logado.
     * @param {string} config.wsScheme - Esquema do WebSocket (wss ou ws).
     */
  constructor(config) {
    this.id = config.id;
    this.type = config.type;
    this.recebida = config.recebida;
    this.wsScheme = config.wsScheme; // wss ou ws (Se window.location.protocol for https, então é wss, senão é ws)
    this.tentativas = 0;
    this.fila_mensagens = [];
    this.timeStamp = new Date().getTime();
    this.pessoaLogadaId = config.pessoaLogadaId;
    this.userId = config.userId;
    console.log('Socket - ' + this.timeStamp);
    this.conectar();
  }

  /**
     * Conecta ao socket.
     */
  conectar() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      try {
        const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws';
        let url = `${wsScheme}://${window.location.host}/ws/chat/${this.type}/${this.id}/${this.pessoaLogadaId}/`;
        url = url.replace('3000', '8000');
        this.socket = new WebSocket(url);
        console.log(`Conectando à sala ${this.id} do tipo ${this.type}... (${this.timeStamp})`);
        this.socket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log(`onmessage [${data.message}] em ${this.type}/${this.id} ${this.timeStamp}`);
          this.recebida(data);
        };
        // Aqui preciso verificar se ela foi fechada propositalmente ou por erro
        this.socket.onclose = (e) => {
          // Aqui o chat fechou com erro, então tenta reconectar caso o número de tentativas seja menor que 5
          if (!(e.wasClean && e.code === 1000)) { // o e.wasClean é true quando a conexão é fechada propositalmente, e o e.code é 1000 quando a conexão é fechada normalmente
            console.error(`O chat foi fechado com erro. Tentando reconectar... (${this.timeStamp})`);
            if (this.tentativas < 5) {
              setTimeout(() => this.conectar(), 10000); // Tenta reconectar a cada 10 segundos
            }
          } else {
            console.log('O chat foi fechado normalmente');
          }
        };
        this.socket.onopen = () => {
          console.log(`Conectado ao chat ${this.id} do tipo ${this.type}! (${this.timeStamp})`);
        };

        this.socket.onerror = (event) => {
          // Aqui o chat fechou com erro, então tenta reconectar caso o número de tentativas seja menor que 5
          if (this.tentativas < 5) {
            console.error('WebSocket error observed:', event);
            this.tentativas++;
          }
        };
      } catch (e) {
        // Aqui o chat fechou com erro, então tenta reconectar caso o número de tentativas seja menor que 5
        if (this.tentativas < 5) {
          console.error(e);
          setTimeout(() => this.conectar(), 10000); // Tenta reconectar a cada 10 segundos
          this.tentativas++;
        }
      }
    }
  }

  /**
     * Envia a mensagem para o servidor.
     * @param {string} data - Dados da mensagem a ser enviada.
     */
  envia() {
    const d = this.pega_mensagem_da_fila();
    try {      
      this.socket.send(d);
      console.log(`Mensagem enviada (${JSON.parse(d).message}) no chat ${this.id} do tipo ${this.type}! (${this.timeStamp})`);
    } catch (e) {
      this.recoloca_mensagem_na_fila(d);
      this.tentativas = 0;
      this.conectar();
    }
  }

  /**
     * Tenta enviar a mensagem.
     * @param {Object} data - Dados da mensagem a ser enviada.
     */
  tenta_enviar(data) {
    data['pessoa_id_from'] = this.pessoaLogadaId;

    if (data && data.message && (data.message + '').trim() !== '') {
      data = JSON.stringify(data);
      if (this.socket.readyState === WebSocket.OPEN) {
        this.coloca_mensagem_na_fila_e_envia(data);
      } else if (this.socket.readyState === WebSocket.CONNECTING) {
        setTimeout(() => {
          if (this.socket.readyState === WebSocket.OPEN) {
            this.coloca_mensagem_na_fila_e_envia(data);
          }
        }, 1000); // Espera 1 segundo antes de tentar enviar
      } else if (this.socket.readyState === WebSocket.CLOSED) {
        this.conectar();
        setTimeout(() => {
          if (this.socket.readyState === WebSocket.OPEN) {
            this.coloca_mensagem_na_fila_e_envia(data);
          }
        }, 1000); // Espera 1 segundo antes de tentar enviar
      } else if (this.socket.readyState === WebSocket.CLOSING) {
        setTimeout(() => {
          if (this.socket.readyState === WebSocket.OPEN) {
            this.coloca_mensagem_na_fila_e_envia(data);
          }
        }, 1000); // Espera 1 segundo antes de tentar enviar
      } else {
        this.conectar();
        setTimeout(() => {
          if (this.socket.readyState === WebSocket.OPEN) {
            this.coloca_mensagem_na_fila_e_envia(data);
          }
        }, 1000); // Espera 1 segundo antes de tentar enviar
      }
    }
  }

  /**
     * Coloca a mensagem na fila e envia.
     * @param {string} data - Dados da mensagem a ser enviada.
     */
  coloca_mensagem_na_fila_e_envia(data) {
    this.fila_mensagens.push(data);
    this.envia();
  }

  /**
     * Pega a mensagem da fila.
     * @return {string} - Dados da mensagem.
     */
  pega_mensagem_da_fila() {
    return this.fila_mensagens.shift();
  }

  /**
     * Recoloca a mensagem na fila.
     * @param {string} data - Dados da mensagem.
     */
  recoloca_mensagem_na_fila(data) {
    this.fila_mensagens.unshift(data);
    setTimeout(() => this.envia(), 3000);
  }
}
