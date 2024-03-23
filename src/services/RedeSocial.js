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

    // Método para salvar um post com os campos texto e imagem
    async post(text, fileIds) {
        const formData = new FormData();
        formData.append('content', text);
        if (fileIds.length > 0) {
            formData.append('fileIds', fileIds);
        }
        const response = await this.AjaxService.postForm('api/posts', formData);

        const data = await response.json();
        return data;
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

export class Fotos
{
    constructor() {
        this.AjaxService = new AjaxService('redesocial/');
    }
    async post(formData) {
        return await this.AjaxService.postForm('api/posts', formData);
    }    
}