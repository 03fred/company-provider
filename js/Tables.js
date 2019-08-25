class Tables{

    createProvidersTable(data){
        
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
        let tbody = '</tbody>';
        $("#table").append(tbody);
    
    }

    createCompanyTable(data){

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

    }
}