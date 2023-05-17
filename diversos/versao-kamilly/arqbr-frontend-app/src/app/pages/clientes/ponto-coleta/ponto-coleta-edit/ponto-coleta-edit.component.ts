import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { PontoColetaInterface } from 'src/app/interfaces/clientes/ponto-coleta'

@Component({
  selector: "app-ponto-coleta-edit",
  templateUrl: "./ponto-coleta-edit.component.html",
  styleUrls: ["./ponto-coleta-edit.component.scss"],
})
export class PontoColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public estadoId = ''
  public result: any

  pontoColetaForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    descricao: '',
    estadoId: null,
    cidadeId: null,
    endereco: '',
    numero: '',
    complemento: '',
    pessoaContatoNome: '',
    pessoaContatoCelular: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/pontos-coleta`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
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
            if (this.pontoColetaForm.valid) {
              this.save(this.pontoColetaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.pontoColetaForm.valid) {
              this.saveAndNew(this.pontoColetaForm.value)
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
      this.subscriptions.add(this.getPontoColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPontoColeta(id: string) {
    this.restService
      .get(`/pontos-coleta/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.estadoId = result.estadoId
          this.pontoColetaForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            descricao: result.descricao,
            estadoId: result.estadoId,
            cidadeId: result.cidadeId,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
            pessoaContatoNome: result.pessoaContatoNome,
            pessoaContatoCelular: result.pessoaContatoCelular,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
  }

  estadoIdChange(event: string) {
    this.cidadeIdService = `${environment.baseUrl}/cidades/select?estadoId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/pontos-coleta/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["pontos-coleta"])
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
          .post("/pontos-coleta", data)
          .subscribe({
            next: () => {
              this.router.navigate(["pontos-coleta"])
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
          .put(`/pontos-coleta/${this.id}`, data)
          .subscribe({
            next: () => {
              this.pontoColetaForm.reset()
              this.router.navigate(["pontos-coleta/new"])
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
          .post("/pontos-coleta", data)
          .subscribe({
            next: () => {
              this.pontoColetaForm.reset()
              this.router.navigate(["pontos-coleta/new"])
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
    this.pontoColetaForm.controls.clienteId.markAsDirty()
    this.pontoColetaForm.controls.contratoId.markAsDirty()
    this.pontoColetaForm.controls.descricao.markAsDirty()
    this.pontoColetaForm.controls.estadoId.markAsDirty()
    this.pontoColetaForm.controls.cidadeId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["pontos-coleta"])
  }
}
