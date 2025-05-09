var dicionario = [];

$(document).ready(async function() {

    await appStart();
    closeLoaderDiv();
    atualizarCirculos();
});

async function appStart(){
    setAppStatus("Carregando dicionário...");
    dicionario = await carregarDicionario();
}

function setAppStatus(string){
    $("#app-status").append(string);
}

function closeLoaderDiv(){
    $(".loader-div").hide();
}

async function carregarDicionario() {
    const response = await fetch('https://raw.githubusercontent.com/pythonprobr/palavras/master/palavras.txt');
    const texto = await response.text();
    const palavras = texto
      .split('\n')
      .map(p => p.trim().toLowerCase())
      .filter(p => p.length >= 3);
    return palavras;
}

function atualizarCirculos() {
    const letras = document.getElementById('letras').value.toUpperCase().trim();
    const container = document.getElementById('circulos');
    container.innerHTML = '';

    const radius = 80; // distância do centro
    const centerX = 110;
    const centerY = 110;

    const total = 6; // letras ao redor
    const letraPrincipal = letras[0] || '';

    // Central (letra principal)
    const central = document.createElement('div');
    central.className = 'circulo principal';
    central.textContent = letraPrincipal;
    container.appendChild(central);

    // Letras ao redor
    for (let i = 1; i < 7; i++) {
        const letra = letras[i] || '';
        const angle = ((i - 1) / total) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - 30;
        const y = centerY + radius * Math.sin(angle) - 30;

        const div = document.createElement('div');
        div.className = 'circulo';
        div.textContent = letra;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        container.appendChild(div);
    }
}

function buscarPalavras() {
    const letrasBrutas = document.getElementById('letras').value.toLowerCase().trim();
    if (letrasBrutas.length !== 7) {
        alert("Digite exatamente 7 letras.");
        return;
    }

    const letras = letrasBrutas.split('');
    const letraPrincipal = letras[0];

    const palavrasValidas = dicionario.filter(palavra => {
        const p = palavra.toLowerCase();
        return (
        p.length >= 4 &&
        p[0] === letraPrincipal &&
        [...p].every(c => letras.includes(c))
        );
    }).sort((a, b) => a.localeCompare(b) || a.length - b.length);

    const resultado = palavrasValidas.sort().join('<br>') || 'Nenhuma palavra encontrada.';
    document.getElementById('resultado').innerHTML =
        `<h3>${palavrasValidas.length} palavra(s) encontrada(s):</h3><p>${resultado}</p>`;
}