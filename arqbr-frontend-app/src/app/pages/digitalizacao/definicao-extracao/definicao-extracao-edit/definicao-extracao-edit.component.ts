import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification, PoComboOption, PoTableComponent, PoTableColumn, PoModalComponent } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DomSanitizer } from '@angular/platform-browser'
import { v4 as uuidV4 } from 'uuid'
import { LanguagesService } from 'src/app/services/languages.service'
import { extractByRegex, extractBySearchTextGetLine } from 'src/app/shared/utils/extract-text'

const ZOOM_STEP: number = 0.1
const DEFAULT_ZOOM: number = 0.6

interface IResponse {
  statusCode: number
  data: any
  items: any
}

type textoType = {
  id?: string,
  textoQuebra?: string,
  nomeCampo?: string,
  titulo?: string,
  estrategia?: string,
  texto?: string,
  linha?: string,
  inicio?: string,
  comprimento?: number
}

@Component({
  selector: "app-definicao-extracao-edit",
  templateUrl: "./definicao-extracao-edit.component.html",
  styleUrls: ["./definicao-extracao-edit.component.scss"],
})
export class DefinicaoExtracaoEditComponent implements OnInit, OnDestroy {
  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  @ViewChild(PoModalComponent, { static: true }) modal: PoModalComponent
    columns: Array<PoTableColumn> = [
      {
        property: 'nomeCampo',
        label: 'Nome de Campo',
        width: '20%'
      },
      {
        property: 'titulo',
        label: 'Título',
        width: '40%'
      },
      {
        property: 'estrategia',
        label: 'Estratégia'
      }
    ]
  public tableActions: PoPageAction[] = [
    { label: 'Deletar', action: this.deleteQuebra.bind(this), icon: 'fa-solid fa-trash' }
  ]
  public text = ''
  file: string
  fileName: string
  uploadedFile: string
  page: number = 1
  scale = DEFAULT_ZOOM
  totalPages: number = 0
  isLoaded: boolean = false
  src: any = ''
  nomeArquivo: string
  textoBotao = ''
  items: any
  resultado: string
  public uploadUrl = `${environment.baseUrl}/documentos-digitais/extracao`
  public id: string
  public clienteId = ''
  public isLoading = false
  public listHeight: number
  public textos: textoType[] = []
  public readonly = false
  public result: any
  public literals: any = {}
  public matches = []
  public titulos = []

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
    linha: '',
    inicio: '',
    comprimento: 0
  })

  public readonly serviceApi = `${environment.baseUrl}/definicoes-extracao`
  public documentoDigitalIdService = `${environment.baseUrl}/documentos-digitais/select`
  public campoDocumentoIdService = `${environment.baseUrl}/campos-documento/select`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private languagesService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.getLiterals()

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getDefinicaoExtracao(this.id))
    }
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

  extractTextTeste() {
    const { estrategia, texto, linha, inicio, comprimento } = this.extracaoForm.value
  
    if (estrategia === 'lineInLine') {
      this.matches = extractBySearchTextGetLine(this.text, {
        texto,
        linha,
        inicio,
        comprimento
      })
    } else {
      this.matches = extractByRegex(this.text, 'mm/yyyy')
    }

    this.modal.open()
  }

  uploadFile(event) {
    const target = event.target as HTMLInputElement

    if (target.files) {
      const data = new FormData()

      data.append('file', target.files[0])

      this.subscriptions.add(
        this.httpClient
          .post(`${environment.baseUrl}/documentos-digitais/extracao`, data)
          .subscribe({
            next: (res: IResponse) => {
              this.text = res.data.text
              this.totalPages = res.data.numberPages
              this.uploadedFile = res.data.fileName
            }
          })
      )
    }
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
      nomeArquivo: this.file,
      page: this.page,
      fileName: this.uploadedFile
    }

    if (this.uploadedFile) {
      this.subscriptions.add(
        this.restService
          .post("/documentos-digitais/extracao", payload)
          .subscribe({
            next: (res: IResponse) => {
              this.text = res.data.text
              this.totalPages = res.data.numberPages
            }
          })
      )
    } else {
      this.subscriptions.add(
        this.restService
          .post("/documentos-digitais/extracao-s3", payload)
          .subscribe({
            next: (res: IResponse) => {
              this.text = res.data.text
              this.totalPages = res.data.numberPages
            }
          })
      )
    }
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


  addExtracao() { 
    if (this.extracaoForm.valid) {
      const {  textoQuebra, nomeCampo, titulo, estrategia, texto, linha, inicio, comprimento } = this.extracaoForm.value
      const payload = {
        textoQuebra,
        nomeCampo,
        titulo,
        estrategia,
        texto,
        linha,
        inicio,
        comprimento
      }
      this.textos.push(payload)
      this.extracaoForm.reset()

      return 
    }

    this.extracaoForm.markAllAsTouched()
    this.extracaoForm.controls.textoQuebra.markAsDirty()
    this.extracaoForm.controls.nomeCampo.markAsDirty()
    this.extracaoForm.controls.titulo.markAsDirty()
    this.extracaoForm.controls.estrategia.markAsDirty()
    this.extracaoForm.controls.texto.markAsDirty()
    this.extracaoForm.controls.linha.markAsDirty()
    this.extracaoForm.controls.inicio.markAsDirty()
    this.extracaoForm.controls.comprimento.markAsDirty()
  }

  deleteQuebra(event) {
    this.textos.splice(this.textos.indexOf(event), 1)
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

  getDefinicaoExtracao(id: string) {
    this.restService
      .get(`/definicoes-extracao/${id}`)
      .subscribe({
        next: (result) => {
          this.searchForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            tipoDocumentoId: result.tipoDocumentoId,
            pdf: result.pdf
          })
          this.textos = result.textos
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.searchForm.valid) {
      const payload = {
        clienteId: data.clienteId,
        departamentoId: data.departamentoId,
        tipoDocumentoId: data.tipoDocumentoId,
        pdf: data.pdf,
        textos: this.textos
      }

      this.subscriptions.add(
        this.restService
          .post("/definicoes-extracao", payload)
          .subscribe({
            next: () => {
              this.poNotification.success({
                message: this.literals.saveSuccess,
                duration: environment.poNotificationDuration
              })

              if (willCreateAnother) {
                this.searchForm.reset()
                this.textos = []
                this.router.navigate(["definicoes-extracao/new"])
              } else {
                this.router.navigate(["definicoes-extracao"])
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

    onEstrategiaChange() {
      const estrategia = this.extracaoForm.get('estrategia').value;
    
      if (estrategia === 'regex') {
        this.extracaoForm.get('texto').disable();
        this.extracaoForm.get('linha').disable();
        this.extracaoForm.get('inicio').disable();
        this.extracaoForm.get('comprimento').disable();
      } else {
        this.extracaoForm.get('texto').enable();
        this.extracaoForm.get('linha').enable();
        this.extracaoForm.get('inicio').enable();
        this.extracaoForm.get('comprimento').enable();
      }
    }
    


  markAsDirty() {
    this.searchForm.controls.clienteId.markAsDirty()
    this.searchForm.controls.departamentoId.markAsDirty()
    this.searchForm.controls.tipoDocumentoId.markAsDirty()
    this.searchForm.controls.pdf.markAsDirty()
  }

  goBack() {
    this.router.navigate(["definicoes-extracao"])
  } 
}


