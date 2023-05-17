import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ServicoContratadoInterface } from 'src/app/interfaces/clientes/servico-contratado'

@Component({
  selector: "app-servico-contratado-edit",
  templateUrl: "./servico-contratado-edit.component.html",
  styleUrls: ["./servico-contratado-edit.component.scss"],
})
export class ServicoContratadoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any

  servicoContratadoForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    servicoId: null,
    unidadeSlaId: null,
    sla: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/servicos-contratados`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public servicoIdService = `${environment.baseUrl}/servicos/select`
  public unidadeSlaIdService = `${environment.baseUrl}/unidades-sla/select`

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
            if (this.servicoContratadoForm.valid) {
              this.save(this.servicoContratadoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.servicoContratadoForm.valid) {
              this.saveAndNew(this.servicoContratadoForm.value)
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
      this.subscriptions.add(this.getServicoContratado(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getServicoContratado(id: string) {
    this.restService
      .get(`/servicos-contratados/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.servicoContratadoForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            servicoId: result.servicoId,
            unidadeSlaId: result.unidadeSlaId,
            sla: result.sla,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/servicos-contratados/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["servicos-contratados"])
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
          .post("/servicos-contratados", data)
          .subscribe({
            next: () => {
              this.router.navigate(["servicos-contratados"])
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
          .put(`/servicos-contratados/${this.id}`, data)
          .subscribe({
            next: () => {
              this.servicoContratadoForm.reset()
              this.router.navigate(["servicos-contratados/new"])
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
          .post("/servicos-contratados", data)
          .subscribe({
            next: () => {
              this.servicoContratadoForm.reset()
              this.router.navigate(["servicos-contratados/new"])
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
    this.servicoContratadoForm.controls.clienteId.markAsDirty()
    this.servicoContratadoForm.controls.contratoId.markAsDirty()
    this.servicoContratadoForm.controls.servicoId.markAsDirty()
    this.servicoContratadoForm.controls.unidadeSlaId.markAsDirty()
    this.servicoContratadoForm.controls.sla.markAsDirty()
  }

  goBack() {
    this.router.navigate(["servicos-contratados"])
  }
}
