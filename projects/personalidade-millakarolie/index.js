var selectedOption = null;
var perguntasAtivas = [];
var historicoRespostas = [];
var resultadosEmpatados = [];
var resultadoFinalEscolhido = null;
var nomeParticipante = "";
var isTransitioning = false;
var contagemResultados = {
	A: 0,
	B: 0,
	C: 0,
};

function sleep(milliseconds) {
	return new Promise(function (resolve) {
		setTimeout(resolve, milliseconds);
	});
}

function selectOption(optionID) {
	if (isTransitioning) {
		return;
	}

	selectedOption = optionID;
	$(".option.selected").removeClass("selected");
	$('.option[optionID="' + optionID + '"]').addClass("selected");
}

function fillQuestionWrapper(question) {
	selectOption(null);
	$("#question-text").text(question.text);

	for (var i = 0; i < question.options.length; i++) {
		var option = question.options[i];
		var $element = $('.option[optionID="' + option.id + '"]');
		$element.text(option.text);
		$element.removeClass("hide-block");
	}
}

function sortAndShowQuestion() {
	if (perguntasAtivas.length === 0) {
		finalizaJogo();
		return;
	}

	var question = perguntasAtivas.shift();
	fillQuestionWrapper(question);
}

async function enviarResposta() {
	if (!selectedOption || isTransitioning) {
		return;
	}

	isTransitioning = true;
	contagemResultados[selectedOption] += 1;
	historicoRespostas.push(selectedOption);

	var $questionWrapper = $(".question-wrapper");
	var $selected = $('.option[optionID="' + selectedOption + '"]');

	$selected.addClass("option-confirmed");
	$questionWrapper.addClass("question-leaving");

	await sleep(420);

	$selected.removeClass("option-confirmed");
	$questionWrapper.removeClass("question-leaving");

	sortAndShowQuestion();

	$questionWrapper.addClass("question-entering");
	await sleep(380);
	$questionWrapper.removeClass("question-entering");
	isTransitioning = false;
}

function getResultadoFinal() {
	var empatados = ["A", "B", "C"];
	var melhorPontuacao = Math.max(
		contagemResultados.A,
		contagemResultados.B,
		contagemResultados.C
	);

	empatados = empatados.filter(function (id) {
		return contagemResultados[id] === melhorPontuacao;
	});

	return empatados.map(function (id) {
		var resultado = resultados[id];
		return {
			id: id,
			title: resultado.title,
			essencia: resultado.essencia,
			description: resultado.description,
		};
	});
}

function renderResultado(resultado) {
	resultadoFinalEscolhido = resultado;
	$("#resultado-titulo").text(resultado.title);
	$("#resultado-descricao").html(
		'<div class="result-block">' +
			"<p>" +
			resultado.description +
			"</p>" +
		"</div>"
	);
	atualizarLinkWhatsapp();
}

function getTextoResposta() {
	if (!resultadoFinalEscolhido) {
		return "";
	}

	return [
		"Oi! Acabei de fazer o quiz de personalidade Milla Karolie.",
		"",
		"Nome: " + nomeParticipante,
		"Resultado: " + resultadoFinalEscolhido.title,
		"Essência: " + resultadoFinalEscolhido.essencia,
	].join("\n");
}

function atualizarLinkWhatsapp() {
	var texto = getTextoResposta();
	var href = "#";

	if (texto) {
		href =
			"https://wa.me/5527992259404?text=" +
			encodeURIComponent(texto);
	}

	$("#whatsapp-link").attr("href", href);
}

function enviarParaWhatsapp(event) {
	if (!resultadoFinalEscolhido) {
		event.preventDefault();
	}
}

function escolherResultadoDesempate(resultadoID) {
	var resultadoEscolhido = resultados[resultadoID];
	renderResultado({
		id: resultadoID,
		title: resultadoEscolhido.title,
		essencia: resultadoEscolhido.essencia,
		description: resultadoEscolhido.description,
	});
	$("#tie-breaker").addClass("hide-block");
}

function finalizaJogo() {
	var resultadosFinais = getResultadoFinal();
	var descricoes = resultadosFinais.map(function (resultado) {
		return (
			'<div class="result-block">' +
				"<p><strong>" +
				resultado.title +
				"</strong></p>" +
				"<p>" +
				resultado.description +
				"</p>" +
			"</div>"
		);
	});

	$("#header").addClass("hide-block");
	$("#game").addClass("hide-block");
	$("#finish").removeClass("hide-block");
	$("#tie-breaker-options").empty();
	resultadosEmpatados = resultadosFinais.slice();
	resultadoFinalEscolhido = null;
	atualizarLinkWhatsapp();

	if (resultadosFinais.length === 1) {
		renderResultado(resultadosFinais[0]);
		$("#tie-breaker").addClass("hide-block");
	} else {
		$("#resultado-titulo").text("Empate de personalidade");
		$("#resultado-descricao").html(descricoes.join(""));
		for (var i = 0; i < resultadosFinais.length; i++) {
			var resultado = resultadosFinais[i];
			$("#tie-breaker-options").append(
				'<button class="tie-breaker-button" onclick="escolherResultadoDesempate(\'' +
					resultado.id +
					"')\">" +
					resultado.title +
					" - " +
					resultado.essencia +
				"</button>"
			);
		}
		$("#tie-breaker").removeClass("hide-block");
	}

	$("#resultado-contagem").text(
		"A: " +
			contagemResultados.A +
			" | B: " +
			contagemResultados.B +
			" | C: " +
			contagemResultados.C
	);
}

function iniciaJogo() {
	nomeParticipante = $("#nome-participante").val().trim();
	if (!nomeParticipante) {
		$("#nome-participante").focus();
		return;
	}

	perguntasAtivas = perguntas.slice();
	historicoRespostas = [];
	resultadosEmpatados = [];
	resultadoFinalEscolhido = null;
	contagemResultados = {
		A: 0,
		B: 0,
		C: 0,
	};

	$("#welcome").addClass("hide-block");
	$("#game").removeClass("hide-block");
	sortAndShowQuestion();
}
