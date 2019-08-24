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
//creditos :https://www.geradorcnpj.com/javascript-validar-cnpj.htm
 validarCNPJ(cnpj) {


    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

}