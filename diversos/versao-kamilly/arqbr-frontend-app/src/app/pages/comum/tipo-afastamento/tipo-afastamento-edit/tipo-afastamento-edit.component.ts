import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { TipoAfastamentoInterface } from 'src/app/interfaces/comum/tipo-afastamento'

@Component({
  selector: "app-tipo-afastamento-edit",
  templateUrl: "./tipo-afastamento-edit.component.html",
  styleUrls: ["./tipo-afastamento-edit.component.scss"],
})
export class TipoAfastamentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  tipoAfastamentoForm = this.formBuilder.group({
    descricao: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/tipos-afastamento`

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
            if (this.tipoAfastamentoForm.valid) {
              this.save(this.tipoAfastamentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.tipoAfastamentoForm.valid) {
              this.saveAndNew(this.tipoAfastamentoForm.value)
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
      this.subscriptions.add(this.getTipoAfastamento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getTipoAfastamento(id: string) {
    this.restService
      .get(`/tipos-afastamento/${id}`)
      .subscribe({
        next: (result) => {
          this.tipoAfastamentoForm.patchValue({
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
          .put(`/tipos-afastamento/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["tipos-afastamento"])
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
          .post("/tipos-afastamento", data)
          .subscribe({
            next: () => {
              this.router.navigate(["tipos-afastamento"])
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
          .put(`/tipos-afastamento/${this.id}`, data)
          .subscribe({
            next: () => {
              this.tipoAfastamentoForm.reset()
              this.router.navigate(["tipos-afastamento/new"])
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
          .post("/tipos-afastamento", data)
          .subscribe({
            next: () => {
              this.tipoAfastamentoForm.reset()
              this.router.navigate(["tipos-afastamento/new"])
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
    this.tipoAfastamentoForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["tipos-afastamento"])
  }
}
