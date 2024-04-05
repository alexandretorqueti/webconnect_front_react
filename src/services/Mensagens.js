import { AjaxService } from './AjaxService.js';

export class Mensagens
{
    constructor() {
        this.AjaxService = new AjaxService('mensagens/');
    }
    async getMensagensUsuario(pessoaId, pagina) {
        return await this.AjaxService.get('api/mensagensPessoa/' + pessoaId + '/' + pagina);
    }
    getDiff(date) {
            const now = new Date();
            const pastDate = new Date(date);
            const diff = now - pastDate; // Diferença em milissegundos
          
            const secondsInYear = 60 * 60 * 24 * 365;
            const secondsInMonth = 60 * 60 * 24 * 30;
            const secondsInDay = 60 * 60 * 24;
            const secondsInHour = 60 * 60;
            const secondsInMinute = 60;
          
            const diffInSeconds = diff / 1000; // Converte diferença para segundos
          
            let years = Math.floor(diffInSeconds / secondsInYear);
            let remainder = diffInSeconds % secondsInYear;
            
            let months = Math.floor(remainder / secondsInMonth);
            remainder %= secondsInMonth;
            
            let days = Math.floor(remainder / secondsInDay);
            remainder %= secondsInDay;
            
            let hours = Math.floor(remainder / secondsInHour);
            remainder %= secondsInHour;
            
            let minutes = Math.floor(remainder / secondsInMinute);
            let seconds = Math.floor(remainder % secondsInMinute);
          
            let difference;
          
            if (years > 0) {
              difference = `${years} anos atrás`;
            } else if (months > 0) {
              difference = `${months} meses atrás`;
            } else if (days > 0) {
              difference = `${days} dias atrás`;
            } else if (hours > 0) {
              difference = `${hours} horas atrás`;
            } else if (minutes > 0) {
              difference = `${minutes} minutos atrás`;
            } else if (seconds > 0) {
              difference = `${seconds} segundos atrás`;
            } else {
              difference = 'Agora';
            }
          
            return difference;
          }
    }

