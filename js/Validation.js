class Validation {
 //valida cpf
//creditos:https://forum.imasters.com.br/topic/495335-validar-cpf-com-jquery/
 valCpf($cpf) {
    if ($cpf == '') return false;
    $digitoA = 0;
    $digitoB = 0;
    for ($i = 0, $x = 10; $i <= 8; $i++ , $x--) {
        $digitoA += $cpf[$i] * $x;
    }
    for ($i = 0, $x = 11; $i <= 9; $i++ , $x--) {

        $digitoB += $cpf[$i] * $x;
    }
    $somaA = (($digitoA % 11) < 2) ? 0 : 11 - ($digitoA % 11);
    $somaB = (($digitoB % 11) < 2) ? 0 : 11 - ($digitoB % 11);
    if ($somaA != $cpf[9] || $somaB != $cpf[10]) {
        return false;
    } else {
        return true;
    }
}
//valida cnpj
//creditos :http://www.gerardocumentos.com.br/?pg=gerador-de-cnpj
 validarCNPJ(cnpj){
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
          return false;
    for (i = 0; i < cnpj.length - 1; i++)
          if (cnpj.charAt(i) != cnpj.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          tamanho = cnpj.length - 2
          numeros = cnpj.substring(0,tamanho);
          digitos = cnpj.substring(tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--)
                {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                      pos = 9;
                }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          tamanho = tamanho + 1;
          numeros = cnpj.substring(0,tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--)
                {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                      pos = 9;
                }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
          return false;
          

} 
}