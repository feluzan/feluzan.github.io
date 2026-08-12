var perguntas = [
	{
		text: "Qual cenário transmite paz para você?",
		options: [
			{
				id: "A",
				text: "A. Um jardim florido em uma manhã de primavera, com o perfume das flores e a luz suave do sol.",
			},
			{
				id: "B",
				text: "B. Uma casa iluminada, cercada por plantas, grandes janelas e uma atmosfera leve e contemporânea.",
			},
			{
				id: "C",
				text: "C. Um fim de tarde tranquilo no campo, com o vento fresco, o céu em tons de lilás e o tempo passando sem pressa.",
			},
		],
	},
	{
		text: "Se o seu casamento pudesse ser resumido em uma sensação, seria:",
		options: [
			{
				id: "A",
				text: "A. Romântico, delicado e inesquecível.",
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
		text: "Qual dessas experiências mais combina com você?",
		options: [
			{
				id: "A",
				text: "A. Caminhar por ruas charmosas, entrar em uma floricultura, descobrir um café especial e apreciar a beleza dos pequenos detalhes.",
			},
			{
				id: "B",
				text: "B. Passar uma tarde em um ambiente clean, com arquitetura contemporânea, boa música e uma sensação constante de frescor.",
			},
			{
				id: "C",
				text: "C. Desligar o celular, colocar uma playlist tranquila, preparar uma bebida favorita e aproveitar um momento só seu.",
			},
		],
	},
	{
		text: "As pessoas costumam dizer que você é...",
		options: [
			{
				id: "A",
				text: "A. Romântica, delicada e apaixonada pelos pequenos detalhes.",
			},
			{
				id: "B",
				text: "B. Elegante, autêntica e dona de um estilo que chama atenção pela naturalidade.",
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
		title: "A Romântica",
		essencia: "Bloom",
		description:
			"Você vive as emoções intensamente e acredita que são os pequenos detalhes que tornam um momento inesquecível. Sua delicadeza é marcante e sua elegância acontece de forma natural.<br><br>Sua essência é...<br><strong>Bloom 🌸</strong><br>Um floral sofisticado, delicado e envolvente. Uma fragrância que celebra o romance com leveza e sofisticação.",
	},
	B: {
		title: "A Contemporânea",
		essencia: "Bambu & Alecrim",
		description:
			"Você valoriza a beleza da simplicidade, aprecia ambientes leves e encontra elegância no equilíbrio. Seu estilo é moderno, refinado e atemporal.<br><br>Sua essência é...<br><strong>Bambu & Alecrim 🎋</strong><br>Uma fragrância fresca, luminosa e sofisticada, que transmite leveza e autenticidade.",
	},
	C: {
		title: "A Serena",
		essencia: "Lavanda & Pimenta",
		description:
			"Você faz do aconchego um estilo de vida. Gosta de criar momentos especiais, desacelerar e aproveitar o presente. Sua calma inspira quem está ao seu redor.<br><br>Sua essência é...<br><strong>Lavanda & Pimenta 💜</strong><br>Uma combinação envolvente que une tranquilidade e personalidade, perfeita para quem transforma calma em presença.",
	},
};
