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
  selector: "app-volume-edit",
  templateUrl: "./volume-edit.component.html",
  styleUrls: ["./volume-edit.component.scss"],
})
export class VolumeEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any
  public literals: any = {}

  volumeForm = this.formBuilder.group({
    coletaId: null,
    identificador: '',
    arquivoFoto: '',
    comentario: '',
    localDeArmazenagem: null,
  })

  public readonly serviceApi = `${environment.baseUrl}/volumes`
  public coletaIdService = `${environment.baseUrl}/coletas/select`
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
      this.subscriptions.add(this.getVolume(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getLiterals() {
    this.languagesService.getLiterals({ type: 'edit', module: 'coleta', options: 'volume'})
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
        action: () => this.save(this.volumeForm.value)
      },
      {
        label: this.literals.saveAndNew,
        action: () => this.save(this.volumeForm.value, true)
      },
      {
        label: this.literals.cancel,
        action: this.goBack.bind(this),
      }
    )

    return
  }

  getVolume(id: string) {
    this.restService
      .get(`/volumes/${id}`)
      .subscribe({
        next: (result) => {
          this.volumeForm.patchValue({
            coletaId: result.coletaId,
            identificador: result.identificador,
            arquivoFoto: result.arquivoFoto,
            comentario: result.comentario,
            localDeArmazenagem: result.localDeArmazenagem,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data, willCreateAnother?: boolean) {
    if (this.volumeForm.valid) {
      if (this.id && this.getPageType(this.activatedRoute.snapshot.routeConfig.path) === 'edit') {
        this.subscriptions.add(
          this.restService
            .put(`/volumes/${this.id}`, data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.volumeForm.reset()
                  this.router.navigate(["volumes/new"])
                } else {
                  this.router.navigate(["volumes"])
                }
              },
              error: (error) => console.log(error),
            })
        )
      } else {
        this.subscriptions.add(
          this.restService
            .post("/volumes", data)
            .subscribe({
              next: () => {
                this.poNotification.success({
                  message: this.literals.saveSuccess,
                  duration: environment.poNotificationDuration
                })

                if (willCreateAnother) {
                  this.volumeForm.reset()
                  this.router.navigate(["volumes/new"])
                } else {
                  this.router.navigate(["volumes"])
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
    this.volumeForm.controls.coletaId.markAsDirty()
    this.volumeForm.controls.arquivoFoto.markAsDirty()
    this.volumeForm.controls.comentario.markAsDirty()
  }

  goBack() {
    this.router.navigate(["volumes"])
  }
}
