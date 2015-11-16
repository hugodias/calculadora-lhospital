var theForm = document.getElementById( 'theForm' );

/**
* Verifica se o numerador e o denominador sao iguals a 0
*/
function lhopitalValida(numerador, denominador){
  return (parseInt(numerador) === 0 && parseInt(denominador) === 0);
}

/**
* Faz a derivada de uma expressao
*/
function derivada(expressao){
  return nerdamer('diff('+expressao+')');
}

/**
* Deriva uma expressao e Substitui o X pelo valor
* informado
*/
function derivaESubstitui(expressao, x_val) {
  return derivada(expressao).evaluate({x: x_val}).text();
}


function calcular(numerador, denominador, x_val) {
  var Numerador_derivado = derivaESubstitui(numerador, x_val);
  var Denominador_derivado = derivaESubstitui(denominador, x_val);

  if(lhopitalValida(Numerador_derivado, Denominador_derivado)){

    alert('Este exemplo so calcula L\'\Hôpital 1x. Ainda não e possivel fazer derivadas sucessivas');

  } else {
    // Retorna o resultado encontrado
    return {
      x: x_val,
      // Informacoes do numerador
      numerador: numerador,
      numerador_derivada: derivada(numerador).text(),
      numerador_resolvido: Numerador_derivado,
      // Informacoes do denominador
      denominador: denominador,
      denominador_derivada: derivada(denominador).text(),
      denominador_resolvido: Denominador_derivado,
      // Resultado
      resultado: nerdamer(Numerador_derivado + '/' + Denominador_derivado).evaluate().text()
    };
  }
}


new stepsForm( theForm, {
  onSubmit : function( form ) {
    var template = $('#resultado').html();
    var messageEl = theForm.querySelector( '.final-message' );
    var data = $('#theForm').serializeArray();
    var valor_x = data[2].value;
    var numerador = nerdamer(data[0].value).evaluate({x: valor_x});
    var denominador = nerdamer(data[1].value).evaluate({x: valor_x});

    Mustache.parse(template);

    // Esconde o formulario
    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

    // Verifica se ambos numerador e denominador sao iguals a 0
    if(lhopitalValida(numerador.text(), denominador.text())){
      var rendered = Mustache.render(template,calcular(data[0].value, data[1].value, data[2].value));

      $('.final-message').html(rendered);
    } else {
      // Nao e uma expressao valida para resolver com L'Hôpital
      messageEl.innerHTML = 'Esta expressão nao resultou em 0/0 e não pode ser resolvida por L\'\hôpital.';
    }
    // Mostra a caixa de resultado
    classie.addClass( messageEl, 'show' );

  }
} );
