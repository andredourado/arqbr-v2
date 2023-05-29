import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoComboOption } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DomSanitizer } from '@angular/platform-browser'
import { v4 as uuidV4 } from 'uuid'


const ZOOM_STEP: number = 0.1
const DEFAULT_ZOOM: number = 0.6

interface IResponse {
  solicitacaoFisico: any
  statusCode: number
  data: any
  items: any
}

type textoType = {
  id?: string,
  textoQuebra: string,
  nomeCampo: string,
  titulo: string,
  estrategia: string,
  texto: string,
  inicio: any,
  comprimento: number
}

@Component({
  selector: "app-definicao-extracao-edit",
  templateUrl: "./definicao-extracao-edit.component.html",
  styleUrls: ["./definicao-extracao-edit.component.scss"],
})
export class DefinicaoExtracaoEditComponent implements OnInit, OnDestroy {
  file: string
  page: number = 1
  conteudoEmTexto: string
  scale = DEFAULT_ZOOM
  totalPages: number = 0
  isLoaded: boolean = false
  src: any = ''
  nomeArquivo: string
  solicitacaoFisico: boolean = false
  textoBotao = ''
  items: any
  public clienteId = ''
  public isLoading = false
  public listHeight: number
  public texto: textoType[] = []

  public readonly = false
  public result: any
  public literals: any = {}

  searchForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    pdf: ''
  })

  extracaoForm = this.formBuilder.group({
    textoQuebra: '',
    nomeCampo: '',
    titulo: '',
    estrategia: '',
    texto: '',
    inicio: '',
    comprimento: '',
  })

  public tableActions: PoPageAction[] = [
    { label: 'Visualizar',  icon: 'fa-solid fa-eye' }
  ]

  public readonly serviceApi = `${environment.baseUrl}/definicao-extracao`
  public documentoDigitalIdService = `${environment.baseUrl}/documentos-digitais/select`
  public campoDocumentoIdService = `${environment.baseUrl}/campos-documento/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`
  public caixasOptions: PoComboOption[] = []

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPageType(route: string): string {
    switch (route) {
      case 'new':
        return 'new'
      case 'new/:id':
        return 'new'
      case 'edit':
        return 'edit'
      case 'edit/:id':
        return 'edit'
      case 'view/:id':
        return 'view'
    }
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }

  searchPdf() {
    const { pdf } = this.searchForm.value
    if (pdf && pdf != '') {
      this.file = pdf as string
      this.loadPage()
    }
  }

  loadPage() {
    const payload = {
      file: this.file,
      page: this.page,
      conteudoEmTexto: this.conteudoEmTexto
    }

    this.subscriptions.add(
      this.restService
        .post("/documento-digital/page", payload)
        .subscribe({
          next: (res: IResponse) => {
            this.src = this.sanitizer.bypassSecurityTrustResourceUrl(res.data.image as string)
            this.totalPages = res.data.numberPages
          }
        })
    )
  } 

  changePage() {
    if (this.page > this.totalPages) {
      this.page = this.totalPages
    }
    if (this.page < 1) {
      this.page = 1
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

 
  save(data, willCreateAnother?: boolean) {
    if (this.extracaoForm.valid) {
      if (this.file && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/quebra-manual/${this.file}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.extracaoForm.reset()
                  this.router.navigate(["quebra-manual/new"])
                } else {
                  this.router.navigate(["quebra-manual"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/quebra-manual", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.extracaoForm.reset()
                  this.router.navigate(["quebra-manual/new"])
                } else {
                  this.router.navigate(["quebra-manual"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    } else {
      this.markAsDirty()
      this.poNotification.warning({
        message: this.literals.formError,
        duration: environment.poNotificationDuration
      })
    }
  }

  markAsDirty() {
    this.searchForm.controls.clienteId.markAsDirty()
    this.searchForm.controls.departamentoId.markAsDirty()
    this.searchForm.controls.tipoDocumentoId.markAsDirty()
    this.searchForm.controls.pdf.markAsDirty()
  }

  goBack() {
    this.router.navigate(["definicao-extracao"])
  } 
}


