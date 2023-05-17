import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ClienteInterface } from 'src/app/interfaces/clientes/cliente'

@Component({
  selector: "app-cliente-edit",
  templateUrl: "./cliente-edit.component.html",
  styleUrls: ["./cliente-edit.component.scss"],
})
export class ClienteEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public estadoId = ''
  public result: any

  clienteForm = this.formBuilder.group({
    cnpj: '',
    nomeFantasia: '',
    razaoSocial: '',
    inscricaoEstadual: '',
    endereco: '',
    numero: '',
    complemento: '',
    estadoId: null,
    cidadeId: null,
    cep: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/clientes`
  public estadoIdService = `${environment.baseUrl}/estados/select`
  public cidadeIdService = `${environment.baseUrl}/cidades/select`

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
            if (this.clienteForm.valid) {
              this.save(this.clienteForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.clienteForm.valid) {
              this.saveAndNew(this.clienteForm.value)
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
      this.subscriptions.add(this.getCliente(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCliente(id: string) {
    this.restService
      .get(`/clientes/${id}`)
      .subscribe({
        next: (result) => {
          this.estadoId = result.estadoId
          this.clienteForm.patchValue({
            cnpj: result.cnpj,
            nomeFantasia: result.nomeFantasia,
            razaoSocial: result.razaoSocial,
            inscricaoEstadual: result.inscricaoEstadual,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
            estadoId: result.estadoId,
            cidadeId: result.cidadeId,
            cep: result.cep,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  estadoIdChange(event: string) {
    this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/clientes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["clientes"])
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
          .post("/clientes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["clientes"])
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
          .put(`/clientes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.clienteForm.reset()
              this.router.navigate(["clientes/new"])
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
          .post("/clientes", data)
          .subscribe({
            next: () => {
              this.clienteForm.reset()
              this.router.navigate(["clientes/new"])
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
    this.clienteForm.controls.cnpj.markAsDirty()
    this.clienteForm.controls.nomeFantasia.markAsDirty()
    this.clienteForm.controls.estadoId.markAsDirty()
    this.clienteForm.controls.cidadeId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["clientes"])
  }
}
