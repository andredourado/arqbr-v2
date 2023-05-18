import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoPageAction } from '@po-ui/ng-components'
import { Subscription } from 'rxjs'
import { RestService } from "src/app/services/rest.service"
import { DomSanitizer } from "@angular/platform-browser"
import { environment } from "src/environments/environment"
import { HttpClient } from "@angular/common/http"
import { PoTreeViewItemHeaderComponent } from "@po-ui/ng-components/lib/components/po-tree-view/po-tree-view-item-header/po-tree-view-item-header.component"

const ZOOM_STEP: number = 0.1
const DEFAULT_ZOOM: number = 0.6

interface IResponse {
  solicitacaoFisico: any
  statusCode: number
  data: any
}

@Component({
  selector: "app-documento-digital-edit",
  templateUrl: "./documento-digital-edit.component.html",
  styleUrls: ["./documento-digital-edit.component.scss"],
})
export class DocumentoDigitalEditComponent implements OnInit, OnDestroy {
  id: string
  page: number = 1
  scale = DEFAULT_ZOOM
  totalPages: number = 0
  isLoaded: boolean = false
  src: any = ''
  nomeArquivo: string
  solicitacaoFisico: boolean = false
  textoBotao = ''
  items: any
  

  subscriptions = new Subscription()

  public pageActions: Array<PoPageAction> = [
    {
      label: 'Download',
      action: this.downloadFile.bind(this),
      icon: 'fa-solid fa-download'
    },
    {
      label: 'Solicitar Físico',
      action: this.solicitarDocumento.bind(this)
    },
    {
      label: 'Voltar',
      action: this.goBack.bind(this)
    }
  ]

  constructor(
    private restService: RestService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.loadPage()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }


  loadPage () {
    const payload = {
      id: this.id,
      page: this.page,
    }

    this.subscriptions.add(
      this.restService
        .post("/documentos-digitais/page", payload)
        .subscribe({
          next: (res: IResponse) => {
            this.src = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.image as string)
            this.totalPages = res.data.totalPages
            this.nomeArquivo = res.data.nomeArquivo
            this.solicitacaoFisico = res.data.solicitacaoFisico
            this.changeLabelSolicitacao()
          }
        })
    )
  }

  changePage() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages
    }
    this.loadPage()
  }

  nextPage() {
    if (this.page >= this.totalPages) return
    
    this.page++
    this.loadPage()
  }

  next50Page() {
    this.page += 50

    if (this.page > this.totalPages) this.page = this.totalPages

    this.loadPage()
  }

  prevPage() {
    this.page--
    this.loadPage()
  }

  prev50Page() {
    this.page -= 50

    if (this.page <= 0) this.page = 1

    this.loadPage()
  }

  public zoomIn() {
    this.scale += ZOOM_STEP
  }

  public zoomOut() {
    this.scale -= ZOOM_STEP
  }
  
  public resetZoom() {
    this.scale = DEFAULT_ZOOM;
    const fileContainer = document.getElementById('file-container');
    fileContainer.scrollTop = 0;
    this.loadPage();
  }
  
  

  private goBack() {
    this.router.navigate(["documentos-digitais"])
  }

  downloadFile() {
    this.subscriptions.add(
      this.restService
        .post('/documentos-digitais/pdf', { id: this.id }, { responseType: 'text' })
        .subscribe({
          next: (res: IResponse) => {
            const byteCharacters = atob(res.data.replace('data:binary/octet-stream;base64,', ''));
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.target = '_blank';
            a.download = this.nomeArquivo;
            a.click();
            URL.revokeObjectURL(url);
            a.remove();
          },
          error: (err) => console.log(err)
        })
    )
  }

  changeLabelSolicitacao () {
    this.pageActions[1].label = this.solicitacaoFisico ? 'Cancelar Solicitação': 'Solicitar Físico'
  }

  solicitarDocumento () {
    this.solicitacaoFisico = !this.solicitacaoFisico
    this.changeSolicitacaoStatus()
  }

  changeSolicitacaoStatus () {
    this.subscriptions.add(
      this.httpClient
      .patch(`${environment.baseUrl}/documentos-digitais/solicitar-documento-fisico/`, {ids: [this.id]})
      .subscribe({
        next: (res: any[]) => {
          this.solicitacaoFisico = res[0].data.solicitacaoFisico
          this.changeLabelSolicitacao()
        },
        error: (err) => console.log(err)
      })
    )
  }
}
