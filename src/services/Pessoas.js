import { AjaxService } from './AjaxService.js';

export class Pessoas
{
    constructor() {
        this.AjaxService = new AjaxService('pessoas/');
    }
    async getPessoaLogada() {
        return await this.AjaxService.get('api/pessoa_logada').catch((error) => {
            throw error;
        });
    }
    async getPessoasSemRelacao(pagina) {
        return await this.AjaxService.get('api/pessoas_sem_relacao/' + pagina);
    }
    async getPessoasComRelacao() {
        return await this.AjaxService.get('api/pessoas_com_relacao');
    }
    async Login(username, password) {
        const sendToken = false;
        return await this.AjaxService.postJson('api-token-auth', {
            username,
            password
        }, sendToken);
    }
}

