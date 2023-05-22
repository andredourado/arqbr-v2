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
}

type QuebraType = {
  id?: string,
  documento?: string,
  paginaInicial?: string,
  paginaFinal?: string
}

@Component({
  selector: "app-quebra-manual-edit",
  templateUrl: "./quebra-manual-edit.component.html",
  styleUrls: ["./quebra-manual-edit.component.scss"],
})
export class QuebraManualEditComponent implements OnInit, OnDestroy {
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
  public clienteId = ''
  public isLoading = false
  public listHeight: number
  public quebras: QuebraType[] = []
  private quebraId: string

  public readonly = false
  public result: any
  public literals: any = {}

  searchForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    caixa: null,
  })

  quebraForm = this.formBuilder.group({
    tipoDocumentoId: null,
    paginaInicial: '',
    paginaFinal: '',
  })

  public tableActions: PoPageAction[] = [
    { label: 'Visualizar',  icon: 'fa-solid fa-eye' }
  ]

  public readonly serviceApi = `${environment.baseUrl}/quebra-manual`
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
    this.loadQuebraManualDocumentos()
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

  loadQuebraManualDocumentos() {
    this.subscriptions.add(
      this.restService
        .get('/quebras-manuais/list') 
        .subscribe({
          next: (res: IResponse) => {
            this.caixasOptions = res.data
          }
        })
    )
  }

  caixaChange(caixa: string) {
    this.id = caixa
    this.page = 1
    this.loadPage()
  }
 
  loadPage() {
    const payload = {
      id: this.id,
      page: this.page,
    }

    this.subscriptions.add(
      this.restService
        .get("/quebras-manuais/open/" + this.id)
        .subscribe({
          next: (res: IResponse) => {
            this.src = (res.data as string)
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

  addQuebra() { 
    if (this.quebraForm.valid) {
      const payload = {
        id: this.quebraId ?? uuidV4(),
        tipoDocumento: this.quebraForm.value.tipoDocumentoId,
        paginaInicial: this.quebraForm.value.paginaInicial,
        paginaFinal: this.quebraForm.value.paginaFinal,
      }

      if (this.quebraId) {
        let quebraIndex: number
        this.quebras.map((text, index) => {
          if (text.id === this.quebraId) quebraIndex = index
        })
        this.quebras[quebraIndex] = payload
      } else this.quebras.push(payload)
      
      this.quebraForm.reset()
      this.quebraId = null
    } else {
        this.poNotification.warning({
        message: "Erro ao salvar",
        duration: environment.poNotificationDuration
      })
    }
    console.log(this.quebras)
  }

  deleteQuebra() {
    if(this.quebraId) {
      let indexTextById: number
      this.quebras.map((quebra, quebraIndex) => {
        if(quebra.id === this.quebraId) indexTextById = quebraIndex
      })

      this.quebras.splice(indexTextById, 1)
      this.quebraForm.reset()
      this.quebraId = null
    }
  }

 
  save(data, willCreateAnother?: boolean) {
    if (this.quebraForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/quebra-manual/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.quebraForm.reset()
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
                  this.quebraForm.reset()
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
    this.searchForm.controls.caixa.markAsDirty()
    this.quebraForm.controls.tipoDocumentoId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["quebra-manual"])
  } 
}


