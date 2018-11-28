var particulasMonossilabicas = [ "da", "de", "do", "das", "dos" ]
var sobrenomesCompostos =  [ "FILHO", "FILHA", "NETO", "NETA", "SOBRINHO", "SOBRINHA", "JUNIOR" ]

function formataPrimeiraParte(primeiraParte) {
    return primeiraParte.toUpperCase();
}

function formataDemaisNomes(segundaParte) {
    if (segundaParte.length > 1) {
        var resultado = "";
        for(i = 0; i < segundaParte.length; i++) {
            if (resultado.length > 0) {
                resultado += " ";
            }
            var nome = segundaParte[i];

            // Algumas particulas monossilabicas devem continuar inalteradas..
            resultado += isParticulaMonossilabica(nome) ? nome : primeiraLetraMaiusculaDemaisMinusculas(nome);
        }
        return resultado;
    } else {
        // Primeira letra maiuscula, demais minusculas
        return primeiraLetraMaiusculaDemaisMinusculas(segundaParte[0]);
    }
}

function isParticulaMonossilabica(nome) {
    return particulasMonossilabicas.indexOf(nome) != -1;
}

function isSobrenomeComposto(nomeEditor) {
    return nomeEditor.length > 2 && sobrenomesCompostos.indexOf(nomeEditor[nomeEditor.length - 1].toUpperCase()) != -1;
}

function primeiraLetraMaiusculaDemaisMinusculas(valor) {
    return valor.substring(0, 1).toUpperCase() + valor.substring(1);
}

function executaRegraSeparacaoNomes(nomeEditor) {
    // Todas as funcoes irão lidar com minusculas.
    nomeEditor = nomeEditor.toLowerCase().split(" ");

    var partes = {
        primeiraParte : "", // String
        segundaParte : []   // Array
    }

    if (nomeEditor.length > 1) {
        // Verifica se ultima parte deve ser composta.
        if (isSobrenomeComposto(nomeEditor)) {
            
            // Requisito Implicito, particula Monossilabica nao pode fazer parte da primeira parte.
            if (!isParticulaMonossilabica(nomeEditor[nomeEditor.length - 2])) {
                // Concatena os dois ultimos nomes na primeira parte.
                partes.primeiraParte = nomeEditor.slice(nomeEditor.length - 2, nomeEditor.length).join().replace(",", " ")
                // A segunda parte recebe os demais nomes.
                partes.segundaParte = nomeEditor.slice(0, nomeEditor.length - 2);

                // 1° Primeira parte é um sobrenome composto, segunda parte são nomes simples.
                return partes;
            }
        }

        partes.primeiraParte = nomeEditor[nomeEditor.length - 1];
        partes.segundaParte = nomeEditor.slice(0, nomeEditor.length - 1);
        // 2° - Primeiro e demais nomes são simples.
        return partes;
    } else {
        partes.primeiraParte = nomeEditor[0];
        // 3° - Apenas um nome
        return partes;
    }
}

 function formatarNomeEditor(nomeEditor) {
    if (typeof(nomeEditor) != "string" || nomeEditor.length == 0) {
        throw Error("O nome é uma informação obrigatória.");
    }

    var partes = executaRegraSeparacaoNomes(nomeEditor);
    if (partes.segundaParte.length > 0) {
        return formataPrimeiraParte(partes.primeiraParte) + ", " + formataDemaisNomes(partes.segundaParte)
    } else {
        return formataPrimeiraParte(partes.primeiraParte);
    }
}

function lerNomes(qtdNomes, nomes) {
    if (isNaN(qtdNomes) || qtdNomes < 1) {
        throw Error("Qtd de nomes deve ser um número válido!");
    }
    if (!nomes) {
        throw Error("O parâmetro 'nomes' está em um formato inválido!");
    }

    var editores = [];
    var count = 0;
    do {
        if (!nomes[count]) {
            throw Error("Necessário informar ao menos " + qtdNomes + " nomes, foram informados apenas " + nomes.length);
        }
        var novoNome = nomes[count];//prompt("Por favor, informe um nome de autor [" + count + " de " + qtdNomes + "].");
        editores.push(novoNome);
        count++;
    } while(count < qtdNomes);
    return editores;
}

function formatarListaNomes(qtdNomes, nomes) {
    const _this = require('./bibliografias');

    var editores = _this.lerNomes(qtdNomes, nomes);
    editores.forEach(function (nomeEditor) {
        console.log(_this.formatarNomeEditor(nomeEditor));
    });
    return editores;
}

module.exports = {
    executaRegraSeparacaoNomes : executaRegraSeparacaoNomes,
    formatarNomeEditor : formatarNomeEditor,
    lerNomes : lerNomes,
    formatarListaNomes : formatarListaNomes
}