import { ErrorService } from './ErrorService.js';

export class AjaxService {

    constructor(app = "") {
        this.enderecoBase = 'http://localhost:8000/';
        this.errorService = new ErrorService();
        this.app = app;

        if (window.location.href.indexOf('localhost') === -1) {
            this.enderecoBase = 'https://webconnect.com.br/api/';
        }

        this.token = localStorage.getItem('token');
    }

    /*
    * Método para fazer um pedido GET
    */
    async get(endPoint) {
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
            });
            return await response.json();
        } catch(error) {
            this.errorService.handlerError(error);
            throw error;
        }
    }
    async postJson(endPoint, body = {}, sendToken = true) {
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        };
        if (sendToken) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'POST',
                credentials: 'include',
                headers: headers,
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Algo deu errado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            this.errorService.handlerError(error);
            throw error;
        }
    }
    async postForm(endPoint, formData) {
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            });

            if (!response.ok) {
                throw new Error('Algo deu errado');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            this.errorService.handlerError(error);
            throw error;
        }
    }
    async delete(endPoint) {
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });
            return response.json();
        } catch(error) {
            this.errorService.handlerError(error);
            throw error;
        }
    }
    
}


export class PadraoAjax {
    constructor() {
        this.AjaxService = new AjaxService('redesocial/');
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Verifica se o cookie começa com o nome procurado seguido por `=`.
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
