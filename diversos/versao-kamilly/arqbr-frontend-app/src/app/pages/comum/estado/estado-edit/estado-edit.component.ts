import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { EstadoInterface } from 'src/app/interfaces/comum/estado'

@Component({
  selector: "app-estado-edit",
  templateUrl: "./estado-edit.component.html",
  styleUrls: ["./estado-edit.component.scss"],
})
export class EstadoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  estadoForm = this.formBuilder.group({
    uf: '',
    nomeEstado: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/estados`

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
            if (this.estadoForm.valid) {
              this.save(this.estadoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.estadoForm.valid) {
              this.saveAndNew(this.estadoForm.value)
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
      this.subscriptions.add(this.getEstado(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getEstado(id: string) {
    this.restService
      .get(`/estados/${id}`)
      .subscribe({
        next: (result) => {
          this.estadoForm.patchValue({
            uf: result.uf,
            nomeEstado: result.nomeEstado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/estados/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["estados"])
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
          .post("/estados", data)
          .subscribe({
            next: () => {
              this.router.navigate(["estados"])
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
          .put(`/estados/${this.id}`, data)
          .subscribe({
            next: () => {
              this.estadoForm.reset()
              this.router.navigate(["estados/new"])
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
          .post("/estados", data)
          .subscribe({
            next: () => {
              this.estadoForm.reset()
              this.router.navigate(["estados/new"])
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
    this.estadoForm.controls.uf.markAsDirty()
    this.estadoForm.controls.nomeEstado.markAsDirty()
  }

  goBack() {
    this.router.navigate(["estados"])
  }
}
