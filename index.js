let http = require('http');

const PORT = process.env.PORT || 5000

const blibliografiaService = require('./bibliografias');
const formatarListaNomes = blibliografiaService.formatarListaNomes;
 
let handleRequest = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    if(req.url == "/"){
        res.write("<h1>Bem vindo ao Node JS !</h1>");
        res.write("<br>");
        res.write("<a href='./bibliografias'>Testar Feature: Bibliografias</a>");
    } else if(req.url == "/bibliografias") {
        res.write("<h1>Bibliografias</h1>");

        var listaParam = [
            "josé PeReiRA da SilVA",
            "maRio QuintaDa dAs QuanTas FilhO",
            "Marina da neTo",
            "pedro filho",
            "MarIA JoSe",
            "aderbal",
            "Abū al-Qāsim Muḥammad ibn ʿAbd Allāh ibn ʿAbd al-Muṭṭalib ibn Hāshim"
        ];
        res.write("<br>");
        res.write("Inputs: ");
        res.write("<br>");
        listaParam.forEach(function (nomeEditor) {
            res.write("Nome: " + nomeEditor);
            res.write("<br>");
        });
        res.write("<br>");
        res.write("<br>");
        res.write("Resultados: ");
        res.write("<br>");
        var editores = formatarListaNomes(5, listaParam);

        editores.forEach(function (nomeEditorFormatado) {
            res.write("Nome: " + nomeEditorFormatado);
            res.write("<br>");
        });

        res.write("<br>");
        res.write("<br>");
        res.write("<a href='./'>Voltar para Pagina Inicial</a>");
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<h1>Página não encontrada</h1>");
    }

    res.end();
};
 
http.createServer(handleRequest).listen(PORT);