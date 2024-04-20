import { PadraoAjax } from './AjaxService.js';

export class PostPaginado extends PadraoAjax
{ 
    async get(paginaAtual) {
        const data = await this.AjaxService.get('api/posts/' + paginaAtual + '/***todos***');
        if (data && data.continuar) {
            return {
                'continuar': data.continuar,
                'pagina': data.posts
            }
        } else {
            if (data && data.posts && data.posts.length > 0 && paginaAtual === 1) {
                return {
                    'continuar': false,
                    'pagina': data.posts
                }
            }
            else {
                return {
                    'continuar': false,
                    'pagina': []
                }
            }
        }
    }

    async post(formData) {
        return await this.AjaxService.postForm('api/posts', formData);
    }

    async delete(postId) {
        return await this.AjaxService.delete('api/posts/' + postId);
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

    async post(comentario, postId, comentarioId = null) {
        const formData = new FormData();
        formData.append('comentario', comentario);
        formData.append('post_id', postId);
        if (comentarioId) {
            formData.append('comentario_pai', comentarioId);
        }
        return await this.AjaxService.postForm('api/posts/coments', formData);
    }

    async delete(comentarioId) {
        return await this.AjaxService.delete('api/posts/coments/' + comentarioId);
    }
}

export class Curtidas extends PadraoAjax
{
    async get(postId) {
        return await this.AjaxService.get('api/posts/curtir/' + postId);
    }

    async post(postId, iconeId) {
        return await this.AjaxService.postJson('api/posts/curtir', { 'post_id': postId, 'icone_id': iconeId});
    }
}

export class CurtidasComentarios extends PadraoAjax
{
    async get(comentarioId) {
        return await this.AjaxService.get('api/posts/coments/curtir/' + comentarioId);
    }

    async post(comentarioId) {
        return await this.AjaxService.postJson('api/posts/coments/curtir', { 'coment_id': comentarioId });
    }
}