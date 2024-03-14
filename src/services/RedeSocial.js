export class PostPaginado
{ 
    async get(paginaAtual) {
        try {
            const response = await fetch('http://localhost:8000/redesocial/api/posts/' + paginaAtual + '/***todos***', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Algo deu errado');
            }
            const data = await response.json();
            return {
                'continuar': data.continuar,
                'pagina': data.posts
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export class Icones
{
    async get() {
        try {
            const response = await fetch('http://localhost:8000/redesocial/api/icones', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Algo deu errado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}