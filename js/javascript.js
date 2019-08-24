let list = {};
let numGlobal = 0;
let validation = new Validation();
//padrão de letras maiusculas
function maiuscula(z) {
    v = z.value.toUpperCase();
    z.value = v;
}

//adicionar placeholder ao input cpf/cnpj

$("#selectP").change(function() {
    numGlobal = $("#selectP").val();
    $("#cpfCnpj").attr("placeholder",cpfOrCnpj());
  });

//retorna o value para o input cpf
function cpfOrCnpj() {
    let name = '';
    if (numGlobal == 1) {
        name = 'CPF';
        $("#dateControll").attr("required", "required");
    } else {
        name = 'CNPJ';
        $("#dateControll").removeAttr("required");
    }


    return name;

}

//valida o formulario de fornecedor
$("#provider-form").submit(function (event) {
    console.log(numGlobal);
    if (numGlobal !== 2) {
        let yearsOld = calcYears($("#dateControll").val());
        for (var i = 0; i < list.length; i++) {
            if ((list[i]['id_company'] == $("#datalist").val()) && (yearsOld < 18) && list[i]['uf'] === 'PR') {
                createMensage($("#mensagem").text(), "No estado do Paraná não se aceita menores de 18 anos");
                event.preventDefault();

            }

        }

    }
    var cpfCnpj = $("#cpfCnpj").val();
    if (validation.valCpf(cpfCnpj) === validation.validarCNPJ(cpfCnpj)) {
        event.preventDefault();
        $("#cpfCnpj").focus();
        createMensage($("#mensagem").text(), "CPF OU CNPJ Inválidos");

    }

});
//valida o formulario da empresa
$("#form-company").submit(function (event) {
    if (!validation.validarCNPJ(cpfCnpj)) {
        event.preventDefault();
        $("#cnpj").focus();
        createMensage($("#mensagem").text(), "CNPJ Inválido");
    }

});


// request get retorna todas as entidades (company) no banco de dados
function findAllCompany() {
    closeMessage();

    $.getJSON('/fornecedor-empresa/find-all-company', function (data) {
        list = data;
        $("#datalist-company").empty();
        var label = `<label>Escolha uma Empresa Cadastrada</label> `;
        $("#datalist-company").append(label);

        var tbl = $("<select class='form-control' name='companyID' />").attr("id", "datalist");

        $("#datalist-company").append(tbl);
        for (var i = 0; i < data.length; i++) {
            var td1 = "<option value='" + data[i]['id_company'] + "'>" + data[i]["name"] + "</option>";

            "</a>" + "</td></tr>";
            $("#datalist").append(td1);
        }
        $("#showFormProvider").hide();
        $("#form-company").hide();
        $("#form-provider").show();
        $("#showFormCompany").show();
    });

}

//calcula a idade através da data de nascimento
function calcYears(data) {
    var year = data.substring(0, 4);
    var month = data.substring(6, 7);
    var day = data.substring(9, 10);

    var d = new Date,
        currentYear = d.getFullYear(),
        currentMonth = d.getMonth() + 1,
        currentDay = d.getDate();

    yearsOld = currentYear - year;

    if (currentMonth < month || currentMonth == month && currentDay < day) {
        yearsOld--;
    }

    return yearsOld < 0 ? 0 : yearsOld;

}
// gerencia menus ocultos
$("#showFormCompany").click(function () {
    $("#showFormProvider").show();
    $("#form-company").show();
    $("#form-provider").hide();
    $("#showFormCompany").hide();
    closeMessage();
});

//fecha a mensagem de erro e adiciona o botao
function closeMessage() {
    $("#mensagem").empty().removeAttr("class");
    $("#close").empty();
    createButtonMensage();
}

//adiciona o botao para fechar a mensagem
function createButtonMensage() {
    let button = `<button class="close" onclick="closeMessage();" id="close"></button>`;
    $("#mensagem").append(button);
}

//cria a mensagem de feedback
function createMensage(mensage, text) {
    if (mensage.length == 30 || mensage.length == 0) {
        $("#mensagem").attr("class", "alert alert-danger").append(text);
        $("#close").append("x");
    }
}
