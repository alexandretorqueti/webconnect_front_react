import { AjaxService } from './AjaxService.js';


export class PostPaginado
{ 
    constructor() {
        this.AjaxService = new AjaxService('redesocial/');
    }
    async get(paginaAtual) {
        const data = await this.AjaxService.get('api/posts/' + paginaAtual + '/***todos***');
        return {
            'continuar': data.continuar,
            'pagina': data.posts
        }
    }

    async post(formData) {
        return await this.AjaxService.postForm('api/posts', formData);
    }   

}

export class Icones
{
    constructor() {
        this.AjaxService = new AjaxService('redesocial/');
    }
    async get() {
        return await this.AjaxService.get('api/icones');
    }
}