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
  selector: "app-tipo-documento-edit",
  templateUrl: "./tipo-documento-edit.component.html",
  styleUrls: ["./tipo-documento-edit.component.scss"],
})
export class TipoDocumentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any
  public literals: any = {}

  tipoDocumentoForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    descricao: '',
    identificador: '',
    estrategiaQuebra: '',
    prazoDescarteAnos: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/tipos-documento`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`

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
      this.subscriptions.add(this.getTipoDocumento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'tipoDocumento'})
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
        action: () => this.save(this.tipoDocumentoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.tipoDocumentoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getTipoDocumento(id: string) {
    this.restService
      .get(`/tipos-documento/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.tipoDocumentoForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            descricao: result.descricao,
            identificador: result.identificador,
            estrategiaQuebra: result.estrategiaQuebra,
            prazoDescarteAnos: result.prazoDescarteAnos,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.tipoDocumentoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/tipos-documento/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.tipoDocumentoForm.reset()
                  this.router.navigate(["tipos-documento/new"])
                } else {
                  this.router.navigate(["tipos-documento"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/tipos-documento", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.tipoDocumentoForm.reset()
                  this.router.navigate(["tipos-documento/new"])
                } else {
                  this.router.navigate(["tipos-documento"])
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
    this.tipoDocumentoForm.controls.clienteId.markAsDirty()
    this.tipoDocumentoForm.controls.departamentoId.markAsDirty()
    this.tipoDocumentoForm.controls.descricao.markAsDirty()
    this.tipoDocumentoForm.controls.identificador.markAsDirty()
  }

  goBack() {
    this.router.navigate(["tipos-documento"])
  }
}
