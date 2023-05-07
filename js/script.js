const keyDes = ["a","e","i","o","u"];
const keyEnc = ["ai","enter","imes","ober","ufat"];
let activo =  false;
function modificarDOM(texto){


    let contenedor = document.getElementById("aside-div-cont-dinamico");
    let contenedorInput = document.getElementById("div-campo-texto");
    
    // eliminamos las DIV que contiene el ASIDE y el Text Input
     contenedor.removeChild(document.getElementById("img-buscar"));
     contenedor.removeChild(document.getElementById("div-leyenda-aviso"));
     contenedor.removeChild(document.getElementById("div-leyenda-mensaje"));
     contenedorInput.removeChild(document.getElementById("input-frase"));

     //Creamos DIV que contendrá el texto encriptado/desencriptado
     let crearDivTextoEncriptado2 = document.createElement("div");
     let textoEncriptado = document.createTextNode(texto);
     crearDivTextoEncriptado2.id ="mensaje-procesado-secundario";
     crearDivTextoEncriptado2.appendChild(textoEncriptado);
     contenedor.appendChild(crearDivTextoEncriptado2);

     
     let crearDivTextoEncriptado1 = document.createElement("div");
     let textoEncriptado1 = document.createTextNode(texto);
     crearDivTextoEncriptado1.id = "mensaje-procesado-principal"
     crearDivTextoEncriptado1.appendChild(textoEncriptado1);
     contenedorInput.appendChild(crearDivTextoEncriptado1);

     //Creamos la DIV que contendrá el boton copiar
     let crearDivBoton = document.createElement("div");
     crearDivBoton.id = "div-btn-copiar";
     contenedor.appendChild(crearDivBoton);

     //Creamos el boton de copiar
     let creaBotonCopiar = document.createElement("button");
     let crearTextoBotonCopiar = document.createTextNode("Copiar");
     creaBotonCopiar.id="btn-copiar";
     creaBotonCopiar.className = "btn copiar";
     creaBotonCopiar.onclick = copiarAPortapapeles;
     creaBotonCopiar.appendChild(crearTextoBotonCopiar);
     contenedor.appendChild(creaBotonCopiar);
}

const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function encriptar(){
    
    let fraseSinFormato = document.getElementById("input-frase").value.toLowerCase();
    let frase = Array.from(removerAcentos(fraseSinFormato));
    for(let x=0 ; x<=frase.length; x++){
        for(let y=0; y<keyDes.length; y++){  
            if(frase[x] == keyDes[y]){
                frase[x] = keyEnc[y];   
            }
        }
    }
    let textoConvertido = frase.toString().replace(/,/g,"");
    modificarDOM(textoConvertido);
}

function desencriptar(){

    let frase = document.getElementById("input-frase").value;
    let fraseDesencriptada = frase.replaceAll(keyEnc[0], keyDes[0]).replaceAll(keyEnc[1], keyDes[1]).replaceAll(keyEnc[2], keyDes[2]).replaceAll(keyEnc[3], keyDes[3]).replaceAll(keyEnc[4], keyDes[4]);  
    modificarDOM(fraseDesencriptada);

 }

 function copiarAPortapapeles(){

    let mensaje = document.getElementById("mensaje-procesado-secundario").innerText;
    navigator.clipboard.writeText(mensaje)
    .then(() => {
        alert("El texto se ha copiado al portapapeles")
    })
    .catch(err => {
        alert("Error, nose ha podido copiar el texto al portapapeles", err)
    })

 }
 document.getElementById("btn-encriptar").addEventListener("click", encriptar);
 document.getElementById("btn-desencriptar").addEventListener("click", desencriptar);

 

 


 