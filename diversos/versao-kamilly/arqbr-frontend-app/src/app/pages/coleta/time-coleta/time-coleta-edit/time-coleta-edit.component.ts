import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { TimeColetaInterface } from 'src/app/interfaces/coleta/time-coleta'

@Component({
  selector: "app-time-coleta-edit",
  templateUrl: "./time-coleta-edit.component.html",
  styleUrls: ["./time-coleta-edit.component.scss"],
})
export class TimeColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  timeColetaForm = this.formBuilder.group({
    coletaId: null,
    pessoaId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/times-coleta`
  public coletaIdService = `${environment.baseUrl}/coletas/select`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`

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
            if (this.timeColetaForm.valid) {
              this.save(this.timeColetaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.timeColetaForm.valid) {
              this.saveAndNew(this.timeColetaForm.value)
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
      this.subscriptions.add(this.getTimeColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getTimeColeta(id: string) {
    this.restService
      .get(`/times-coleta/${id}`)
      .subscribe({
        next: (result) => {
          this.timeColetaForm.patchValue({
            coletaId: result.coletaId,
            pessoaId: result.pessoaId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/times-coleta/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["times-coleta"])
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
          .post("/times-coleta", data)
          .subscribe({
            next: () => {
              this.router.navigate(["times-coleta"])
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
          .put(`/times-coleta/${this.id}`, data)
          .subscribe({
            next: () => {
              this.timeColetaForm.reset()
              this.router.navigate(["times-coleta/new"])
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
          .post("/times-coleta", data)
          .subscribe({
            next: () => {
              this.timeColetaForm.reset()
              this.router.navigate(["times-coleta/new"])
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
    this.timeColetaForm.controls.coletaId.markAsDirty()
    this.timeColetaForm.controls.pessoaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["times-coleta"])
  }
}
