import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { FrequenciaColetaInterface } from 'src/app/interfaces/clientes/frequencia-coleta'

@Component({
  selector: "app-frequencia-coleta-edit",
  templateUrl: "./frequencia-coleta-edit.component.html",
  styleUrls: ["./frequencia-coleta-edit.component.scss"],
})
export class FrequenciaColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any

  frequenciaColetaForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    frequenciaId: null,
    diasDoMes: '',
    segHorarioInicio: null,
    segHorarioFim: null,
    terHorarioInicio: null,
    terHorarioFim: null,
    quaHorarioInicio: null,
    quaHorarioFim: null,
    quiHorarioInicio: null,
    quiHorarioFim: null,
    sexHorarioInicio: null,
    sexHorarioFim: null,
    sabHorarioInicio: null,
    sabHorarioFim: null,
    domHorarioInicio: null,
    domHorarioFim: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/frequencia-coletas`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public frequenciaIdService = `${environment.baseUrl}/frequencias/select`

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
            if (this.frequenciaColetaForm.valid) {
              this.save(this.frequenciaColetaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.frequenciaColetaForm.valid) {
              this.saveAndNew(this.frequenciaColetaForm.value)
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
      this.subscriptions.add(this.getFrequenciaColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getFrequenciaColeta(id: string) {
    this.restService
      .get(`/frequencia-coletas/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.frequenciaColetaForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            frequenciaId: result.frequenciaId,
            diasDoMes: result.diasDoMes,
            segHorarioInicio: result.segHorarioInicio,
            segHorarioFim: result.segHorarioFim,
            terHorarioInicio: result.terHorarioInicio,
            terHorarioFim: result.terHorarioFim,
            quaHorarioInicio: result.quaHorarioInicio,
            quaHorarioFim: result.quaHorarioFim,
            quiHorarioInicio: result.quiHorarioInicio,
            quiHorarioFim: result.quiHorarioFim,
            sexHorarioInicio: result.sexHorarioInicio,
            sexHorarioFim: result.sexHorarioFim,
            sabHorarioInicio: result.sabHorarioInicio,
            sabHorarioFim: result.sabHorarioFim,
            domHorarioInicio: result.domHorarioInicio,
            domHorarioFim: result.domHorarioFim,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/frequencia-coletas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["frequencia-coletas"])
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
          .post("/frequencia-coletas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["frequencia-coletas"])
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
          .put(`/frequencia-coletas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.frequenciaColetaForm.reset()
              this.router.navigate(["frequencia-coletas/new"])
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
          .post("/frequencia-coletas", data)
          .subscribe({
            next: () => {
              this.frequenciaColetaForm.reset()
              this.router.navigate(["frequencia-coletas/new"])
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
    this.frequenciaColetaForm.controls.clienteId.markAsDirty()
    this.frequenciaColetaForm.controls.contratoId.markAsDirty()
    this.frequenciaColetaForm.controls.frequenciaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["frequencia-coletas"])
  }
}
