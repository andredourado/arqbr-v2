import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { StatusInterface } from 'src/app/interfaces/comum/status'

@Component({
  selector: "app-status-edit",
  templateUrl: "./status-edit.component.html",
  styleUrls: ["./status-edit.component.scss"],
})
export class StatusEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  statusForm = this.formBuilder.group({
    servicoId: null,
    sequencia: '',
    descricao: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/statuses`
  public servicoIdService = `${environment.baseUrl}/servicos/select`

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
            if (this.statusForm.valid) {
              this.save(this.statusForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.statusForm.valid) {
              this.saveAndNew(this.statusForm.value)
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
      this.subscriptions.add(this.getStatus(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getStatus(id: string) {
    this.restService
      .get(`/statuses/${id}`)
      .subscribe({
        next: (result) => {
          this.statusForm.patchValue({
            servicoId: result.servicoId,
            sequencia: result.sequencia,
            descricao: result.descricao,
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
          .put(`/statuses/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["statuses"])
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
          .post("/statuses", data)
          .subscribe({
            next: () => {
              this.router.navigate(["statuses"])
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
          .put(`/statuses/${this.id}`, data)
          .subscribe({
            next: () => {
              this.statusForm.reset()
              this.router.navigate(["statuses/new"])
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
          .post("/statuses", data)
          .subscribe({
            next: () => {
              this.statusForm.reset()
              this.router.navigate(["statuses/new"])
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
    this.statusForm.controls.servicoId.markAsDirty()
    this.statusForm.controls.sequencia.markAsDirty()
    this.statusForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["statuses"])
  }
}
