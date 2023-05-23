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
  selector: "app-caixa-quebra-edit",
  templateUrl: "./caixa-quebra-edit.component.html",
  styleUrls: ["./caixa-quebra-edit.component.scss"],
})
export class CaixaQuebraEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any
  public literals: any = {}

  caixaQuebraForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nomeArquivoOrigem: '',
    sequencia: 0,
    paginaInicial: 0,
    paginaFinal: 0,
    status: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/caixas-quebras`
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
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getCaixaQuebra(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'caixaQuebra'})
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
        action: () => this.save(this.caixaQuebraForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.caixaQuebraForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getCaixaQuebra(id: string) {
    this.restService
      .get(`/caixas-quebras/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.caixaQuebraForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            tipoDocumentoId: result.tipoDocumentoId,
            nomeArquivoOrigem: result.nomeArquivoOrigem,
            sequencia: result.sequencia,
            paginaInicial: result.paginaInicial,
            paginaFinal: result.paginaFinal,
            status: result.status,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select?clienteId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.caixaQuebraForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/caixas-quebras/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.caixaQuebraForm.reset()
                  this.router.navigate(["caixas-quebras/new"])
                } else {
                  this.router.navigate(["caixas-quebras"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/caixas-quebras", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.caixaQuebraForm.reset()
                  this.router.navigate(["caixas-quebras/new"])
                } else {
                  this.router.navigate(["caixas-quebras"])
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
    this.caixaQuebraForm.controls.clienteId.markAsDirty()
    this.caixaQuebraForm.controls.departamentoId.markAsDirty()
    this.caixaQuebraForm.controls.tipoDocumentoId.markAsDirty()
    this.caixaQuebraForm.controls.nomeArquivoOrigem.markAsDirty()
    this.caixaQuebraForm.controls.sequencia.markAsDirty()
  }

  goBack() {
    this.router.navigate(["caixas-quebras"])
  }
}
