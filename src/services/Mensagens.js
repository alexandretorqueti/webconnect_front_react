import { AjaxService } from './AjaxService.js';

export class Mensagens
{
    constructor() {
        this.AjaxService = new AjaxService('mensagens/');
    }
    async getMensagensUsuario(pessoaId, pagina) {
        return await this.AjaxService.get('api/mensagensPessoa/' + pessoaId + '/' + pagina);
    }
    async getDiff(data) {
        return await this.AjaxService.get('api/diff/' + data);
    }
}

