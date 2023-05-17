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
  selector: "app-rastreamento-volume-edit",
  templateUrl: "./rastreamento-volume-edit.component.html",
  styleUrls: ["./rastreamento-volume-edit.component.scss"],
})
export class RastreamentoVolumeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  rastreamentoVolumeForm = this.formBuilder.group({
    volumeId: null,
    dataMovimentacao: null,
    horaMovimentacao: null,
    localDeArmazenagem: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/rastreamento-volumes`
  public volumeIdService = `${environment.baseUrl}/volumes/select`
  public localDeArmazenagemService = `${environment.baseUrl}/plantas/select`

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
      this.subscriptions.add(this.getRastreamentoVolume(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'coleta', options: 'rastreamentoVolume'})
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
        action: () => this.save(this.rastreamentoVolumeForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.rastreamentoVolumeForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
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
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.rastreamentoVolumeForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/rastreamento-volumes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.rastreamentoVolumeForm.reset()
                  this.router.navigate(["rastreamento-volumes/new"])
                } else {
                  this.router.navigate(["rastreamento-volumes"])
                }
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
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.rastreamentoVolumeForm.reset()
                  this.router.navigate(["rastreamento-volumes/new"])
                } else {
                  this.router.navigate(["rastreamento-volumes"])
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
    this.rastreamentoVolumeForm.controls.volumeId.markAsDirty()
  }

  goBack() {
    this.router.navigate(["rastreamento-volumes"])
  }
}
