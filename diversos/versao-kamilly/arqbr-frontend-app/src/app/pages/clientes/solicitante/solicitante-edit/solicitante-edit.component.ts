import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { SolicitanteInterface } from 'src/app/interfaces/clientes/solicitante'

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

  public formErrorNotification: PoNotification = {
    message: "Formulário precisa ser preenchido corretamente.",
    duration: 4000,
  }

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    if (this.activatedRoute.snapshot.routeConfig.path.slice(-8) === 'view/:id') {
      this.readonly = true

      this.pageActions.push(
        {
          label: "Fechar",
          action: this.goBack.bind(this),
        }
      )
    } else {
      this.pageActions.push(
        {
          label: "Salvar",
          action: () => {
            if (this.solicitanteForm.valid) {
              this.save(this.solicitanteForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.solicitanteForm.valid) {
              this.saveAndNew(this.solicitanteForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Cancelar",
          action: this.goBack.bind(this),
        }
      )
    }

    if (this.id) {
      this.subscriptions.add(this.getSolicitante(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
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

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/solicitantes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["solicitantes"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
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
              this.router.navigate(["solicitantes"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
    }
  }

  saveAndNew(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/solicitantes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.solicitanteForm.reset()
              this.router.navigate(["solicitantes/new"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
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
              this.solicitanteForm.reset()
              this.router.navigate(["solicitantes/new"])
              this.poNotification.success({
                message: "Registro salvo com sucesso!",
                duration: environment.poNotificationDuration
              })
            },
            error: (error) => console.log(error),
          })
      )
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
