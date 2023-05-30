import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoComboOption, PoTableComponent, PoTableColumn } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DomSanitizer } from '@angular/platform-browser'
import { v4 as uuidV4 } from 'uuid'
import { LanguagesService } from 'src/app/services/languages.service'


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
  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  columns: Array<PoTableColumn> = [
    {
      property: 'nomeCampo',
      label: 'Nome do Campo',
      width: '35%'
    },
    {
      property: 'titulo',
      label: 'Título',
      width: '30%'
    },
    {
      property: 'estrategia',
      label: 'Estratégia'
    }
  ]

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
    private languagesService: LanguagesService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    this.getLiterals()
    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))
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

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'definicaoExtracao'})
      .subscribe({
        next: res => this.literals = res
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }

  openFileExplorer() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];
    // Faça o que você precisa com o arquivo selecionado, por exemplo, enviar para o servidor
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
        .post("/documento-digital/extracao", payload)
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

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: this.literals.return,
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: this.literals.save,
        action: () => this.save(this.searchForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.searchForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  save(data, willCreateAnother?: boolean) {
    if (this.searchForm.valid && this.texto.length > 0) {
      const payload = {
        clienteId: data.clienteId,
        departamentoId: data.departamentoId,
        tipoDocumentoId: data.tipoDocumentoId,
        pdf: data.pdf
      }

      this.subscriptions.add(
        this.restService
          .post("/definicao-extracao", payload)
          .subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration
              })

              if (willCreateAnother) {
                this.searchForm.reset()
                this.texto = []
                this.router.navigate(["definicao-extracao/new"])
              } else {
                this.router.navigate(["definicao-extracao"])
              }
            },
            error: (error) => console.log(error),
          })
      )

      return
    }
      
      this.markAsDirty()
      this.poNotification.warning({
        message: this.literals.formError,
        duration: environment.poNotificationDuration
      })
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


