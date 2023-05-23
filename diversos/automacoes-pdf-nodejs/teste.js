const extractBySearchTextGetLine = (text, field) => {
  let targetLine = ''
  lines = text.split("\n")

  for (let index = 0; index < lines.length; index++) {
    field.search_text.forEach(searchText => {
      if (lines[index].toUpperCase().includes(searchText.toUpperCase())) {
        targetLine = lines[index + field.line]
        return
      }
    })

    if (targetLine !== '') {
      break
    }
  }

  console.log('>>', targetLine.trim(), '>>', field.extraction_start, field.extraction_start.length)

  return targetLine.substring(targetLine.indexOf(field.extraction_start) + field.extraction_start.length, field.extraction_length).trim()
}

const pageText = `
1.                           s —— —— MÊS/ANO
Demonstrativo de Pagamento de Salário                                               12/2015
EMPRESA: cc —— V Ê Ô .. ... .  CNFPJICE)
' 0320-MARCIO JOSE LOPES E EDUARDO M GOMES                          500068487280
PCADASIRO —— NOME- AA FFF FFF  DATA ADMISSÃO — LOCAL
f        1          Antonio Dirceu Botelho                        11/10/2002 - SUINOCULTURA
PECONES UVA AAA
1 SUINOCULTURA                                     Trabalhador Rural - Serv. Gerais
Banco / Agência | Conta       E CTTT— |
Í'Banco Itaú / 3728 / 13260-0                                                               0000:00
cCÓD.    DESCRIÇÃO                                     REFERÊNCIA          VENCIMENTOS        DESCONTOS
001 | Horas Normais                                  T3,33                354,27
012 | Horas Ferias Diurnas                          146,67                708,55
036 | Horas Extras c/ 100%                            18,00                 173,92
042 | Horas Extras c/ 200%                            4,30                  62,32
048 | Hora Noturna c/ 25%                                5,00                    6,04
062 | Insalubridade                                           20,00                     82,53
065 | DSR Reflexo H.Extras                                                            48,46
066 | Insalubridade Ferias                                 146,67                   105,07
134 | Media Horas Ferias                               85,03                 471,71
136 | Media Variaveis Ferias                             146,67                      8,11
140 | 1/3 Ferias                                                                    431,15
148 | Abono Pecuniario Ferias                            F3                  354,27
150 | Media Horas Abono Pec.                           4252                  235,86
152 | Media V.Variav.Abono Pec.                          73:33                       4,06
154 | Insalubridade Abono Pec.                             T3,30                     52,53
160 | 1/3 Abono Pecuniario Fer                                                 218,97%
281 | Desconto Adto Ferias                                                                                     2.431,67
300 | FGTS                                                                                               8,00
                   193,83
301 | INSS Ferias                                               9,00                                          155,21
302 | INSS                                                                    11,00
             TTAA
601 | Horas Reduzidas Noturnas                       14,29                   0,86
636 | Plano Saude - Titular                                                                                   63,77
662 | Habitacao                                                                                                   5,81
700 | Desc. Adiantamento                                                                              284,81
743 | Unimed - Co-Participação                            118,75                                            118,75
744 | Unimed - Mensalidade Adic                                                                     30,59
746 | Odontoprev                                                                                                 7,96
7               SALÁRIO BASE —— SALÁRIO CONTR. INSS ————— FAIXAIRRE ———  ToTAL DE VENCIMENTOS —TOTAL DE DESCONTOS
1.062,82                    2.422,99                     0,00                           3.285,28               3.209,88
BASE CÁLC. FGIS —— —  FGTS DOMÊS —— BASE CÁL IRRF— CPF —— — VALOR LÍQUIDO
2.422,99                          193,83                    69840 — 043.691.439-50                                 75,40
Parabéns! Feliz Aniversário em 3 /1
Recebi a importância acima, estando de acordo com as verbas discriminadas, bem como os
descontos efetuados
:                                                              ã      P
castro, 5 14 46                                 assiatralhatonta D Buketlio
..—. . « =                              --nEF»
`

const field = {
  "field_name": "cooperado",
  "field_title": "Cooperado",
  "method": "search_text_get_line",
  "search_text": [
    "Demonstrativo"
  ],
  "line": 2,
  "extraction_start": "-",
  "extraction_length": 50 
}

console.log('Saida: ', extractBySearchTextGetLine(pageText, field))

