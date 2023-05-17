
target = [
    {
        "document_type": "10255011_1",
        "version_id": "ce0390c0-11ff-422f-8da3-21e46fd23bd7",
        "target_document_texts": [
          [
            "GUIA",
            "DA",
            "PREVIDENCIA",
            "SOCIAL",
            "GPS"
          ],
          [
            "GUIA",
            "DA",
            "PREVIDENCIA",
            "SOCIAL"
          ]
        ],
        "fields": [
            {
              "field_name": "competencia",
              "field_label": "Competência",
              "extraction": "regex_date_mm_yyyy",
              "occurence": 0
            },
            {
              "field_name": "numero_conta",
              "field_label": "Número da Conta",
              "extraction": "regex_text_options",
              "text_options": [
                [
                  "texts": [
                    " CORRENTE."
                  ],
                  "occurence": 1
                ],
                [
                  "texts": [
                    " POUPAN"
                  ],
                  "occurence": 1
                ]
              ],
              "occurence": 0,
            },
            {
              "field_name": "nome_empregado",
              "field_label": "Nome do Empregado",
              "extraction": "line",
              "target_text": "NOME|OU|RAZ|SOCIAL|FONE",
              "relative_line_index": 2,
              "position": "first",
              "length": 50
            }
        ]
    }
]
