import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { ColetaInterface } from 'src/app/interfaces/coleta/coleta'

@Component({
  selector: "app-coleta-edit",
  templateUrl: "./coleta-edit.component.html",
  styleUrls: ["./coleta-edit.component.scss"],
})
export class ColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public departamentoId = ''
  public result: any

  coletaForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    solicitanteId: null,
    pontoColetaId: null,
    identificador: '',
    dataProgramadaColeta: null,
    horaProgramadaColeta: null,
    volumes: 0,
    veiculoId: null,
    entregadorId: null,
    dataEfetivaColeta: null,
    horaEfetivaColeta: null,
    arquivoFotoProtocolo: '',
    statusId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/coletas`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public solicitanteIdService = `${environment.baseUrl}/solicitantes/select`
  public pontoColetaIdService = `${environment.baseUrl}/pontos-coleta/select`
  public veiculoIdService = `${environment.baseUrl}/veiculos/select`
  public entregadorIdService = `${environment.baseUrl}/entregadores/select`
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
            if (this.coletaForm.valid) {
              this.save(this.coletaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.coletaForm.valid) {
              this.saveAndNew(this.coletaForm.value)
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
      this.subscriptions.add(this.getColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getColeta(id: string) {
    this.restService
      .get(`/coletas/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.departamentoId = result.departamentoId
          this.coletaForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            departamentoId: result.departamentoId,
            solicitanteId: result.solicitanteId,
            pontoColetaId: result.pontoColetaId,
            identificador: result.identificador,
            dataProgramadaColeta: result.dataProgramadaColeta ? result.dataProgramadaColeta.substring(0, 10) : null,
            horaProgramadaColeta: result.horaProgramadaColeta ? result.horaProgramadaColeta.substring(0, 10) : null,
            volumes: result.volumes,
            veiculoId: result.veiculoId,
            entregadorId: result.entregadorId,
            dataEfetivaColeta: result.dataEfetivaColeta ? result.dataEfetivaColeta.substring(0, 10) : null,
            horaEfetivaColeta: result.horaEfetivaColeta ? result.horaEfetivaColeta.substring(0, 10) : null,
            arquivoFotoProtocolo: result.arquivoFotoProtocolo,
            statusId: result.statusId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
  }

  departamentoIdChange(event: string) {
    this.solicitanteIdService = `${environment.baseUrl}/solicitantes/select?departamentoId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/coletas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["coletas"])
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
          .post("/coletas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["coletas"])
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
          .put(`/coletas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.coletaForm.reset()
              this.router.navigate(["coletas/new"])
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
          .post("/coletas", data)
          .subscribe({
            next: () => {
              this.coletaForm.reset()
              this.router.navigate(["coletas/new"])
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
    this.coletaForm.controls.clienteId.markAsDirty()
    this.coletaForm.controls.contratoId.markAsDirty()
    this.coletaForm.controls.departamentoId.markAsDirty()
    this.coletaForm.controls.solicitanteId.markAsDirty()
    this.coletaForm.controls.volumes.markAsDirty()
    this.coletaForm.controls.arquivoFotoProtocolo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["coletas"])
  }
}
