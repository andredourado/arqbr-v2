import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { EscalaInterface } from 'src/app/interfaces/pessoas/escala'

@Component({
  selector: "app-escala-edit",
  templateUrl: "./escala-edit.component.html",
  styleUrls: ["./escala-edit.component.scss"],
})
export class EscalaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  escalaForm = this.formBuilder.group({
    pessoaId: null,
    jornadaId: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/escalas`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`
  public jornadaIdService = `${environment.baseUrl}/jornadas/select`

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
            if (this.escalaForm.valid) {
              this.save(this.escalaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.escalaForm.valid) {
              this.saveAndNew(this.escalaForm.value)
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
      this.subscriptions.add(this.getEscala(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getEscala(id: string) {
    this.restService
      .get(`/escalas/${id}`)
      .subscribe({
        next: (result) => {
          this.escalaForm.patchValue({
            pessoaId: result.pessoaId,
            jornadaId: result.jornadaId,
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
          .put(`/escalas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["escalas"])
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
          .post("/escalas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["escalas"])
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
          .put(`/escalas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.escalaForm.reset()
              this.router.navigate(["escalas/new"])
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
          .post("/escalas", data)
          .subscribe({
            next: () => {
              this.escalaForm.reset()
              this.router.navigate(["escalas/new"])
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
    this.escalaForm.controls.pessoaId.markAsDirty()
    this.escalaForm.controls.jornadaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["escalas"])
  }
}
