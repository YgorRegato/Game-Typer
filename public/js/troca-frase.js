var botaoTrocaFrase= $(".troca-frase");
var botaoBusca=$(".botao-busca-frase").click(ativaEdesativaCampo);
var campoBusca=$(".campo-busca-frase");




//Frase aleatória

botaoTrocaFrase.click(trocaFrase);

function trocaFrase(){

	$(".imagem-carregamento").toggle();
	 	

	$.get("http://localhost:3000/frases", sorteiaFrase)

	.fail(function(){
		
		
		$(".erro-servidor").show();
		

		setTimeout(function(){

			$(".erro-servidor").hide();

		},2000);
		
	}).always(function(){
		$(".imagem-carregamento").toggle();
	});
}


function sorteiaFrase(data){

	var frase= $(".frase");
	var numeroAleatorio= Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);

	var tempo= (data[numeroAleatorio].tempo);
	atualizaCronometro(tempo);
	contaNumeroDePalavrasDaFrase();
	indicadorDeErroPelaBorda();
		
}


//Buscando frase específica

function ativaEdesativaCampo(){

	$(".campo-busca-frase").toggle();
}


campoBusca.on("keypress", function(){

	var keycode = (event.keyCode ? event.keyCode : event.which);
	
	if(keycode==13){
	
		var valorBusca= campoBusca.val();
		
		if(valorBusca>=1 && valorBusca<=10){

			var dados= {id: valorBusca - 1}

			$(".imagem-carregamento").toggle();

			$.get("http://localhost:3000/frases",dados, buscaPalavraEscolhida)

			.fail(function(){

				$(".erro-servidor").show();
				

				setTimeout(function(){

					$(".erro-servidor").hide();

				},2000);

			}).always(function(){

				$(".imagem-carregamento").toggle();
				campoBusca.val("");
				campoBusca.hide();

			});

		} if(valorBusca<=0 || valorBusca>10){

				
				$("#erro-busca-frase").toggle();

				setTimeout(function(){

					$("#erro-busca-frase").toggle();
					
				},3000);

				
			}

	}
});
		


function buscaPalavraEscolhida(retorno){

	var palavraEscolhida= retorno.texto;
	var tempo= retorno.tempo;
	$(".frase").text(palavraEscolhida);
	atualizaCronometro(tempo);
	contaNumeroDePalavrasDaFrase();
	indicadorDeErroPelaBorda();
}	


