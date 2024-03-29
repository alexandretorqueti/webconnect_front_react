import { PadraoAjax } from './AjaxService.js';

export class PostPaginado extends PadraoAjax
{ 
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

export class Icones extends PadraoAjax
{
    async get() {
        return await this.AjaxService.get('api/icones');
    }
}

export class Comentarios extends PadraoAjax
{
    async get(postId) {
        return await this.AjaxService.get('api/posts/coments/' + postId);
    }

    async post(comentario, postId) {
        const formData = new FormData();
        formData.append('comentario', comentario);
        formData.append('post_id', postId);
        return await this.AjaxService.postForm('api/posts/coments', formData);
    }
}