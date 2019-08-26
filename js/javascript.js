let list = {};
let numGlobal = 0;
let validation = new Validation();
let tables = new Tables();

//padrão de letras maiusculas
function upperCase(z) {
    v = z.value.toUpperCase();
    z.value = v;
}

//adicionar placeholder ao input cpf/cnpj

$("#selectP").change(function () {
    numGlobal = $("#selectP").val();
    cpfOrCnpj();
});

//retorna o value para o input cpf
function cpfOrCnpj() {
    let name = '';
    if (numGlobal == 1) {
        let inputRg = `<br/><input name="rg" required="required" id="rg" placeholder="RG" type="text" class="form-control"/><br/>`
        let inputBirth = `<label> Data de Nascimento</label><input class="form-control" id="dateControll" required="required" type="date" name="birth" /><br />`
        $("#form").append(inputRg);
        $("#form").append(inputBirth);
        name = 'CPF';
        $("#dateControll").attr("required", "required");
        $("#cpfCnpj").attr("class", "cpf form-control").attr("placeholder", name);
    } else {
        name = 'CNPJ';
        $("#dateControll").removeAttr("required");
        $("#cpfCnpj").attr("class", "cnpj form-control").attr("placeholder", name);
        $("#form").empty();

    }

    mask();
}

//valida o formulario de fornecedor
$("#provider-form").submit(function (event) {
    console.log(numGlobal);
    if (numGlobal !== 2) {
        let yearsOld = calcYears($("#dateControll").val());
        for (var i = 0; i < list.length; i++) {
            if ((list[i]['id_company'] == $("#datalist").val()) && (yearsOld < 18) && list[i]['uf'] === 'PR') {
                closeMessage();
                createMensage($("#mensagem").text(), "No estado do Paraná não se aceita menores de 18 anos");
                event.preventDefault();

            }

        }

    }
    var cpfCnpj = $("#cpfCnpj").val();
    if (validation.valCpf(cpfCnpj) === validation.validarCNPJ(cpfCnpj)) {
        event.preventDefault();
        $("#cpfCnpj").focus();
        closeMessage();
        createMensage($("#mensagem").text(), "CPF OU CNPJ Inválidos", returnErrorMessage());

    }

});
//valida o formulario da empresa
$("#form-company-post").submit(function (event) {
    if (!validation.validarCNPJ($("#cnpj").val())) {
        event.preventDefault();
        $("#cnpj").focus();
        closeMessage();
        createMensage($("#mensagem").text(), "CNPJ Inválido", returnErrorMessage());
    }

});
//retorna mensagem de erro
function returnErrorMessage() {
    return "alert alert-danger";
}

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
function showInitial() {
    $("#showHome").attr("class", "active");
    $("#hideMenu1").removeAttr("class");
    $("#home").attr("class", "tab-pane fade active in");
}

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
function createMensage(mensage, text, classMessage) {
    if (mensage.length == 30 || mensage.length == 0) {
        $("#mensagem").attr("class", classMessage).append(text);
        $("#close").append("x");
    }
}

//cria a tabela de empresas cadastradas
$("#findAllCompanyTable").click(function () {
    try {
        $("#table-company").empty();

        $.getJSON('/fornecedor-empresa/find-all-company', function (data) {
            if (data[0] === null) {
                closeMessage();
                createMensage($("#mensagem").text(), "Nenhuma empresa foi encontrada", "alert alert-warning");
                showInitial();
            } else {
                tables.createCompanyTable(data);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

//cria a tabela de fornecedores cadastrados
function findAllProvidersTable(id) {
    $("#table-company").empty();
    $.getJSON('/fornecedor-empresa/find-providers/' + id, function (data) {
        if (data[0] === null) {
            closeMessage();
            showInitial();
            createMensage($("#mensagem").text(), "Nenhum fornecedor foi encontrado", "alert alert-warning");
        } else {
            tables.createProvidersTable(data);
        }
    });
}
//busca os telefones dos fornecedores
function findPhones(id) {
    $.getJSON('/fornecedor-empresa/find-phones/' + id, function (data) {
        $(".modal-body").empty();
        let output = '';
        if (Object.keys(data).length === 0) {
            output = "<p>Nenhum contato foi encontrado</p>"
            $(".modal-body").append(output);
        } else {

            for (var i = 0; i < data.length; i++) {
                output = `
            <p>Contato ${i + 1}: ${data[i]['number']} </p>
            `
                $(".modal-body").append(output);
            }
        }
    });

};

//cria inputs para o telefone
function inputPhonecreate() {
    let input = '<input type="text" id="phone" name="phones[]" class="form-control" placeholder="Telefone"/>';
    $("#phonesInput").append(input);

}

//adiciona mascara

$(document).ready(function () {
    mask();
});

//adiciona mascara
function mask() {
    try {
        $(".cnpj").mask("99.999.999/9999-99");
        $('.cpf').mask('000.000.000-00', { reverse: true });
        $('#phone').mask('(00)0000-0000');
    } catch (err) {

    }

}

$("#searchValue").change(function () {
    let search = $("#searchValue").val();
    $("#search").attr("type","text").val("");
    
    switch(search) {
        case '1':
            $("#search").attr("name", "name");
            break;
        case '2':
            $("#search").attr("name", "cpfCnpj");
            break;
        case '3':
            $("#search").attr("name", "dateRegister").attr("type", "date");
            break;
        default:
            break;

    }

   
});
// busca com paramentro
function searchTable(){
    $("#table-company").empty();
    let value = $("#search").val();
    let searchValue = $("#searchValue").val();
    $.getJSON('/fornecedor-empresa/find-provider-param/'+searchValue+'/'+value, function (data) {
        console.log(data);
        if (data === null) {
            closeMessage();
            showInitial();
            createMensage($("#mensagem").text(), "Nenhum fornecedor foi encontrado", "alert alert-warning");
        } else {
            tables.createProvidersTable(data);
        }

    });   
}