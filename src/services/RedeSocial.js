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

    // Método para salvar um post com os campos texto e imagem
    async post(text, fileIds) {
        try {
            // Criar um objeto FormData
            const formData = new FormData();

            // Adicionar o campo de texto ao formData
            formData.append('content', text); // Supondo que 'post' tenha uma propriedade 'texto'

            // Adicionar a imagem ao formData se existir
            // Supondo que 'image' seja o arquivo de imagem enviado pelo usuário
            if (fileIds.length > 0) {
                formData.append('fileIds', fileIds);
            }

            const response = await fetch('http://localhost:8000/redesocial/api/posts', {
                method: 'POST',
                credentials: 'include',
                // Remover 'Content-Type': 'application/json', o navegador irá definir o Content-Type corretamente para 'multipart/form-data'
                body: formData // Usar formData como corpo do pedido
            });

            if (!response.ok) {
                throw new Error('Algo deu errado');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null; // Retornar null ou manipular o erro conforme necessário
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

export class Fotos
{
    async post() {
        try {
            const response = await fetch('http://localhost:8000/redesocial/api/fotos', {
                method: 'POST',
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