var quiz = {
    questions: [
        {t:'liberalism', q:'O declínio da família tradicional tem causado mais mal do que bem', y:-1},
        {t:'liberalism', q:'A decadência moral de nossa sociedade é uma ameaça à nossa civilização', y:-1},
        {t:'authoritarianism', q:'Propaganda terrorista, incitação à violência ou outros tipos de discurso de ódio <b>não</b> devem ser protegidos pela liberdade de expressão', y:1},
        {t:'authoritarianism', q:'As pessoas devem ter permissão para ter armas pesadas para se defender do governo', y:-1},
        {t:'liberalism', q:'Eutanásia, aborto e suicídio devem ser legalizados', y:1},
        {t:'liberalism', q:'Drogas pesadas (ex: cocaína, heroína), devem ser legalizadas', y:1},
        {t:'collectivism', q:'O governo sempre tem o direito de impor taxas às pessoas', y:1},
        {t:'authoritarianism', q:'O governo sempre tem o direito de ditar o que as pessoas podem e o que não podem fazer', y:1},
        {t:'authoritarianism', q:'Independentemente de você concordar com guerras ou não, é seu dever apoiar as forças armadas', y:1}, 
        {t:'liberalism', q:'Multiculturalismo, pluralismo religioso e diversidade são coisas que devemos almejar como sociedade', y:1},
        {t:'liberalism', q:'Nossas leis devem ser baseadas em crenças religiosas e valores como os 10 mandamentos', y:-1},
        {t:'collectivism', q:'Empresas privadas seriam melhores prestadores de serviços do que órgãos do governo', y:-1},
        {t:'authoritarianism', q:'Interferência governamental faz mais mal do que bem', y:-1},
        {t:'authoritarianism', q:'Quanto menor o governo, melhor', y:-1},
        {t:'collectivism', q:'Programas assistenciais e similares são um desperdício de dinheiro', y:-1},
        {t:'collectivism', q:'A cultura de dependência governamental tem criado uma classe inteira de desocupados', y:-1},
        {t:'collectivism', q:'Uma sociedade é julgada pela forma como trata seus cidadãos mais vulneráveis', y:1},
        {t:'collectivism', q:'Desigualdade de renda prejudica nossa sociedade', y:1},
        {t:'internationalism', q:'Nossa nação deve acabar com toda a ajuda estrangeira e utilizar esse dinheiro em outras coisas', y:-1},
        {t:'internationalism', q:'Nossa nação <b>nunca</b> deve intervir em guerras civis ou rebeliões. Deixe que cuidem de seus próprios problemas', y:-1},
        {t:'internationalism', q:'Ideologias perigosas que ameaçam nossa nação e nossos valores devem ser combatidos em todo o mundo, não apenas em casa', y:1},
        {t:'internationalism', q:'A Organização das Nações Unidas é uma organização completamente inútil e não vale a pena ser um membro', y:-1},
        {t:'internationalism', q:'Nosso país <b>nunca</b> deve participar de uma moeda única, como o Euro', y:-1},
        {t:'internationalism', q:'Deve haver um único governo mundial', y:1},
        {t:'tribalism', q:'Meu país é inerentemente melhor que outros países', y:1},
        {t:'tribalism', q:'Devemos eliminar nossos inimigos. É uma perda de tempo tentar lidar com eles', y:1},
        {t:'tribalism', q:'Discriminação racial <b>nunca</b> é uma tática legítima de aplicação da lei', y:-1},
        {t:'tribalism', q:'Algumas nações são pobres por causa de sua cultura ou valores', y:1},
        {t:'tribalism', q:'Imigração, de forma geral, tem efeitos positivos em minha nação', y:-1},
        {t:'tribalism', q:'Imigrantes ilegais devem ter uma forma de se tornarem cidadãos', y:-1}
    ],
    collectivism: ['Objetivista', 'Conservador', 'Tendência de direita', 'Centrista', 'Tendência de esquerda', 'Socialista', 'Comunista'],
    authoritarianism: ['Anarquista', 'Libertário', 'Anti-governista',, 'Pró-governista', 'Autoritarista', 'Totalitarista'],
    internationalism: ['Total-isolacionista', 'Isolacionista', 'Não-intervencionista',, 'Intervencionista', 'Multilateralista', 'Federalista mundial'],
    tribalism: ['Bleeding-Heart', 'Humanista', 'Cosmopolita',, 'Nacionalista', 'Nativista', 'Ultra Nacionalista'],
    liberalism: ['Fundamentalista', 'Reacionário', 'Tradicionalista', 'Moderado', 'Liberal', 'Progressista', 'Libertino'],
    getCollectivism: function(total) {
        return this.collectivism[this.getOffset(total)];
    },
    getAuthoritarianism: function(total) {
        return this.authoritarianism[this.getOffset(total)];
    },
    getInternationalism: function(total) {
        return this.internationalism[this.getOffset(total)];
    },
    getTribalism: function(total) {
        return this.tribalism[this.getOffset(total)];
    },
    getLiberalism: function(total) {
        return this.liberalism[this.getOffset(total)];
    },
    getOffset: function(total) {
        var ranges = [[-100,-83],[-82.99,-33],[-32.99,-17],[-16.99,16.99],[17,32.99],[33,82.99],[83,100]];

        if (total < ranges[0][0]) return 0;
        if (total > ranges[6][1]) return 6;

        for (var i = 0, t = ranges.length;i < t; ++i) {
            if (total >= ranges[i][0] &&
                total <= ranges[i][1]) {
                return i;
            }
        }
    },
    checkAnswers: function(answers) {
        var result = {
            summary: '',
            collectivism: 0.0,
            authoritarianism: 0.0,
            internationalism: 0.0,
            tribalism: 0.0,
            liberalism: 0.0
        };

        for (var i = 0, t = answers.length; i < t; ++i) {
            var multiplier = 0;

            if (answers[i] === 'y' || answers[i] === 'n') {
                multiplier = answers[i] === 'y'?this.questions[i].y:this.questions[i].y*-1;
            }

            result[this.questions[i].t] += multiplier*100/6;
        }

        result.summary = [this.getCollectivism(result.collectivism),
                          this.getAuthoritarianism(result.authoritarianism),
                          this.getInternationalism(result.internationalism),
                          this.getTribalism(result.tribalism),
                          this.getLiberalism(result.liberalism)].join(' ');

        return result;
    }
};
