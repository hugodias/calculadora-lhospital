var theForm = document.getElementById( 'theForm' );

function parseExpression() {

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
    var nominador = nerdamer(data[0].value).evaluate({x: valor_x});

    // -x^4+2x+20
    var denominador = nerdamer(data[1].value).evaluate({x: valor_x});


    // Verifica se ambos nominador e denominador sao iguals a 0
    if(parseInt(nominador.text()) === 0 && parseInt(denominador.text()) === 0){

      var nom_derivada = nerdamer('diff('+data[0].value+')');
      var den_derivada = nerdamer('diff('+data[1].value+')');

      var nom_derivada_resolvido = nom_derivada.evaluate({x: valor_x}).text();
      var den_derivada_resolvido = den_derivada.evaluate({x: valor_x}).text();

      var r = '';
      r += 'Problema RESOLVIDO!<br/>';
      r += 'Deriavada do denominador: ' + nom_derivada_resolvido + '<br/>';
      r += 'Deriavada do nominador: ' + den_derivada_resolvido + '<br/>';
      r += 'Resultado final: ' + nerdamer(nom_derivada_resolvido + '/' + den_derivada_resolvido).evaluate().text();

      messageEl.innerHTML = r;
    } else {
      // Nao e uma expressao valida para resolver com lhospital
      messageEl.innerHTML = 'Esta expressão nao resultou em 0/0 e não pode ser resolvida por lhospital.';
    }

    classie.addClass( messageEl, 'show' );

  }
} );
