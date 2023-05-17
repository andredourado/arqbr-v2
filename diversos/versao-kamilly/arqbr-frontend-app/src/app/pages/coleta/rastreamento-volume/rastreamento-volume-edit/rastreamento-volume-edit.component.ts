import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { RastreamentoVolumeInterface } from 'src/app/interfaces/coleta/rastreamento-volume'

@Component({
  selector: "app-rastreamento-volume-edit",
  templateUrl: "./rastreamento-volume-edit.component.html",
  styleUrls: ["./rastreamento-volume-edit.component.scss"],
})
export class RastreamentoVolumeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  rastreamentoVolumeForm = this.formBuilder.group({
    volumeId: null,
    dataMovimentacao: null,
    horaMovimentacao: null,
    localDeArmazenagem: null,
    statusId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/rastreamento-volumes`
  public volumeIdService = `${environment.baseUrl}/volumes/select`
  public localDeArmazenagemService = `${environment.baseUrl}/plantas/select`
  public statusIdService = `${environment.baseUrl}/status/select`

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
            if (this.rastreamentoVolumeForm.valid) {
              this.save(this.rastreamentoVolumeForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.rastreamentoVolumeForm.valid) {
              this.saveAndNew(this.rastreamentoVolumeForm.value)
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
      this.subscriptions.add(this.getRastreamentoVolume(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getRastreamentoVolume(id: string) {
    this.restService
      .get(`/rastreamento-volumes/${id}`)
      .subscribe({
        next: (result) => {
          this.rastreamentoVolumeForm.patchValue({
            volumeId: result.volumeId,
            dataMovimentacao: result.dataMovimentacao ? result.dataMovimentacao.substring(0, 10) : null,
            horaMovimentacao: result.horaMovimentacao ? result.horaMovimentacao.substring(0, 10) : null,
            localDeArmazenagem: result.localDeArmazenagem,
            statusId: result.statusId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/rastreamento-volumes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["rastreamento-volumes"])
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
          .post("/rastreamento-volumes", data)
          .subscribe({
            next: () => {
              this.router.navigate(["rastreamento-volumes"])
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
          .put(`/rastreamento-volumes/${this.id}`, data)
          .subscribe({
            next: () => {
              this.rastreamentoVolumeForm.reset()
              this.router.navigate(["rastreamento-volumes/new"])
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
          .post("/rastreamento-volumes", data)
          .subscribe({
            next: () => {
              this.rastreamentoVolumeForm.reset()
              this.router.navigate(["rastreamento-volumes/new"])
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
    this.rastreamentoVolumeForm.controls.volumeId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["rastreamento-volumes"])
  }
}
