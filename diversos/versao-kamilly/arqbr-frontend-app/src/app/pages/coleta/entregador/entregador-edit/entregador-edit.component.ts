import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { EntregadorInterface } from 'src/app/interfaces/coleta/entregador'

@Component({
  selector: "app-entregador-edit",
  templateUrl: "./entregador-edit.component.html",
  styleUrls: ["./entregador-edit.component.scss"],
})
export class EntregadorEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  entregadorForm = this.formBuilder.group({
    cpfCnpj: '',
    nome: '',
    email: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    telefonesFixos: '',
    celular: '',
    capacidade: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/entregadores`

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
            if (this.entregadorForm.valid) {
              this.save(this.entregadorForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.entregadorForm.valid) {
              this.saveAndNew(this.entregadorForm.value)
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
      this.subscriptions.add(this.getEntregador(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getEntregador(id: string) {
    this.restService
      .get(`/entregadores/${id}`)
      .subscribe({
        next: (result) => {
          this.entregadorForm.patchValue({
            cpfCnpj: result.cpfCnpj,
            nome: result.nome,
            email: result.email,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
            cep: result.cep,
            telefonesFixos: result.telefonesFixos,
            celular: result.celular,
            capacidade: result.capacidade,
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
          .put(`/entregadores/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["entregadores"])
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
          .post("/entregadores", data)
          .subscribe({
            next: () => {
              this.router.navigate(["entregadores"])
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
          .put(`/entregadores/${this.id}`, data)
          .subscribe({
            next: () => {
              this.entregadorForm.reset()
              this.router.navigate(["entregadores/new"])
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
          .post("/entregadores", data)
          .subscribe({
            next: () => {
              this.entregadorForm.reset()
              this.router.navigate(["entregadores/new"])
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
    this.entregadorForm.controls.cpfCnpj.markAsDirty()
    this.entregadorForm.controls.nome.markAsDirty()
    this.entregadorForm.controls.email.markAsDirty()
    this.entregadorForm.controls.capacidade.markAsDirty()
  }

  goBack() {
    this.router.navigate(["entregadores"])
  }
}
