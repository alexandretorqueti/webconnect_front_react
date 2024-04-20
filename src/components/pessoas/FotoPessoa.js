
function FotoPessoaComponent({ foto_url, avatar }) {
   const placeholder = "/static/semft.png";

   const handleError = (e) => {
       e.target.src = placeholder;
   };

   return (
       <img
           src={foto_url || placeholder}
           alt=""
           loading="lazy"
           className={`avatar-${avatar} rounded`}
           onError={handleError}
       />
   );
}

export default FotoPessoaComponent;

