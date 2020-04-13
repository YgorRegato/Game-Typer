$(".mostra-placar").click(mostraPlacar);
var placar= $(".placar");
var segundos= $(".segundos").text();
var areaDigitacao= $(".area-digitacao");
var frase= $(".frase").text();
var nomeJogador= $(".nome-jogador");
//Pegando o elemento html com o seletor jQuery -$("xxx");-




$("document").ready(function(){

	contaNumeroDePalavrasDaFrase();
	nomeDoJogador();
	contadorDePalavrasECaracteres();
	indicadorDeErroPelaBorda();
	iniciaCronometro();
	carregaPlacar();
	tooltipster();
	var reiniciarJogo= $(".reiniciar");
	reiniciarJogo.click(reiniciaJogo);

/*Essa manipulação do jQuery diz:"quando o documento(document) estiver pronto(ready), execute essa função(function). 
Esse comando serve para executarmos comandos assim que o DOM estiver pronto para ser manipulado. Sendo assim, todas
as nossas funções estão sendo executadas assim que o DOM carrega, não precisando deixar códigos soltos. Dessa forma
o código fica muito mais organizado.*/

/*Essa função também tem um atalho: 

	$(function(){
		contaNumeroDePalavrasDaFrase();
		contadorDePalavrasECaracteres();
		iniciaCronometro();
		var reiniciarJogo= $(".reiniciar");
		reiniciarJogo.click(reiniciaJogo);
	})

*/

});




//Funções

function contaNumeroDePalavrasDaFrase(){

	var frase= $(".frase").text();
	//Separando palavras com o SPLIT e obtendo o tamanho com length
	var tamanhoFrase= frase.split(" ").length;    								//Só relembrando que o método SPLIT quebra as palavras de uma frase de Strings. Dentro dos parenteses, vc coloca como quer que elas sejam separadas.


	var numeroDePalavras= $(".numero-de-palavras");

	//Manipulando o conteúdo do elemento com TEXT
	numeroDePalavras.text(tamanhoFrase);                                     //TEXT. O método text tem duas funções: se o parametro estiver vazio, ele pega o texto do elemento; se for passado algo dentro do parametro, o valor que está dentro do elemento é substituído pelo que está sendo colocado
}




function contadorDePalavrasECaracteres(){

	//Adicionando evento no elemento com a propriedade ON. 
	areaDigitacao.on("input", function(){

		var conteudo= areaDigitacao.val();
		var qtdPalavras= conteudo.split(/\S+/).length - 1;					//Esse valor dentro dos parenteses do split é uma expressão regular que substitui os espaço vazio que o professor não explicou bosta nenhuma, pois não faz parte do curso
		$(".palavras").text(qtdPalavras);

		var qtdCaracteres= conteudo.length;
		$(".caracteres").text(qtdCaracteres);
	});
}




function indicadorDeErroPelaBorda(){
	areaDigitacao.on("input", function(){
		var frase= $(".frase").text();
		var digitada= areaDigitacao.val();
		var palavraFrase= frase.substr(0, digitada.length);						//SUBSTR. Significa SUB-STRING e retorna a quantidade exata de strings do elemento que for passada nos paramêtros com inicio e fim. Como no nosso exemplo, o substr() busca do zero até o tamanho que for digitado no input.
		if(digitada==palavraFrase){
			areaDigitacao.removeClass("borda-vermelha");
			areaDigitacao.addClass("borda-verde");
		}else{
			areaDigitacao.addClass("borda-vermelha");
			areaDigitacao.removeClass("borda-verde");
		}
	});
}

function atualizaCronometro(tempo){

	segundos= tempo;
	$(".segundos").text(tempo);
}




function iniciaCronometro(){
	

	//chamando um evento uma única vez com o ONE. Ele funciona exatamente como o ON, porém uma única vez na página.
	areaDigitacao.one("focus", function(){
	
		var segundosRes= $(".segundos").text();	
		var setIp= setInterval(function(){

			var tempoRestante=segundosRes --;


			var contagemRegressiva= $(".segundos").text(tempoRestante);

			if(tempoRestante<1){

				$(".segundos").addClass("aumenta-fonte");

				areaDigitacao.attr("disabled", true);     			//ATTR(). attr() é uma propriedade que manipula os ATRIBUTOS do elemento
														  			//.removeAttr() é para excluir o atributo do elemento.
				$(".game-over").text("GAME OVER !");
				var reiniciar= $(".reiniciar");
				reiniciar.removeClass("invisivel");
				areaDigitacao.addClass("area-desativada");
				adicionaPontosNaTabela();							//areaDigitacao.css("background", "lightgray");		Podemos alterar o css de algum elemento através dessa propriedade e passar o que se quer alterar dentro dos parâmetros. Porém sabemos que isso não é uma boa prática. O mais indicado para esse caso seria adicionar uma classe com o .addclass();
				clearInterval(setIp); 
				//CLEARiNTERVAL. O clearInterval encerra o setInterval. Nos parâmetros é passado o ip do setInterval. Como o próprio setInterval retorna seu próprio ip, podemos guardá-lo numa variável e usá-la nos parâmetros do clear. 
			
			}
	},1000);


  });
	
};




function nomeDoJogador(){
	nomeJogador.focus();
	nomeJogador.on("input", function(){

		var digitado= nomeJogador.val();
		nomeJogador.text(digitado);
	});
}




function adicionaPontosNaTabela(){

	var corpoTabela=$("#corpo-tabela");
	var jogador= $(".nome-jogador").text();
	var numPalavras= $(".palavras").text();
	var linha= criaLinha(jogador, numPalavras);
	linha.find(".remover").click(removerPontos);
	corpoTabela.append(linha);
	placar.slideDown("fast");
	scrollPlacar();		
}




function scrollPlacar(){

	var posicaoPlacar= placar.offset().top;

	$("body, html").animate(
		{

			scrollTop: posicaoPlacar

		},1000);

	/*note que tive que aplicar a animação não só no body, 
	mas também no html. Isso porque o navegador Chrome não
	funcionava aplicando a animação no body, então apliquei 
	a animação no html também. É importante aplicar a animação
	também no body, pois os outros navegadores não funcionam 
	aplicando no html*/
}




//Criando elementos com jQuery
function criaLinha(jogador, numPalavras){

	var linha=$("<tr>");
	var nomeGamer= $("<td>").text(jogador);
	var numeroPalavras= $("<td>").text(numPalavras);
	var removendo= $("<td>");
	var link= $("<a>").addClass("remover").attr("href","#");
	var icone= $("<i>").addClass("small").addClass("material-icons").text("delete");
	
	link.append(icone);
	removendo.append(link);
	linha.append(nomeGamer);
	linha.append(numeroPalavras);
	linha.append(removendo);

	return linha;
}




$(".botao-salva-placar").click(function(){

	salvaPlacarEmArray();
});





function salvaPlacarEmArray(){

	var placar= [];
	var trPlacar= $("tbody>tr");

	trPlacar.each(function(){

		var usuario= $(this).find("td:nth-child(1)").text();   //nos parâmetros do método .find(), estamos buscando a filha td de número 1 que está dentro da tr da vez simbolizada por $(this)
		var pontos= $(this).find("td:nth-child(2)").text();

		var score={


		usuario: usuario,
		pontos: pontos

		};

		placar.push(score);

	});

	salvaPlacarNoServidor(placar);
}





function salvaPlacarNoServidor(placar){

	var dados= {placar:placar};

	$.post("http://localhost:3000/placar", dados, function(){

		$("#tooltip").tooltipster("open");
	
	}).fail(function(){

		$("#tooltip").tooltipster("open").tooltipster("content", "Algo deu errado !");

	}).always(function(){

		setTimeout(function(){

			$("#tooltip").tooltipster("close");

		},1500);
	});
};




function carregaPlacar(){

	$.get("http://localhost:3000/placar", function(retorno){

		$(retorno).each(function(){

			var criandoTd= criaLinha(this.usuario, this.pontos);
			criandoTd.find(".remover").click(removerPontos);
			$("tbody").append(criandoTd);
		});
	});
}




function tooltipster(){

	$("#tooltip").tooltipster({

		trigger:"custom"

		/*Essa configuração tira a execução padrão da exibição da mensagem, 
		permitindo exibir a mensagem da forma que o desenvolvedor quiser.
		  Note també que ele não leva uma FUNCTION nos parâmetros.*/
	});
}




function mostraPlacar(){

	$(".placar").stop().slideToggle(100);
	 scrollPlacar();
	
	//Sabemos que a propriedade "toggle" esconde e mostra um elemento. Com a função "slideToggle" o elemento aparece e some de forma mais lenta. Pode ser definido o tempo de retirada o apresentação nos parâmentros
}




function removerPontos(){
	event.preventDefault();
	$(this).parent().parent().remove();
	//Acessar o dono do evento pela propriedade THIS é importante nesses casos onde não há nome de uma variável. E para dar poderes de jQuery para um html, é necessário colocá-lo entre parenteses antes do dólar.
	//No jQuery, para chegar ao pai que se quer remover, basta ir adicionando a propriedade .parent() até chegar ao pai.
}




function reiniciaJogo(){
	placar.slideUp("slow");
	areaDigitacao.removeClass("area-desativada");    //ToggleClass. Notem que há a ação de adicionar a classe na função "iniciaCronometro" e a ação de remover a classe na função "reiniciaJogo". Isso é tão comum que há uma propriedade que já faz essa ação de "MOSTRAR e ESCONDER" um elemento. É o chamado .TOGGLECLASS. Basta adicionar essa propriedade nos elementos que deseja adicionar e remover a classe.
	areaDigitacao.removeClass("borda-verde");
	areaDigitacao.removeClass("borda-vermelha");
	areaDigitacao.attr("disabled", false);
	areaDigitacao.val("");	
	nomeJogador.val("").focus();
	$(".reiniciar").addClass("invisivel");
	$(".palavras").text("0");
	$(".caracteres").text("0");
	$(".segundos").text(segundos);
	$(".segundos").removeClass("aumenta-fonte");
	$(".game-over").text(" ");
	$(".campo-busca-frase").val("");
	
	iniciaCronometro();
}


