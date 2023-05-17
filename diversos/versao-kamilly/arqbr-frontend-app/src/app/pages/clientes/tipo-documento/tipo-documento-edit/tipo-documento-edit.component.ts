import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { TipoDocumentoInterface } from 'src/app/interfaces/clientes/tipo-documento'

@Component({
  selector: "app-tipo-documento-edit",
  templateUrl: "./tipo-documento-edit.component.html",
  styleUrls: ["./tipo-documento-edit.component.scss"],
})
export class TipoDocumentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any

  tipoDocumentoForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    descricao: '',
    composicaoLoteId: null,
    numeroPaginas: 0,
    mascaraNomeArquivo: '',
    prazoDescarteAnos: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/tipos-documento`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public composicaoLoteIdService = `${environment.baseUrl}/composicao-lotes/select`

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
            if (this.tipoDocumentoForm.valid) {
              this.save(this.tipoDocumentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.tipoDocumentoForm.valid) {
              this.saveAndNew(this.tipoDocumentoForm.value)
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
      this.subscriptions.add(this.getTipoDocumento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getTipoDocumento(id: string) {
    this.restService
      .get(`/tipos-documento/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.tipoDocumentoForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            departamentoId: result.departamentoId,
            descricao: result.descricao,
            composicaoLoteId: result.composicaoLoteId,
            numeroPaginas: result.numeroPaginas,
            mascaraNomeArquivo: result.mascaraNomeArquivo,
            prazoDescarteAnos: result.prazoDescarteAnos,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  clienteIdChange(event: string) {
    this.contratoIdService = `${environment.baseUrl}/contratos/select?clienteId=${event}`
    this.departamentoIdService = `${environment.baseUrl}/departamentos/select?clienteId=${event}`
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/tipos-documento/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["tipos-documento"])
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
          .post("/tipos-documento", data)
          .subscribe({
            next: () => {
              this.router.navigate(["tipos-documento"])
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
          .put(`/tipos-documento/${this.id}`, data)
          .subscribe({
            next: () => {
              this.tipoDocumentoForm.reset()
              this.router.navigate(["tipos-documento/new"])
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
          .post("/tipos-documento", data)
          .subscribe({
            next: () => {
              this.tipoDocumentoForm.reset()
              this.router.navigate(["tipos-documento/new"])
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
    this.tipoDocumentoForm.controls.clienteId.markAsDirty()
    this.tipoDocumentoForm.controls.contratoId.markAsDirty()
    this.tipoDocumentoForm.controls.departamentoId.markAsDirty()
    this.tipoDocumentoForm.controls.descricao.markAsDirty()
    this.tipoDocumentoForm.controls.composicaoLoteId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["tipos-documento"])
  }
}
