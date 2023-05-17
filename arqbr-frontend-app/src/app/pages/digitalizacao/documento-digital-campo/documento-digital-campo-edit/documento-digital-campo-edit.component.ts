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
  selector: "app-documento-digital-campo-edit",
  templateUrl: "./documento-digital-campo-edit.component.html",
  styleUrls: ["./documento-digital-campo-edit.component.scss"],
})
export class DocumentoDigitalCampoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  documentoDigitalCampoForm = this.formBuilder.group({
    documentoDigitalId: null,
    campoDocumentoId: null,
    conteudo: '',
  })

  public readonly serviceApi = `${environment.baseUrl}/documentos-digitais-campos`
  public documentoDigitalIdService = `${environment.baseUrl}/documentos-digitais/select`
  public campoDocumentoIdService = `${environment.baseUrl}/campos-documento/select`

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
      this.subscriptions.add(this.getDocumentoDigitalCampo(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'documentoDigitalCampo'})
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
        action: () => this.save(this.documentoDigitalCampoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.documentoDigitalCampoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getDocumentoDigitalCampo(id: string) {
    this.restService
      .get(`/documentos-digitais-campos/${id}`)
      .subscribe({
        next: (result) => {
          this.documentoDigitalCampoForm.patchValue({
            documentoDigitalId: result.documentoDigitalId,
            campoDocumentoId: result.campoDocumentoId,
            conteudo: result.conteudo,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.documentoDigitalCampoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/documentos-digitais-campos/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.documentoDigitalCampoForm.reset()
                  this.router.navigate(["documentos-digitais-campos/new"])
                } else {
                  this.router.navigate(["documentos-digitais-campos"])
                }
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
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.documentoDigitalCampoForm.reset()
                  this.router.navigate(["documentos-digitais-campos/new"])
                } else {
                  this.router.navigate(["documentos-digitais-campos"])
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
    this.documentoDigitalCampoForm.controls.documentoDigitalId.markAsDirty()
    this.documentoDigitalCampoForm.controls.campoDocumentoId.markAsDirty()
    this.documentoDigitalCampoForm.controls.conteudo.markAsDirty()
  }

  goBack() {
    this.router.navigate(["documentos-digitais-campos"])
  }
}
