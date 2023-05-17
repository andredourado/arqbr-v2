import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

@Component({
  selector: "app-documento-digital-edit",
  templateUrl: "./documento-digital-edit.component.html",
  styleUrls: ["./documento-digital-edit.component.scss"],
})
export class DocumentoDigitalEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public departamentoId = ''
  public result: any
  public literals: any = {}

  documentoDigitalForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivo: '',
    nomeArquivoOrigem: '',
    conteudoEmTexto: '',
    numeroPaginas: 0,
    solicitacaoFisico: false,
    dataSolicitacao: null,
    solicitanteId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/documentos-digitais`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`
  public solicitanteIdService = `${environment.baseUrl}/solicitantes/select`

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
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getDocumentoDigital(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'documentoDigital'})
      .subscribe({
        next: res => this.literals = res
      })
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
        action: () => this.save(this.documentoDigitalForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.documentoDigitalForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getDocumentoDigital(id: string) {
    this.restService
      .get(`/documentos-digitais/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.departamentoId = result.departamentoId
          this.documentoDigitalForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            tipoDocumentoId: result.tipoDocumentoId,
            nomeArquivo: result.nomeArquivo,
            nomeArquivoOrigem: result.nomeArquivoOrigem,
            numeroPaginas: result.numeroPaginas,
            solicitacaoFisico: result.solicitacaoFisico,
            dataSolicitacao: result.dataSolicitacao ? result.dataSolicitacao.substring(0, 10) : null,
            solicitanteId: result.solicitanteId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }

  departamentoIdChange(event: string) {
    this.solicitanteIdService = `${environment.baseUrl}/solicitantes/select?departamentoId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.documentoDigitalForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/documentos-digitais/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.documentoDigitalForm.reset()
                  this.router.navigate(["documentos-digitais/new"])
                } else {
                  this.router.navigate(["documentos-digitais"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/documentos-digitais", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.documentoDigitalForm.reset()
                  this.router.navigate(["documentos-digitais/new"])
                } else {
                  this.router.navigate(["documentos-digitais"])
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
    this.documentoDigitalForm.controls.clienteId.markAsDirty()
    this.documentoDigitalForm.controls.departamentoId.markAsDirty()
    this.documentoDigitalForm.controls.tipoDocumentoId.markAsDirty()
    this.documentoDigitalForm.controls.solicitanteId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["documentos-digitais"])
  }
}
