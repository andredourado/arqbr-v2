import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

const ZOOM_STEP: number = 0.1
const DEFAULT_ZOOM: number = 0.6

interface IResponse {
  solicitacaoFisico: any
  statusCode: number
  data: any
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
  public isLoading = false
  public listHeight: number

  
  public readonly = false
  public result: any
  public literals: any = {}

  quebraManualForm = this.formBuilder.group({
    documentoDigitalId: null,
    campoDocumentoId: null,
    conteudo: '',
  })

  public fields: Array<any> = [
    { property: '', label: 'Tipo Documento' },
    { property: '', label: 'Página Inicial' },
    { property: '', label: 'Página Final' },
    { property: '', label: 'Nome Arquivo' }
  ]

  public tableActions: PoPageAction[] = [
    { label: 'Visualizar',  icon: 'fa-solid fa-eye' }
  ]

  public readonly serviceApi = `${environment.baseUrl}/quebra-manual`
  public documentoDigitalIdService = `${environment.baseUrl}/documentos-digitais/select`
  public campoDocumentoIdService = `${environment.baseUrl}/campos-documento/select`

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

  loadPage () {
    const payload = {
      id: this.id,
      page: this.page,
    }
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

 
  save(data, willCreateAnother?: boolean) {
    if (this.quebraManualForm.valid) {
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
                  this.quebraManualForm.reset()
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
                  this.quebraManualForm.reset()
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
    this.quebraManualForm.controls.documentoDigitalId.markAsDirty()
    this.quebraManualForm.controls.campoDocumentoId.markAsDirty()
    this.quebraManualForm.controls.conteudo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["quebra-manual"])
  } 
}


