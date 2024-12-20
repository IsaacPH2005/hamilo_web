export const idsValidos = (listaids, referencia) => {
    let lista = [];
    listaids.forEach((element,index) => {
        if(element.endsWith(referencia)){
            let palabra = element.replace(referencia,"");
            lista.push(palabra);
        }
    });
    return lista;
}; 