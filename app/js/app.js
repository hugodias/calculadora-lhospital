var theForm = document.getElementById( 'theForm' );

function calculate(numerador, denominador, x_val) {
  var num_derivada = nerdamer('diff('+numerador+')');
  var den_derivada = nerdamer('diff('+denominador+')');

  var num_derivada_resolvido = num_derivada.evaluate({x: x_val}).text();
  var den_derivada_resolvido = den_derivada.evaluate({x: x_val}).text();

  if(num_derivada_resolvido === 0 && den_derivada_resolvido === 0) {
    return calculate(num_derivada.text(), den_derivada.text(), x_val);
  } else {
    return {
      numerador: num_derivada_resolvido,
      denominador: den_derivada_resolvido,
      resultado: nerdamer(num_derivada_resolvido + '/' + den_derivada_resolvido).evaluate().text()
    };
  }
}


new stepsForm( theForm, {
  onSubmit : function( form ) {
    // let's just simulate something...
    var messageEl = theForm.querySelector( '.final-message' );

    // hide form
    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

    var data = $('#theForm').serializeArray();

    var valor_x = data[2].value;

    // 20-(x^2)+2x^3
    var numerador = nerdamer(data[0].value).evaluate({x: valor_x});

    // -x^4+2x+20
    var denominador = nerdamer(data[1].value).evaluate({x: valor_x});

    // Verifica se ambos numerador e denominador sao iguals a 0
    if(parseInt(numerador.text()) === 0 && parseInt(denominador.text()) === 0){
      var resultado = calculate(data[0].value, data[1].value, data[2].value);

      var r = '';
      r += 'Problema RESOLVIDO!<br/>';
      r += 'Deriavada do numerador: ' + resultado.numerador + '<br/>';
      r += 'Deriavada do denominador: ' + resultado.denominador + '<br/>';
      r += 'Resultado final: ' + resultado.resultado;

      messageEl.innerHTML = r;
    } else {
      // Nao e uma expressao valida para resolver com lhospital
      messageEl.innerHTML = 'Esta expressão nao resultou em 0/0 e não pode ser resolvida por lhospital.';
    }

    classie.addClass( messageEl, 'show' );

  }
} );
