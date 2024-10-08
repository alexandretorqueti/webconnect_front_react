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
    async Signup(username, password, email, first_name, last_name, confirm_password, confirm_email) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('confirm_email', confirm_email);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('confirm_password', confirm_password);
    
        return await this.AjaxService.postForm('api/pessoa_logada', formData);
    }
}

