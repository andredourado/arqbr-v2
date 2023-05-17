import { Component, OnInit } from "@angular/core"
import { PoSelectOption, PoTableColumn, PoChartType, PoChartOptions, PoChartSerie, PoDialogService } from "@po-ui/ng-components";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  columns: Array<PoTableColumn>;
  items: Array<any>;
  consumptionPerCapitaType: PoChartType = PoChartType.Bar;


  readonly statusOptions: Array<PoSelectOption> = [
    { label: 'Aprovado', value: 'Aprovado' },
    { label: 'Andamento', value: 'Andamento' },
    { label: 'Aguardando ArqBr', value: 'Aguardando ArqBr' }
  ];

  consumptionPerCapitaItems: Array<string> = [
    'DECLARAÇÕES',
    'IMÓVEIS URBANOS',
    'IMÓVEIS RURAIS',
    'CONTRATOS',
    'DECLARAÇÕES ANTERIORES',
    'OUTROS DOCUMENTOS'
  ];

  consumptionPerCapita: Array<PoChartSerie> = [
    { data: [10, 20, 8, 12, 40, 10] },
  ];

  consumptionPerCapitaOptions: PoChartOptions = {
    axis: {
      maxRange: 100,
      gridLines: 2
    }
  };

  constructor() {}

  ngOnInit() {
    this.columns = [
        { property: 'Data', label: 'Data', type: 'dateTime' },
        { property: 'tipo' },
        { property: 'time_since_purchase', label: 'Time since purchase', type: 'time', visible: false },
        { property: 'quantity', label: 'Quantity (Tons)', type: 'number', width: '15%', visible: false },
        {
          property: 'status',
          type: 'label',
          width: '20%',
          labels: [
            { value: 'Aprovado', color: 'color-10', label: 'Aprovado' },
            { value: 'Andamento', color: 'color-07', label: 'Andamento' },
            { value: 'Aguardando ArqBr', color: 'color-08', label: 'Aguardando ArqBr' }
          ]
        }
      ];
    this.items =  [
      {
        code: 1200,
        product: 'Rice',
        tipo: 'Solicitação de Documentos',
        quantity: 3,
        icms: 1500,
        status: 'Aprovado',
        license_plate: 'MDJD9191',
        batch_product: 18041822,
        driver: 'José Oliveira'
      },
      {
        tipo: 'Coleta',
        status: 'Andamento',
      },
      {
        tipo: 'Solicitação de Documentos',
        status: 'Andamento',
      },
      {
        tipo: 'Solicitação de Documentos',
        status: 'Aguardando ArqBr'
      }
    ];
  }
  

  isUnAprovado(row, index: number) {
    return row.status !== 'Aprovado';
  }
}