import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { UnidadeSlaInterface } from 'src/app/interfaces/comum/unidade-sla'

@Component({
  selector: "app-unidade-sla-edit",
  templateUrl: "./unidade-sla-edit.component.html",
  styleUrls: ["./unidade-sla-edit.component.scss"],
})
export class UnidadeSlaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  unidadeSlaForm = this.formBuilder.group({
    descricao: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/unidades-sla`

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
            if (this.unidadeSlaForm.valid) {
              this.save(this.unidadeSlaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.unidadeSlaForm.valid) {
              this.saveAndNew(this.unidadeSlaForm.value)
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
      this.subscriptions.add(this.getUnidadeSla(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getUnidadeSla(id: string) {
    this.restService
      .get(`/unidades-sla/${id}`)
      .subscribe({
        next: (result) => {
          this.unidadeSlaForm.patchValue({
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
          .put(`/unidades-sla/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["unidades-sla"])
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
          .post("/unidades-sla", data)
          .subscribe({
            next: () => {
              this.router.navigate(["unidades-sla"])
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
          .put(`/unidades-sla/${this.id}`, data)
          .subscribe({
            next: () => {
              this.unidadeSlaForm.reset()
              this.router.navigate(["unidades-sla/new"])
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
          .post("/unidades-sla", data)
          .subscribe({
            next: () => {
              this.unidadeSlaForm.reset()
              this.router.navigate(["unidades-sla/new"])
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
    this.unidadeSlaForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["unidades-sla"])
  }
}
