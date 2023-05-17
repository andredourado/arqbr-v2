import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DocumentoInterface } from 'src/app/interfaces/classificacao/documento'

@Component({
  selector: "app-documento-edit",
  templateUrl: "./documento-edit.component.html",
  styleUrls: ["./documento-edit.component.scss"],
})
export class DocumentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public clienteId = ''
  public result: any

  documentoForm = this.formBuilder.group({
    clienteId: null,
    contratoId: null,
    departamentoId: null,
    tipoDocumentoId: null,
    nip: '',
    caixaArqbr: '',
    conteudoQrCode: '',
    statusId: null,
    pessoaId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/documentos`
  public clienteIdService = `${environment.baseUrl}/clientes/select`
  public contratoIdService = `${environment.baseUrl}/contratos/select`
  public departamentoIdService = `${environment.baseUrl}/departamentos/select`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`
  public statusIdService = `${environment.baseUrl}/status/select`
  public pessoaIdService = `${environment.baseUrl}/pessoas/select`

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
            if (this.documentoForm.valid) {
              this.save(this.documentoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.documentoForm.valid) {
              this.saveAndNew(this.documentoForm.value)
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
      this.subscriptions.add(this.getDocumento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getDocumento(id: string) {
    this.restService
      .get(`/documentos/${id}`)
      .subscribe({
        next: (result) => {
          this.clienteId = result.clienteId
          this.documentoForm.patchValue({
            clienteId: result.clienteId,
            contratoId: result.contratoId,
            departamentoId: result.departamentoId,
            tipoDocumentoId: result.tipoDocumentoId,
            nip: result.nip,
            caixaArqbr: result.caixaArqbr,
            conteudoQrCode: result.conteudoQrCode,
            statusId: result.statusId,
            pessoaId: result.pessoaId,
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
          .put(`/documentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos"])
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
          .post("/documentos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos"])
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
          .put(`/documentos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.documentoForm.reset()
              this.router.navigate(["documentos/new"])
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
          .post("/documentos", data)
          .subscribe({
            next: () => {
              this.documentoForm.reset()
              this.router.navigate(["documentos/new"])
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
    this.documentoForm.controls.clienteId.markAsDirty()
    this.documentoForm.controls.contratoId.markAsDirty()
    this.documentoForm.controls.departamentoId.markAsDirty()
    this.documentoForm.controls.tipoDocumentoId.markAsDirty()
    this.documentoForm.controls.pessoaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["documentos"])
  }
}
