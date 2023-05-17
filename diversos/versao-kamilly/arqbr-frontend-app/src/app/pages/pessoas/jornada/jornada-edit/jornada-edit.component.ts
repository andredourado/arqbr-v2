import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { JornadaInterface } from 'src/app/interfaces/pessoas/jornada'

@Component({
  selector: "app-jornada-edit",
  templateUrl: "./jornada-edit.component.html",
  styleUrls: ["./jornada-edit.component.scss"],
})
export class JornadaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  jornadaForm = this.formBuilder.group({
    descricao: '',
    segPrimeiraInicio: null,
    segPrimeiraFim: null,
    segSegundaInicio: null,
    segSegundaFim: null,
    terPrimeiraInicio: null,
    terPrimeiraFim: null,
    terSegundaInicio: null,
    terSegundaFim: null,
    quaPrimeiraInicio: null,
    quaPrimeiraFim: null,
    quaSegundaInicio: null,
    quaSegundaFim: null,
    quiPrimeiraInicio: null,
    quiPrimeiraFim: null,
    quiSegundaInicio: null,
    quiSegundaFim: null,
    sexPrimeiraInicio: null,
    sexPrimeiraFim: null,
    sexSegundaInicio: null,
    sexSegundaFim: null,
    sabPrimeiraInicio: null,
    sabPrimeiraFim: null,
    sabSegundaInicio: null,
    sabSegundaFim: null,
    domPrimeiraInicio: null,
    domPrimeiraFim: null,
    domSegundaInicio: null,
    domSegundaFim: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/jornadas`

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
            if (this.jornadaForm.valid) {
              this.save(this.jornadaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.jornadaForm.valid) {
              this.saveAndNew(this.jornadaForm.value)
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
      this.subscriptions.add(this.getJornada(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getJornada(id: string) {
    this.restService
      .get(`/jornadas/${id}`)
      .subscribe({
        next: (result) => {
          this.jornadaForm.patchValue({
            descricao: result.descricao,
            segPrimeiraInicio: result.segPrimeiraInicio,
            segPrimeiraFim: result.segPrimeiraFim,
            segSegundaInicio: result.segSegundaInicio,
            segSegundaFim: result.segSegundaFim,
            terPrimeiraInicio: result.terPrimeiraInicio,
            terPrimeiraFim: result.terPrimeiraFim,
            terSegundaInicio: result.terSegundaInicio,
            terSegundaFim: result.terSegundaFim,
            quaPrimeiraInicio: result.quaPrimeiraInicio,
            quaPrimeiraFim: result.quaPrimeiraFim,
            quaSegundaInicio: result.quaSegundaInicio,
            quaSegundaFim: result.quaSegundaFim,
            quiPrimeiraInicio: result.quiPrimeiraInicio,
            quiPrimeiraFim: result.quiPrimeiraFim,
            quiSegundaInicio: result.quiSegundaInicio,
            quiSegundaFim: result.quiSegundaFim,
            sexPrimeiraInicio: result.sexPrimeiraInicio,
            sexPrimeiraFim: result.sexPrimeiraFim,
            sexSegundaInicio: result.sexSegundaInicio,
            sexSegundaFim: result.sexSegundaFim,
            sabPrimeiraInicio: result.sabPrimeiraInicio,
            sabPrimeiraFim: result.sabPrimeiraFim,
            sabSegundaInicio: result.sabSegundaInicio,
            sabSegundaFim: result.sabSegundaFim,
            domPrimeiraInicio: result.domPrimeiraInicio,
            domPrimeiraFim: result.domPrimeiraFim,
            domSegundaInicio: result.domSegundaInicio,
            domSegundaFim: result.domSegundaFim,
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
          .put(`/jornadas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["jornadas"])
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
          .post("/jornadas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["jornadas"])
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
          .put(`/jornadas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.jornadaForm.reset()
              this.router.navigate(["jornadas/new"])
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
          .post("/jornadas", data)
          .subscribe({
            next: () => {
              this.jornadaForm.reset()
              this.router.navigate(["jornadas/new"])
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
    this.jornadaForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["jornadas"])
  }
}
