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
        createMensage($("#mensagem").text(), "CPF OU CNPJ Inválidos",returnErrorMessage());

    }

});
//valida o formulario da empresa
$("#form-company-post").submit(function (event) {
    
    if (!validation.validarCNPJ($("#cnpj").val())) {
        event.preventDefault();
        $("#cnpj").focus();
        createMensage($("#mensagem").text(), "CNPJ Inválido",returnErrorMessage());
    }

});

function returnErrorMessage(){
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
function createMensage(mensage, text,classMessage) {
    if (mensage.length == 30 || mensage.length == 0) {
        $("#mensagem").attr("class",classMessage).append(text);
        $("#close").append("x");
    }
}


$("#findAllCompanyTable").click(function(){
    try{
    $("#table-company").empty();    
    
    $.getJSON('/fornecedor-empresa/find-all-company', function (data) {
        var tbl = $("<table class='table' />").attr("id", "table");
        var thead = `
        <caption>Relatório de Empresas</caption>
        <thead> 
        <tr>
        <td>Nome Fantasia</td>
        <td>CNPJ</td>
        <td>UF</td>
        <td>Fornecedores</td>
        </tr>
        </thead>`
        $("#table-company").append(tbl);
        $("#table").append(thead);
        let tbody = '<tbody>';
        $("#table").append(tbody);
        for (var i = 0; i < data.length; i++) {
            var td = `<tr>
            <td>${data[i]['name']}</td>
            <td>${data[i]['cnpj']}</td>
            <td>${data[i]['uf']}</td>
            <td><a onclick="findAllProvidersTable('${data[i]['id_company']}')">Relatório</a></td>
            </tr>`;
            $("#table").append(td)
        }
        tbody = '</tbody>';
        $("#table").append(tbody);

    });
}catch(err){
    console.log(err);
}
});


function findAllProvidersTable(id){
    try{
    $("#table-company").empty();    
    $.getJSON('/fornecedor-empresa/find-providers/'+id, function(data) {
        console.log(data[0]);
        if (typeof data[0][0] === "undefined") {
            createMensage($("#mensagem").text(), "Nenhum fornecedor foi encontrado","alert alert-warning");
        }else{
        var tbl = $("<table class='table thead-light' />").attr("id", "table");
        var thead = `
        <caption>Fornecedores da empresa ${data[1][0]['name']}</caption>
        <thead> 
        <tr>
        <td>Nome do Fornecedor</td>
        <td>CNPJ/CPF</td>
        <td>DATA DO REGISTRO</td>
        <td>Consultar contatos</td>
        </tr>
        </thead>`
        $("#table-company").append(tbl);
        $("#table").append(thead);
        $("#table").append("<tbody>");
        for (var i = 0; i < data[0].length; i++) {
            var td = `<tr>
            <td>${data[0][i]['name']}</td>
            <td>${data[0][i]['cpf_cnpj']}</td>
            <td>${data[0][i]['date_register']}</td>
            <td ><button type="button" onclick="findPhones(${data[0][i]['id_provider']})" class="btn btn-default" data-toggle="modal" 
            data-target="#modalPhone">
            Contato
          </button>
          </td>
            </tr>`;
            $("#table").append(td)
        }
        tbody = '</tbody>';
        $("#table").append(tbody);
    }
    });
}catch(err){
    console.log(err);
}
};

function findPhones(id){
    $.getJSON('/fornecedor-empresa/find-phones/'+id, function(data) {
        $(".modal-body").empty();
        let output = '';
        if(Object.keys(data).length === 0){
            output = "<p>Nenhum contato foi encontrado</p>"
            $(".modal-body").append(output);
        }else{
        
        for (var i = 0; i < data.length; i++) {
            output = `
            <p>Contato ${i+1}: ${data[i]['number']} </p>
            `
           $(".modal-body").append(output);
        }
    }
    });

};

function inputPhonecreate(){
  let input = '<input type="text" name="phones[]" class="form-control" placeholder="Telefone"/>';  
 $("#phonesInput").append(input);   
 

}