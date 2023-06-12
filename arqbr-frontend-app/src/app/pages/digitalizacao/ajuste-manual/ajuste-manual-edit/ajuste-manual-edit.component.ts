import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoPageAction, PoNotificationService, PoTableComponent, PoTableColumn } from '@po-ui/ng-components'
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
  data: any
  items: any
}

type AjusteType = {
  id?: string,
  conteudo?: string
}

@Component({
  selector: "app-ajuste-manual-edit",
  templateUrl: "./ajuste-manual-edit.component.html",
  styleUrls: ["./ajuste-manual-edit.component.scss"],
})
export class AjusteManualEditComponent implements OnInit, OnDestroy {
  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
    columns: Array<PoTableColumn> = [
      {
        property: 'id',
        visible: false
      },
      {
        property: 'campo',
        label: 'Título',
        width: '50%'
      },
      {
        property: 'conteudo',        
        label: 'Conteúdo',
      }
    ]
 
    public tableActions: PoPageAction[] = [
      { label: '', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' }
    ]
  
  file: string
  page: number = 1
  scale = DEFAULT_ZOOM
  totalPages: number = 0
  isLoaded: boolean = false
  src: any = ''
  nomeArquivo: string
  items: any
  titulo: string
  conteudo: string
  campos: any[]
  public id: string
  public clienteId = ''
  public isLoading = false
  public listHeight: number
  public ajustes: AjusteType[] = []
  private ajusteId: string
  public readonly = false
  public result: any
  public literals: any = {}

  public initialFields = []

  searchForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
  })

  ajusteForm = this.formBuilder.group({
    id: null,
    conteudo: null
  })

  public readonly serviceApi = `${environment.baseUrl}/ajustes-manuais`
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
    private sanitizer: DomSanitizer,
    private languagesService: LanguagesService

  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.getLiterals()

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.tableItem()
    }
    this.loadPage()
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
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'ajusteManual'})
      .subscribe({
        next: res => this.literals = res
      })
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
        label: 'Voltar',
        action: this.goBack.bind(this),
      }
    )

    return
  }

  editItem(event) {
    this.ajusteForm.patchValue({
      id: event.id,
      conteudo: event.conteudo
    })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }

  tableItem() {
    this.subscriptions.add(
      this.restService
        .get(`/documentos-digitais-campos/list-by-documento/${this.id}`)
        .subscribe({
          next: (res: IResponse) => {
            this.campos = res.data
          }
        })
    )
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

  save() {
    const { id, conteudo } = this.ajusteForm.value
    const campo = this.campos.find(item => item.id === id)
    campo.conteudo = conteudo

    this.subscriptions.add(
      this.restService
        .put(`/documentos-digitais-campos/${id}`, {conteudo})
        .subscribe()
    )
  }

  markAsDirty() {
    this.ajusteForm.controls.conteudo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["ajustes-manuais"])
  } 
}


