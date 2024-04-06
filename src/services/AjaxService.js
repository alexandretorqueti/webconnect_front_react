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
        this.csrfToken = localStorage.getItem('csrfToken');
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
                    'Authorization': 'Bearer ' + this.token,
                    'X-CSRFToken': this.csrfToken,
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
            'X-CSRFToken': this.csrfToken,
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
                    'X-CSRFToken': this.csrfToken,
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
                    'X-CSRFToken': this.csrfToken,
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
