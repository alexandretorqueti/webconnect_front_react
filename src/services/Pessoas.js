import { AjaxService } from './AjaxService.js';

export class Pessoas
{
    constructor() {
        this.AjaxService = new AjaxService('pessoas/');
    }
    async getUsuarioLogado() {
        return await this.AjaxService.get('api/pessoa_logada');
    }
}

