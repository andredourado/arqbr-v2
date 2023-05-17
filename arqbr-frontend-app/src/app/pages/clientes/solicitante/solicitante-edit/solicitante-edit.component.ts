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
  selector: "app-solicitante-edit",
  templateUrl: "./solicitante-edit.component.html",
  styleUrls: ["./solicitante-edit.component.scss"],
})
export class SolicitanteEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any
  public literals: any = {}

  solicitanteForm = this.formBuilder.group({
    clienteId: null,
    departamentoId: null,
    nome: '',
    email: '',
    telefonesFixos: '',
    celular: '',
    gerenteDepartamento: false,
    gestorContrato: false,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/solicitantes`
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
      this.subscriptions.add(this.getSolicitante(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'clientes', options: 'solicitante'})
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
        action: () => this.save(this.solicitanteForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.solicitanteForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getSolicitante(id: string) {
    this.restService
      .get(`/solicitantes/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.solicitanteForm.patchValue({
            clienteId: result.clienteId,
            departamentoId: result.departamentoId,
            nome: result.nome,
            email: result.email,
            telefonesFixos: result.telefonesFixos,
            celular: result.celular,
            gerenteDepartamento: result.gerenteDepartamento,
            gestorContrato: result.gestorContrato,
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
    if (this.solicitanteForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/solicitantes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.solicitanteForm.reset()
                  this.router.navigate(["solicitantes/new"])
                } else {
                  this.router.navigate(["solicitantes"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/solicitantes", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.solicitanteForm.reset()
                  this.router.navigate(["solicitantes/new"])
                } else {
                  this.router.navigate(["solicitantes"])
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
    this.solicitanteForm.controls.clienteId.markAsDirty()
    this.solicitanteForm.controls.departamentoId.markAsDirty()
    this.solicitanteForm.controls.nome.markAsDirty()
    this.solicitanteForm.controls.email.markAsDirty()
  }

  goBack() {
    this.router.navigate(["solicitantes"])
  }
}
