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
  selector: "app-frequencia-coleta-edit",
  templateUrl: "./frequencia-coleta-edit.component.html",
  styleUrls: ["./frequencia-coleta-edit.component.scss"],
})
export class FrequenciaColetaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  frequenciaColetaForm = this.formBuilder.group({
    clienteId: null,
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
      this.subscriptions.add(this.getFrequenciaColeta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'clientes', options: 'frequenciaColeta'})
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
        action: () => this.save(this.frequenciaColetaForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.frequenciaColetaForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getFrequenciaColeta(id: string) {
    this.restService
      .get(`/frequencia-coletas/${id}`)
      .subscribe({
        next: (result) => {
          this.frequenciaColetaForm.patchValue({
            clienteId: result.clienteId,
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

  save(data, willCreateAnother?: boolean) {
    if (this.frequenciaColetaForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/frequencia-coletas/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.frequenciaColetaForm.reset()
                  this.router.navigate(["frequencia-coletas/new"])
                } else {
                  this.router.navigate(["frequencia-coletas"])
                }
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
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.frequenciaColetaForm.reset()
                  this.router.navigate(["frequencia-coletas/new"])
                } else {
                  this.router.navigate(["frequencia-coletas"])
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
    this.frequenciaColetaForm.controls.clienteId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["frequencia-coletas"])
  }
}
