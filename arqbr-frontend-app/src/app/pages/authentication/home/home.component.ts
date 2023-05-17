import { HttpClient } from "@angular/common/http"
import { Component, HostListener, OnInit, ViewChild } from "@angular/core"
import { PoTableColumn, PoChartType, PoChartOptions, PoChartSerie, PoTableComponent } from "@po-ui/ng-components"
import { Subscription } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import { environment } from "src/environments/environment"

interface IList {
  dataSolicitacao: Date
  id: string
  nomeArquivo: string
  solicitacaoFisico: boolean
  solicitanteId: string
  solicitanteNome: string
}

const formatNumberWithCommas = (number) => {
  let parts = number.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  return parts.join(".")
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})


export class HomeComponent implements OnInit {
  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  columns: Array<PoTableColumn> = [
    {
      property: 'dataSolicitacao',
      label: 'Data',
      type: 'date',
      width: '20%'
    },
    {
      property: 'solicitanteNome',
      label: 'Solicitante',
      width: '30%'
    },
    {
      property: 'nomeArquivo',
      label: 'Nome do Arquivo'
    }
  ]
  solicitacoes: IList[] = []
  documento: number
  documentosPages: number
  tipoDocumentoType: PoChartType = PoChartType.Bar
  departamentoType: PoChartType = PoChartType.Bar
  id: string
  solicitacaoFisico: boolean
  nomeArquivo: any
  solicitanteId: string
  dataSolicitacao: Date
  public documentsProcessing = 0
  public canSeeDepartamento = false
  public listHeight: number = 0
  public graphHeight: number = 0

  subscriptions = new Subscription()

  topTipoDocumento: Array<PoChartSerie> = []
  topDepartamento: Array<PoChartSerie> = []

  tipoDocumentoOptions: PoChartOptions = {
    axis: {
      maxRange: 100,
      gridLines: 2
    }
  }

  departamentoOptions: PoChartOptions = {
    axis: {
      maxRange: 100,
      gridLines: 2
    }
  }

  constructor(
    public httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getPermissions()
    this.documentCount()
    this.documentCountPage()
    this.documentTopTipoDocumento()
    this.documentTopDepartamento()
    this.tableSolicitacao()
    this.getProcessing()
    this.calculateListHeight()
  }

  getPermissions() {
    // this.canSeeDepartamento = this.authService.isAdmin || this.authService.isSuperUser || this.authService.isGestor
    console.log(this.canSeeDepartamento)
  }

  documentCount() {
    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/count`, {})
      .subscribe({
        next: (res: any) => {
          let number = res?.data.count ?? 0
          let formattedNumber = formatNumberWithCommas(number);
          this.documento = formattedNumber
        }
      })
  }

  documentCountPage() {
    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/count-pages`, null)
      .subscribe({
        next: (res: any) => {
          let number = res?.data.numeroPaginas ?? 0;
          let formattedNumber = formatNumberWithCommas(number);
          this.documentosPages = formattedNumber
        }
      })
  }

  documentTopTipoDocumento() {
    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/count-by-tipo-documento`, null)
      .subscribe({
        next: (res: any) => {
          const series = []
          this.topTipoDocumento = res.data.map(item => {
            series.push({
              label: item.tipoDocumento,
              data: [Number(item.quantidade)],
              type: PoChartType.Bar
            })
          })
          this.topTipoDocumento = series
          this.tipoDocumentoOptions.axis.maxRange = res.data[0].quantidade
        }
      })
  }

  documentTopDepartamento() {
    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/count-by-departamento`, null)
      .subscribe({
        next: (res: any) => {
          const series = []
          this.topDepartamento = res.data.map(item => {
            series.push({
              label: item.departamento,
              data: [Number(item.quantidade)],
              type: PoChartType.Bar
            })
          })
          this.topDepartamento = series
          this.departamentoOptions.axis.maxRange = res.data[0].quantidade
        }
      })
  }

  tableSolicitacao() {
    this.httpClient.get(`${environment.baseUrl}/documentos-digitais/solicitacao?pageSize=5`)
      .subscribe({
        next: (res: any) => {
          this.solicitacoes = res.data
          this.dataSolicitacao = res.data.dataSolicitacao
          this.solicitanteId = res.data.solicitanteId
          this.nomeArquivo = res.data.nomeArquivo
        },
        error: (err) => console.log(err)
      })
  }


  isUnAprovado(row, index: number) {
    return row.status !== 'Aprovado';
  }

  getProcessing() {
    this.httpClient.get(`${environment.baseUrl}/documentos-digitais/processing`)
      .subscribe({
        next: (res: any) => this.documentsProcessing = res.data.count
      })
  }

  calculateListHeight() {
    this.graphHeight = window.innerHeight - 345
    this.listHeight = window.innerHeight - 330
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.calculateListHeight()
  }
}


