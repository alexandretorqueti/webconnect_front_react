export class Pessoas
{
    async getUsuarioLogado() {
        try {
            const response = await fetch('http://localhost:8000/pessoas/api/pessoa_logada', {
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

