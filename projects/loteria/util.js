
/**
 * 
 * Utilizando a API descrita em https://github.com/guto-alves/loterias-api
 * 
 */

 function makeGetRequest(path) {
    return new Promise(function (resolve, reject) {
        axios.get(path).then(
            (response) => {
                var result = response.data;
                // console.log('Processing Request');
                resolve(result);
            },
                (error) => {
                reject(error);
            }
        );
    });
}

async function getResult(idConcurso, tipoLoteria="megasena"){
    var ret = await makeGetRequest('https://loteriascaixa-api.herokuapp.com/api/' + tipoLoteria + '/' + idConcurso);
    return ret;
    
}

async function getLatest(tipoLoteria = "megasena"){
    var ret = await makeGetRequest('https://loteriascaixa-api.herokuapp.com/api/' + tipoLoteria + '/latest');
    // console.log(ret);
    return ret;
}

async function getAll(tipoLoteria = "meg-sena"){
    var ret = await makeGetRequest('https://loteriascaixa-api.herokuapp.com/api/' + tipoLoteria);

    return ret;
}

async function getAllFetched(tipoLoteria = "megasena"){
    var prom = getAll(tipoLoteria);
    var aux = prom.then(value => {
        return value;
      }).catch(err => {
        console.log(err);
      });
      return aux;

}
