import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { PoDynamicFormField, PoPageAction, PoNotificationService, PoNotification } from '@po-ui/ng-components'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from "src/environments/environment"
import { RestService } from "src/app/services/rest.service"
import { PlantaInterface } from 'src/app/interfaces/armazenamento/planta'

@Component({
  selector: "app-planta-edit",
  templateUrl: "./planta-edit.component.html",
  styleUrls: ["./planta-edit.component.scss"],
})
export class PlantaEditComponent implements OnInit, OnDestroy {
  public id: string
  public readonly = false
  public result: any

  plantaForm = this.formBuilder.group({
    unidadeId: null,
    nome: '',
    quantidadePosicoes: 0,
    desabilitado: false,
  })

  public readonly serviceApi = `${environment.baseUrl}/plantas`
  public unidadeIdService = `${environment.baseUrl}/unidades/select`

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
            if (this.plantaForm.valid) {
              this.save(this.plantaForm.value)
            } else {
              this.markAsDirty()
              this.poNotification.warning(this.formErrorNotification)
            }
          },
        },
        {
          label: "Salvar e novo",
          action: () => {
            if (this.plantaForm.valid) {
              this.saveAndNew(this.plantaForm.value)
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
      this.subscriptions.add(this.getPlanta(this.id))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPlanta(id: string) {
    this.restService
      .get(`/plantas/${id}`)
      .subscribe({
        next: (result) => {
          this.plantaForm.patchValue({
            unidadeId: result.unidadeId,
            nome: result.nome,
            quantidadePosicoes: result.quantidadePosicoes,
            desabilitado: result.desabilitado,
          })
        },
        error: (error) => console.log(error)
      })
  }

  save(data) {
    if (this.id) {
      this.subscriptions.add(
        this.restService
          .put(`/plantas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.router.navigate(["plantas"])
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
          .post("/plantas", data)
          .subscribe({
            next: () => {
              this.router.navigate(["plantas"])
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
          .put(`/plantas/${this.id}`, data)
          .subscribe({
            next: () => {
              this.plantaForm.reset()
              this.router.navigate(["plantas/new"])
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
          .post("/plantas", data)
          .subscribe({
            next: () => {
              this.plantaForm.reset()
              this.router.navigate(["plantas/new"])
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
    this.plantaForm.controls.unidadeId.markAsDirty()
    this.plantaForm.controls.nome.markAsDirty()
    this.plantaForm.controls.quantidadePosicoes.markAsDirty()
  }

  goBack() {
    this.router.navigate(["plantas"])
  }
}
