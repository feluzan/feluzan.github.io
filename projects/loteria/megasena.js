
var numeros = {};
var duplas = {};
var triplas = {};
var quadras = {};
var quinas = {};
var senas = {};


function contarNumerosEmSorteio(){
    for(i=1;i<=60;i++){
        numeros[i]=[];
    }

    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<6;j++){
            // console.log(allMegaSena[i].dezenas[j],allMegaSena[i].concurso, i, j);
            numeros[parseInt(allMegaSena[i].dezenas[j])].push(allMegaSena[i]);
        }
    }
}

function vezesSorteado(dict){
    // Create items array
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key].length];
    });
  
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    return items;
}

function contaDuplasSorteadas(){

    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<5;j++){
            for(k=1;k<6;k++){
                if (j>=k) continue;

                    try{
                        duplas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]].push(allMegaSena[i].concurso);
                    }catch{
                        duplas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]] = [allMegaSena[i].concurso];
                    }

            }
        }
    }
}

function contaTriplasSorteadas(){

    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<4;j++){
            for(k=1;k<5;k++){
                if (j>=k) continue;
                for(l=2;l<6;l++){
                    if(k>=l) continue;

                    try{
                        triplas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l]].push(allMegaSena[i].concurso);
                    }catch{
                        triplas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l]] = [allMegaSena[i].concurso];
                    }
                }

                

            }
        }
    }
}

function contaQuadrasSorteadas(){
    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<3;j++){
            for(k=1;k<4;k++){
                if (j>=k) continue;
                for(l=2;l<5;l++){
                    if(k>=l) continue;
                    for(m=3;m<6;m++){
                        if(l>=m) continue;
                        try{
                            quadras[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]].push(allMegaSena[i].concurso);
                        }catch{
                            quadras[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]] = [allMegaSena[i].concurso]
                        }
                        
                    }

                    
                }

                

            }
        }
    }
}

function contaQuinasSorteadas(){
    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<2;j++){
            for(k=1;k<3;k++){
                if (j>=k) continue;
                for(l=2;l<4;l++){
                    if(k>=l) continue;
                    for(m=3;m<5;m++){
                        if(l>=m) continue;
                        for(n=4;n<6;n++){
                            try{
                                quinas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]+ ";" + allMegaSena[i].dezenas[n]].push(allMegaSena[i].concurso);
                            }catch{
                                quinas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]+ ";" + allMegaSena[i].dezenas[n]] = [allMegaSena[i].concurso]
                            }
                        }

                        
                        
                    }

                    
                }

                

            }
        }
    }
}

function contaSenasSorteadas(){
    for (i=0;i<allMegaSena.length;i++){
        for(j=0;j<1;j++){
            for(k=1;k<2;k++){
                if (j>=k) continue;
                for(l=2;l<3;l++){
                    if(k>=l) continue;
                    for(m=3;m<4;m++){
                        if(l>=m) continue;
                        for(n=4;n<5;n++){
                            if(m>=n) continue;
                            for(o=5;o<6;o++){
                                if(n>=o) continue;

                                    try{
                                        senas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]+ ";" + allMegaSena[i].dezenas[n] + ";" + allMegaSena[i].dezenas[o]].push(allMegaSena[i].concurso);
                                    }catch{
                                        senas[allMegaSena[i].dezenas[j] + ";" + allMegaSena[i].dezenas[k]+ ";" + allMegaSena[i].dezenas[l] + ";" + allMegaSena[i].dezenas[m]+ ";" + allMegaSena[i].dezenas[n] + ";" + allMegaSena[i].dezenas[o]] = [allMegaSena[i].concurso]
                                    }

                            }
                            
                        }

                        
                        
                    }

                    
                }

                

            }
        }
    }
}