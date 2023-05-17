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
  selector: "app-campo-documento-edit",
  templateUrl: "./campo-documento-edit.component.html",
  styleUrls: ["./campo-documento-edit.component.scss"],
})
export class CampoDocumentoEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  campoDocumentoForm = this.formBuilder.group({
    tipoDocumentoId: null,
    nomeCampo: '',
    titulo: '',
    metodoExtracao: '',
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/campos-documento`
  public tipoDocumentoIdService = `${environment.baseUrl}/tipos-documento/select`

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
      this.subscriptions.add(this.getCampoDocumento(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'digitalizacao', options: 'campoDocumento'})
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
        action: () => this.save(this.campoDocumentoForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.campoDocumentoForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getCampoDocumento(id: string) {
    this.restService
      .get(`/campos-documento/${id}`)
      .subscribe({
        next: (result) => {
          this.campoDocumentoForm.patchValue({
            tipoDocumentoId: result.tipoDocumentoId,
            nomeCampo: result.nomeCampo,
            titulo: result.titulo,
            metodoExtracao: result.metodoExtracao,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.campoDocumentoForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/campos-documento/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.campoDocumentoForm.reset()
                  this.router.navigate(["campos-documento/new"])
                } else {
                  this.router.navigate(["campos-documento"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/campos-documento", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.campoDocumentoForm.reset()
                  this.router.navigate(["campos-documento/new"])
                } else {
                  this.router.navigate(["campos-documento"])
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
    this.campoDocumentoForm.controls.tipoDocumentoId.markAsDirty()
    this.campoDocumentoForm.controls.nomeCampo.markAsDirty()
    this.campoDocumentoForm.controls.titulo.markAsDirty()
    this.campoDocumentoForm.controls.metodoExtracao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["campos-documento"])
  }
}
