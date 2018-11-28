const blibliografiaService = require('./bibliografias');

const formatarNomeEditor = blibliografiaService.formatarNomeEditor;
const lerNomes = blibliografiaService.lerNomes;
const formatarListaNomes = blibliografiaService.formatarListaNomes;
const executaRegraSeparacaoNomes = blibliografiaService.executaRegraSeparacaoNomes;

const listaDeNomes = [
    "José Pereira da Silva",
    "Mario Quintada das Quantas Filho",
    "Maria Jose",
    "Aderbal"
];

test('Formata com um nome simples.', () => {
    var nome = formatarNomeEditor('sIlva');
    expect(nome).toBe('SILVA');
});

test('Formata com dois nomes simples.', () => {
    var nome = formatarNomeEditor('joSelitO Silva');
    expect(nome).toBe('SILVA, Joselito');
});

test('Formata com tres nomes simples.', () => {
    var nome = formatarNomeEditor('joSelitO hEnRiquE Silva');
    expect(nome).toBe('SILVA, Joselito Henrique');
});

test('Formata com tres nomes simples, com uma particula monossilabica (da).', () => {
    var nome = formatarNomeEditor('joSelitO dA Silva');
    expect(nome).toBe('SILVA, Joselito da');
});

test('Formata com tres nomes simples, com uma particula monossilabica (das).', () => {
    var nome = formatarNomeEditor('mAriaNo das quanTas');
    expect(nome).toBe('QUANTAS, Mariano das');
});

test('Formata com tres nomes simples, com um nome próprio monossilabico.', () => {
    var nome = formatarNomeEditor('kUng lau di laUra DOs santos');
    expect(nome).toBe('SANTOS, Kung Lau Di Laura dos');
});

test('Separação - Tres nomes particula monossilabica.', () => {
    var entrada = "José PEreira da Silva";
    var segundaParteDeveSer = [ "josé", "pereira", "da" ];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Separação - Nome simples com preposição inválida.', () => {
    var entrada = "José da Silva";
    var segundaParteDeveSer = ["josé", "da"];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Separação - Apenas um nome.', () => {
    var entrada = "siLvA";

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe("");
});

test('Separação - Dois nomes simples.', () => {
    var entrada = "joSelitO Silva";
    var segundaParteDeveSer = ["joselito"];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Separação - Tres nomes simples.', () => {
    var entrada = "joSelitO menendeZ Silva";
    var segundaParteDeveSer = ["joselito", "menendez"];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Separação - Tres nomes, sendo uma particula monossilabica.', () => {
    var entrada = "joSelitO dA Silva";
    var segundaParteDeveSer = ["joselito", "da"];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Separação - Tres nomes com NETO.', () => {
    var entrada = "joSelitO Silva NEto";
    var segundaParteDeveSer = ["joselito"];

    var resultado = executaRegraSeparacaoNomes(entrada);

    expect(typeof(resultado.primeiraParte)).toBe("string");
    expect(typeof(resultado.segundaParte)).toBe("object");
    
    expect(resultado.primeiraParte).toBe("silva neto");
    expect(resultado.segundaParte.toString()).toBe(segundaParteDeveSer.toString());
});

test('Lê apenas a quantidade de nomes desejada.', () => {
    var editores = lerNomes(3, listaDeNomes);
    expect(3).toBe(editores.length);
});

test('Imprime nomes de acordo com a quantidade informada.', () => {
    var listaParam = [
        "José Pereira da Silva",
        "Mario Quintada das Quantas Filho",
        "Maria Jose",
        "Aderbal"
    ];

    var editores = formatarListaNomes(3, listaParam);
    expect(3).toBe(editores.length);
    expect(editores[0]).toBe(listaParam[0]);
    expect(editores[1]).toBe(listaParam[1]);
    expect(editores[2]).toBe(listaParam[2]);
});
