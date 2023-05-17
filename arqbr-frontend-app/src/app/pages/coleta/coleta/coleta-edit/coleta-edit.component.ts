import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { LanguagesService } from 'src/app/services/languages.service'

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
  public literals: any = {}

  coletaForm = this.formBuilder.group({
    clienteId: null,
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
  })

  public readonly serviceApi = `${environment.baseUrl}/coletas`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public solicitanteIdService = `${environment.baseUrl}/solicitantes/select`
  public pontoColetaIdService = `${environment.baseUrl}/pontos-coleta/select`
  public veiculoIdService = `${environment.baseUrl}/veiculos/select`
  public entregadorIdService = `${environment.baseUrl}/entregadores/select`

  subscriptions = new Subscription()

  public readonly pageActions: Array<PoPageAction> = []

  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public restService: RestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private poNotification: PoNotificationService,
    private languagesService: LanguagesService
  ) { }

  ngOnInit(): void {
    this.getLiterals()

    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.pageButtonsBuilder(this.getPageType(this.activatedRoute.snapshot.routeConfig.path))

    if (this.id) {
      this.subscriptions.add(this.getColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'coleta', options: 'coleta'})
      .subscribe({
        next: res => this.literals = res
      })
  }

  getPageType(route: string): string {
    switch (route) {
      case 'new':
        return 'new'
      case 'new/:id':
        return 'new'
      case 'edit':
        return 'edit'
      case 'edit/:id':
        return 'edit'
      case 'view/:id':
        return 'view'
    }
  }

  pageButtonsBuilder(pageType: string): null {
    if (pageType === 'view') {
      this.readonly = true

      this.pageActions.push(
        {
          label: this.literals.return,
          action: this.goBack.bind(this),
        }
      )
      return
    }

    this.pageActions.push(
      {
        label: this.literals.save,
        action: () => this.save(this.coletaForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.coletaForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
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
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
    this.pontoColetaIdService = `${environment.baseUrl}/pontos-coleta/select?clienteId=${event}`
  }

  departamentoIdChange(event: string) {
    this.solicitanteIdService = `${environment.baseUrl}/solicitantes/select?departamentoId=${event}`
  }

  save(data, willCreateAnother?: boolean) {
    if (this.coletaForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/coletas/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.coletaForm.reset()
                  this.router.navigate(["coletas/new"])
                } else {
                  this.router.navigate(["coletas"])
                }
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
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.coletaForm.reset()
                  this.router.navigate(["coletas/new"])
                } else {
                  this.router.navigate(["coletas"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      }
    } else {
      this.markAsDirty()
      this.poNotification.warning({
        message: this.literals.formError,
        duration: environment.poNotificationDuration
      })
    }
  }

  markAsDirty() {
    this.coletaForm.controls.clienteId.markAsDirty()
    this.coletaForm.controls.departamentoId.markAsDirty()
    this.coletaForm.controls.solicitanteId.markAsDirty()
    this.coletaForm.controls.volumes.markAsDirty()
    this.coletaForm.controls.arquivoFotoProtocolo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["coletas"])
  }
}
