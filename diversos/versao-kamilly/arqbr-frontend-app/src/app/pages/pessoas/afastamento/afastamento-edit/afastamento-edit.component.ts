import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { AfastamentoInterface } from 'src/app/interfaces/pessoas/afastamento'

@Component({
  selector: "app-afastamento-edit",
  templateUrl: "./afastamento-edit.component.html",
  styleUrls: ["./afastamento-edit.component.scss"],
})
export class AfastamentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  afastamentoForm = this.formBuilder.group({
    pessoaId: null,
    tipoAfastamentoId: null,
    inicio: null,
    fim: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/afastamentos`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`
  public tipoAfastamentoIdService = `${environment.baseUrl}/tipos-afastamento/select`

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
            if (this.afastamentoForm.valid) {
              this.save(this.afastamentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.afastamentoForm.valid) {
              this.saveAndNew(this.afastamentoForm.value)
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
      this.subscriptions.add(this.getAfastamento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getAfastamento(id: string) {
    this.restService
      .get(`/afastamentos/${id}`)
      .subscribe({
        next: (result) => {
          this.afastamentoForm.patchValue({
            pessoaId: result.pessoaId,
            tipoAfastamentoId: result.tipoAfastamentoId,
            inicio: result.inicio ? result.inicio.substring(0, 10) : null,
            fim: result.fim ? result.fim.substring(0, 10) : null,
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
          .put(`/afastamentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["afastamentos"])
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
          .post("/afastamentos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["afastamentos"])
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
          .put(`/afastamentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.afastamentoForm.reset()
              this.router.navigate(["afastamentos/new"])
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
          .post("/afastamentos", data)
          .subscribe({
            next: () => {
              this.afastamentoForm.reset()
              this.router.navigate(["afastamentos/new"])
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
    this.afastamentoForm.controls.pessoaId.markAsDirty()
    this.afastamentoForm.controls.tipoAfastamentoId.markAsDirty()
    this.afastamentoForm.controls.inicio.markAsDirty()
    this.afastamentoForm.controls.fim.markAsDirty()
  }

  goBack() {
    this.router.navigate(["afastamentos"])
  }
}
