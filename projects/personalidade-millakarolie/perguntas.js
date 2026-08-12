var perguntas = [
	{
		text: "Qual cenário transmite paz para você?",
		options: [
			{
				id: "A",
				text: "A. Um jardim florido em uma manha de primavera, com o perfume das flores e a luz suave do sol.",
			},
			{
				id: "B",
				text: "B. Uma casa iluminada, cercada por plantas, grandes janelas e uma atmosfera leve e contemporanea.",
			},
			{
				id: "C",
				text: "C. Um fim de tarde tranquilo no campo, com o vento fresco, o ceu em tons de lilas e o tempo passando sem pressa.",
			},
		],
	},
	{
		text: "Se o seu casamento pudesse ser resumido em uma sensacao, seria:",
		options: [
			{
				id: "A",
				text: "A. Romantico, delicado e inesquecivel.",
			},
			{
				id: "B",
				text: "B. Leve, sofisticado e naturalmente elegante.",
			},
			{
				id: "C",
				text: "C. Aconchegante, sereno e cheio de significado.",
			},
		],
	},
	{
		text: "Qual dessas experiencias mais combina com voce?",
		options: [
			{
				id: "A",
				text: "A. Caminhar por ruas charmosas, entrar em uma floricultura, descobrir um cafe especial e apreciar a beleza dos pequenos detalhes.",
			},
			{
				id: "B",
				text: "B. Passar uma tarde em um ambiente clean, com arquitetura contemporanea, boa musica e uma sensacao constante de frescor.",
			},
			{
				id: "C",
				text: "C. Desligar o celular, colocar uma playlist tranquila, preparar uma bebida favorita e aproveitar um momento so seu.",
			},
		],
	},
	{
		text: "As pessoas costumam dizer que voce e...",
		options: [
			{
				id: "A",
				text: "A. Romantica, delicada e apaixonada pelos pequenos detalhes.",
			},
			{
				id: "B",
				text: "B. Elegante, autentica e dona de um estilo que chama atencao pela naturalidade.",
			},
			{
				id: "C",
				text: "C. Tranquila, acolhedora e aquela pessoa que transmite paz por onde passa.",
			},
		],
	},
];

var resultados = {
	A: {
		title: "A Romantica",
		essencia: "Bloom",
		description:
			"Voce vive as emocoes intensamente e acredita que sao os pequenos detalhes que tornam um momento inesquecivel. Sua delicadeza e marcante e sua elegancia acontece de forma natural.<br><br>Sua essencia e...<br><strong>Bloom 🌸</strong><br>Um floral sofisticado, delicado e envolvente. Uma fragrancia que celebra o romance com leveza e sofisticacao.",
	},
	B: {
		title: "A Contemporanea",
		essencia: "Bambu & Alecrim",
		description:
			"Voce valoriza a beleza da simplicidade, aprecia ambientes leves e encontra elegancia no equilibrio. Seu estilo e moderno, refinado e atemporal.<br><br>Sua essencia e...<br><strong>Bambu & Alecrim 🎋</strong><br>Uma fragrancia fresca, luminosa e sofisticada, que transmite leveza e autenticidade.",
	},
	C: {
		title: "A Serena",
		essencia: "Lavanda & Pimenta",
		description:
			"Voce faz do aconchego um estilo de vida. Gosta de criar momentos especiais, desacelerar e aproveitar o presente. Sua calma inspira quem esta ao seu redor.<br><br>Sua essencia e...<br><strong>Lavanda & Pimenta 💜</strong><br>Uma combinacao envolvente que une tranquilidade e personalidade, perfeita para quem transforma calma em presenca.",
	},
};
