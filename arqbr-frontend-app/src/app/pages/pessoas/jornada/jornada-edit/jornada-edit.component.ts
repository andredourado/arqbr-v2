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
  selector: "app-jornada-edit",
  templateUrl: "./jornada-edit.component.html",
  styleUrls: ["./jornada-edit.component.scss"],
})
export class JornadaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  jornadaForm = this.formBuilder.group({
    descricao: '',
    segPrimeiraInicio: null,
    segPrimeiraFim: null,
    segSegundaInicio: null,
    segSegundaFim: null,
    terPrimeiraInicio: null,
    terPrimeiraFim: null,
    terSegundaInicio: null,
    terSegundaFim: null,
    quaPrimeiraInicio: null,
    quaPrimeiraFim: null,
    quaSegundaInicio: null,
    quaSegundaFim: null,
    quiPrimeiraInicio: null,
    quiPrimeiraFim: null,
    quiSegundaInicio: null,
    quiSegundaFim: null,
    sexPrimeiraInicio: null,
    sexPrimeiraFim: null,
    sexSegundaInicio: null,
    sexSegundaFim: null,
    sabPrimeiraInicio: null,
    sabPrimeiraFim: null,
    sabSegundaInicio: null,
    sabSegundaFim: null,
    domPrimeiraInicio: null,
    domPrimeiraFim: null,
    domSegundaInicio: null,
    domSegundaFim: null,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/jornadas`

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
      this.subscriptions.add(this.getJornada(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'pessoas', options: 'jornada'})
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
        action: () => this.save(this.jornadaForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.jornadaForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getJornada(id: string) {
    this.restService
      .get(`/jornadas/${id}`)
      .subscribe({
        next: (result) => {
          this.jornadaForm.patchValue({
            descricao: result.descricao,
            segPrimeiraInicio: result.segPrimeiraInicio,
            segPrimeiraFim: result.segPrimeiraFim,
            segSegundaInicio: result.segSegundaInicio,
            segSegundaFim: result.segSegundaFim,
            terPrimeiraInicio: result.terPrimeiraInicio,
            terPrimeiraFim: result.terPrimeiraFim,
            terSegundaInicio: result.terSegundaInicio,
            terSegundaFim: result.terSegundaFim,
            quaPrimeiraInicio: result.quaPrimeiraInicio,
            quaPrimeiraFim: result.quaPrimeiraFim,
            quaSegundaInicio: result.quaSegundaInicio,
            quaSegundaFim: result.quaSegundaFim,
            quiPrimeiraInicio: result.quiPrimeiraInicio,
            quiPrimeiraFim: result.quiPrimeiraFim,
            quiSegundaInicio: result.quiSegundaInicio,
            quiSegundaFim: result.quiSegundaFim,
            sexPrimeiraInicio: result.sexPrimeiraInicio,
            sexPrimeiraFim: result.sexPrimeiraFim,
            sexSegundaInicio: result.sexSegundaInicio,
            sexSegundaFim: result.sexSegundaFim,
            sabPrimeiraInicio: result.sabPrimeiraInicio,
            sabPrimeiraFim: result.sabPrimeiraFim,
            sabSegundaInicio: result.sabSegundaInicio,
            sabSegundaFim: result.sabSegundaFim,
            domPrimeiraInicio: result.domPrimeiraInicio,
            domPrimeiraFim: result.domPrimeiraFim,
            domSegundaInicio: result.domSegundaInicio,
            domSegundaFim: result.domSegundaFim,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.jornadaForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/jornadas/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.jornadaForm.reset()
                  this.router.navigate(["jornadas/new"])
                } else {
                  this.router.navigate(["jornadas"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/jornadas", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.jornadaForm.reset()
                  this.router.navigate(["jornadas/new"])
                } else {
                  this.router.navigate(["jornadas"])
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
    this.jornadaForm.controls.descricao.markAsDirty()
  }

  goBack() {
    this.router.navigate(["jornadas"])
  }
}
