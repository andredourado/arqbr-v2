import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { DocumentoDigitalCampoInterface } from 'src/app/interfaces/digitalizacao/documento-digital-campo'

@Component({
  selector: "app-documento-digital-campo-edit",
  templateUrl: "./documento-digital-campo-edit.component.html",
  styleUrls: ["./documento-digital-campo-edit.component.scss"],
})
export class DocumentoDigitalCampoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  documentoDigitalCampoForm = this.formBuilder.group({
    documentoDigitalId: null,
    campoId: null,
    conteudo: '',
    indiceQualidadeExtracao: 0,
    pessoaId: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/documentos-digitais-campos`
  public documentoDigitalIdService = `${environment.baseUrl}/documentos-digitais/select`
  public campoIdService = `${environment.baseUrl}/documentos-digitais/select`
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
            if (this.documentoDigitalCampoForm.valid) {
              this.save(this.documentoDigitalCampoForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.documentoDigitalCampoForm.valid) {
              this.saveAndNew(this.documentoDigitalCampoForm.value)
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
      this.subscriptions.add(this.getDocumentoDigitalCampo(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getDocumentoDigitalCampo(id: string) {
    this.restService
      .get(`/documentos-digitais-campos/${id}`)
      .subscribe({
        next: (result) => {
          this.documentoDigitalCampoForm.patchValue({
            documentoDigitalId: result.documentoDigitalId,
            campoId: result.campoId,
            conteudo: result.conteudo,
            indiceQualidadeExtracao: result.indiceQualidadeExtracao,
            pessoaId: result.pessoaId,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/documentos-digitais-campos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos-digitais-campos"])
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
          .post("/documentos-digitais-campos", data)
          .subscribe({
            next: () => {
              this.router.navigate(["documentos-digitais-campos"])
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
          .put(`/documentos-digitais-campos/${this.id}`, data)
          .subscribe({
            next: () => {
              this.documentoDigitalCampoForm.reset()
              this.router.navigate(["documentos-digitais-campos/new"])
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
          .post("/documentos-digitais-campos", data)
          .subscribe({
            next: () => {
              this.documentoDigitalCampoForm.reset()
              this.router.navigate(["documentos-digitais-campos/new"])
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
    this.documentoDigitalCampoForm.controls.documentoDigitalId.markAsDirty()
    this.documentoDigitalCampoForm.controls.campoId.markAsDirty()
    this.documentoDigitalCampoForm.controls.conteudo.markAsDirty()
    this.documentoDigitalCampoForm.controls.pessoaId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["documentos-digitais-campos"])
  }
}
