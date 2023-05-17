import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { UnidadeInterface } from 'src/app/interfaces/armazenamento/unidade'

@Component({
  selector: "app-unidade-edit",
  templateUrl: "./unidade-edit.component.html",
  styleUrls: ["./unidade-edit.component.scss"],
})
export class UnidadeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public estadoId = ''
  public result: any

  unidadeForm = this.formBuilder.group({
    estadoId: null,
    cidadeId: null,
    nome: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/unidades`
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
            if (this.unidadeForm.valid) {
              this.save(this.unidadeForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.unidadeForm.valid) {
              this.saveAndNew(this.unidadeForm.value)
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
      this.subscriptions.add(this.getUnidade(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getUnidade(id: string) {
    this.restService
      .get(`/unidades/${id}`)
      .subscribe({
        next: (result) => {
          this.estadoId = result.estadoId
          this.unidadeForm.patchValue({
            estadoId: result.estadoId,
            cidadeId: result.cidadeId,
            nome: result.nome,
            endereco: result.endereco,
            numero: result.numero,
            complemento: result.complemento,
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
          .put(`/unidades/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["unidades"])
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
          .post("/unidades", data)
          .subscribe({
            next: () => {
              this.router.navigate(["unidades"])
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
          .put(`/unidades/${this.id}`, data)
          .subscribe({
            next: () => {
              this.unidadeForm.reset()
              this.router.navigate(["unidades/new"])
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
          .post("/unidades", data)
          .subscribe({
            next: () => {
              this.unidadeForm.reset()
              this.router.navigate(["unidades/new"])
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
    this.unidadeForm.controls.estadoId.markAsDirty()
    this.unidadeForm.controls.cidadeId.markAsDirty()
    this.unidadeForm.controls.nome.markAsDirty()
  }

  goBack() {
    this.router.navigate(["unidades"])
  }
}
