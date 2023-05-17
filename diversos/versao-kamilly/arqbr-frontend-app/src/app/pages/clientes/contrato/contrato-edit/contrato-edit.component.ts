import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ContratoInterface } from 'src/app/interfaces/clientes/contrato'

@Component({
  selector: "app-contrato-edit",
  templateUrl: "./contrato-edit.component.html",
  styleUrls: ["./contrato-edit.component.scss"],
})
export class ContratoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  contratoForm = this.formBuilder.group({
    clienteId: null,
    identificador: '',
    aceitaServicosTerceiros: false,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/contratos`
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
            if (this.contratoForm.valid) {
              this.save(this.contratoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.contratoForm.valid) {
              this.saveAndNew(this.contratoForm.value)
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
      this.subscriptions.add(this.getContrato(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getContrato(id: string) {
    this.restService
      .get(`/contratos/${id}`)
      .subscribe({
        next: (result) => {
          this.contratoForm.patchValue({
            clienteId: result.clienteId,
            identificador: result.identificador,
            aceitaServicosTerceiros: result.aceitaServicosTerceiros,
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
          .put(`/contratos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["contratos"])
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
          .post("/contratos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["contratos"])
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
          .put(`/contratos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.contratoForm.reset()
              this.router.navigate(["contratos/new"])
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
          .post("/contratos", data)
          .subscribe({
            next: () => {
              this.contratoForm.reset()
              this.router.navigate(["contratos/new"])
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
    this.contratoForm.controls.clienteId.markAsDirty()
    this.contratoForm.controls.identificador.markAsDirty()
  }

  goBack() {
    this.router.navigate(["contratos"])
  }
}
