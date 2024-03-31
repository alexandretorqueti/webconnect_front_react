import { AjaxService } from './AjaxService.js';

export class Pessoas
{
    constructor() {
        this.AjaxService = new AjaxService('pessoas/');
    }
    async getUsuarioLogado() {
        return await this.AjaxService.get('api/pessoa_logada');
    }
    async getPessoasSemRelacao(pagina) {
        return await this.AjaxService.get('api/pessoas_sem_relacao/' + pagina);
    }
    async getPessoasComRelacao() {
        return await this.AjaxService.get('api/pessoas_com_relacao');
    }
}

