import { ErrorService } from './ErrorService.js';

export class AjaxService {

    constructor(app = "") {
        this.enderecoBase = 'http://localhost:8000/';
        this.errorService = new ErrorService();
        this.app = app;

        if (window.location.href.indexOf('localhost') === -1) {
            this.enderecoBase = 'https://www.webconnect.com.br/api/';
        }
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
                    'Content-Type': 'application/json'
                },
            });
            return response.json();
        } catch(error) {
            this.errorService.handlerError(error);
            return null;
        }
    }
    async postJson(endPoint, body = {}) {
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Algo deu errado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            this.errorService.handlerError(error);
            return null;
        }
    }
    async postForm(endPoint, formData) {
        try {
            const response = await fetch(this.enderecoBase + this.app + endPoint, {
                method: 'POST',
                credentials: 'include',
                body: formData 
            });

            if (!response.ok) {
                throw new Error('Algo deu errado');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            this.errorService.handlerError(error);
            return null;
        }
    }
    
}

