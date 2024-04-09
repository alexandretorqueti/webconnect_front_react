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
    async getPessoasSemRelacao(pagina, filtro) {
        if (!filtro) {
            filtro = '';
        }
        if (filtro === '') {
            filtro = '***todos***';
        }
        return await this.AjaxService.get('api/pessoas_sem_relacao/' + pagina + '/' + filtro);
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
    async Seguir(pessoaId) {
        const body = {};
        body['pessoa_id'] = pessoaId;
        return await this.AjaxService.postJson('api/seguir', body);
    }
    async DeixarDeSeguir(pessoaId) {
        const body = {};
        body['pessoa_id'] = pessoaId;
        return await this.AjaxService.delete('api/deixar_de_seguir', body);
    }

    async getGeneros() {
        return await this.AjaxService.get('api/genero');
    }

    async getEstadosCivis() {
        return await this.AjaxService.get('api/estado_civil');
    }

    async getAreasAtuacoes() {
        return await this.AjaxService.get('api/area_atuacao');
    }

    async UpdatePessoa(formData) {
        return await this.AjaxService.putForm('api/pessoa_logada', formData);
    }

}

