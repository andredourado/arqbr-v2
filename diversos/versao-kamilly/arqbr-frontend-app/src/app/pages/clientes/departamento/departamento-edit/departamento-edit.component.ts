import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DepartamentoInterface } from 'src/app/interfaces/clientes/departamento'

@Component({
  selector: "app-departamento-edit",
  templateUrl: "./departamento-edit.component.html",
  styleUrls: ["./departamento-edit.component.scss"],
})
export class DepartamentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  departamentoForm = this.formBuilder.group({
    clienteId: null,
    nome: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/departamentos`
  public clienteIdService = `${environment.baseUrl}/clientes/select`

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
            if (this.departamentoForm.valid) {
              this.save(this.departamentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.departamentoForm.valid) {
              this.saveAndNew(this.departamentoForm.value)
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
      this.subscriptions.add(this.getDepartamento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getDepartamento(id: string) {
    this.restService
      .get(`/departamentos/${id}`)
      .subscribe({
        next: (result) => {
          this.departamentoForm.patchValue({
            clienteId: result.clienteId,
            nome: result.nome,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/departamentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["departamentos"])
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
          .post("/departamentos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["departamentos"])
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
          .put(`/departamentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.departamentoForm.reset()
              this.router.navigate(["departamentos/new"])
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
          .post("/departamentos", data)
          .subscribe({
            next: () => {
              this.departamentoForm.reset()
              this.router.navigate(["departamentos/new"])
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
    this.departamentoForm.controls.clienteId.markAsDirty()
    this.departamentoForm.controls.nome.markAsDirty()
  }

  goBack() {
    this.router.navigate(["departamentos"])
  }
}
