import { FormArray, FormBuilder } from '@angular/forms';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from "@angular/common/http"
import { Subscription } from "rxjs"
import { finalize } from 'rxjs/operators'
import { PoDialogService, PoNotificationService, PoPageAction, PoPageSlideComponent, PoSelectOption, PoTableComponent } from "@po-ui/ng-components"
import { PermService } from 'src/app/services/perm.service'
import { RestService } from "src/app/services/rest.service"
import { environment } from "src/environments/environment"
import { CampoDocumentoInterface } from 'src/app/interfaces/digitalizacao/campo-documento'

interface ListResponse {
  items: any[]
  hasNext: boolean
}

interface IPermissionsDTO {
  permitAll: boolean
  permitCreate: boolean
  permitRestore: boolean
  permitUpdate: boolean
  permitDelete: boolean
}

@Component({
  selector: "/campo-documento-list",
  templateUrl: ".//campo-documento-list.component.html",
})
export class CampoDocumentoListComponent implements OnInit, OnDestroy {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;

  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  public readonly fields: Array<any> = [
    { property: "id", key: true, visible: false },
    { property: 'versaoDocumentoDescricaoVersao', label: 'Versão' },
    { property: 'nomeCampo', label: 'Nome do Campo' },
    { property: 'identificador', label: 'Identificador' }
  ]
  public permissions: IPermissionsDTO
  public pageActions: PoPageAction[] = []
  public tableActions: PoPageAction[] = []
  public listHeight: number
  public items: any
  public hasNext: boolean
  private page = 1
  private filter = ''
  public loading = false

  public tiposDocumento: PoSelectOption[] = []
  public tipoDocumentoSelected = null

  filterForm = this.formBuilder.group({})

  private subscriptions = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private permService: PermService,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService,
    private restService: RestService,
    private router: Router,
  ) {}


  // Funções de entradas e saídas

  ngOnInit() {
    this.permissions = this.permService.getPermissions(this.activatedRoute.snapshot.routeConfig.path)

    this.subscriptions.add(this.getTipoDocumento())
    this.subscriptions.add(this.getCampoDocumento())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  // Função de listagem dos itens

  changeTipoDocumento(value: string) {
    this.tipoDocumentoSelected = this.tiposDocumento.find(tipoDocumento => tipoDocumento.value === value)
    this.tipoDocumentoSelected.campos.map(campo => {
      this.filterForm.addControl(campo, this.formBuilder.control(''))
    })
  }

  filterDocumentos() {
    console.log(this.filterForm.value)
  }


  getTipoDocumento() {
    this.httpClient.get(`${environment.baseUrl}/versoes-documento/select?filter=`)
      .subscribe({
        next: (res: ListResponse) => {
          this.tiposDocumento = res.items
          console.log(res.items)
        }
      })
  }

  getCampoDocumento() {
    this.httpClient.get(`${environment.baseUrl}/campos-documento?page=1&pageSize=10`)
    .pipe(finalize(() => {
      this.loading = false

      if (this.permissions.permitAll) {
        this.pageActions = [
          { label: 'Novo', action: this.newItem.bind(this), icon: 'fa-solid fa-plus' },
          { label: 'Editar', action: this.editItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-pen' },
          { label: 'Visualizar', action: this.viewItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-eye' },
          { label: 'Excluir', action: this.excludeItems.bind(this), disabled: this.multipleItemIsSelected.bind(this), icon: 'fa-solid fa-trash' },
          { label: 'Atualizar', action: this.updateItems.bind(this), icon: 'fa-solid fa-arrows-rotate' }
        ]
        this.tableActions = [
          { label: 'Editar', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' },
          { label: 'Visualizar', action: this.viewItem.bind(this), icon: 'fa-solid fa-eye' },
          { label: 'Excluir', action: this.excludeItem.bind(this), icon: 'fa-solid fa-trash' }
        ]
      } else {
        const pageActions = []
        if (this.permissions.permitCreate) {
          pageActions.push({ label: 'Novo', action: this.newItem.bind(this), icon: 'fa-solid fa-plus' })
        }

        if (this.permissions.permitUpdate) {
          pageActions.push({ label: 'Editar', action: this.editItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-pen' })
          this.tableActions.push({ label: 'Editar', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' })
        }

        if (this.permissions.permitRestore) {
          pageActions.push({ label: 'Visualizar', action: this.viewItem.bind(this), disabled: this.singleItemIsSelected.bind(this), icon: 'fa-solid fa-eye' })
          this.tableActions.push({ label: 'Visualizar', action: this.viewItem.bind(this), icon: 'fa-solid fa-eye' })
        }

        if (this.permissions.permitDelete) {
          pageActions.push({ label: 'Excluir', action: this.excludeItems.bind(this), disabled: this.multipleItemIsSelected.bind(this), icon: 'fa-solid fa-trash' })
          this.tableActions.push({ label: 'Excluir', action: this.excludeItem.bind(this), icon: 'fa-solid fa-trash' })
        }

        pageActions.push({ label: 'Atualizar', action: this.updateItems.bind(this), icon: 'fa-solid fa-arrows-rotate' })
        this.pageActions = pageActions
      }
    }))
      .subscribe({
        next: (response: ListResponse) => {
          this.items = response.items
          this.hasNext = response.hasNext

          this.calculateListHeight(response.items)
        },
        error: (error) => console.log(error)
      })
  }



  
  public openPage() {
    this.pageSlide.open();
  }

  public closePage() {
    this.pageSlide.close();
  }



  // Funções básicas da tabela

  search(search: string) {
    this.filter = search
    this.page = 1
    this.loading = true
    this.subscriptions.add(
      this.httpClient.get(`${environment.baseUrl}/campos-documento?page=1&pageSize=10&search=${search}`)
        .subscribe({
          next: (response: ListResponse) => this.items = response.items,
          error: (error) => console.log(error)
        })
    )
  }

  getSelectedItemsKeys() {
    if (this.items.length > 0) {
      const resources = this.items.filter(item => item.$selected)

      if (resources.length === 0) {
        return
      }
      return resources
    }
  }

  singleItemIsSelected() {
    if (this.getSelectedItemsKeys()) {
      return this.getSelectedItemsKeys().length !== 1
    }
    return true
  }

  multipleItemIsSelected() {
    return !this.getSelectedItemsKeys()
  }

  clickDisclaimers(event) {
    this.filter = ''
    if (event.length === 0) this.search('')
  }

  newItem() {
    this.router.navigate(['campos-documento/new'])
  }

  editItem(item: CampoDocumentoInterface) {
    if (item) this.router.navigate([`campos-documento/edit/${item.id}`])
    else this.router.navigate([`campos-documento/edit/${this.getSelectedItemsKeys()[0].id}`])
  }

  viewItem(item: CampoDocumentoInterface) {
    if (item.id) this.router.navigate([`campos-documento/view/${item.id}`])
    else this.router.navigate([`campos-documento/view/${this.getSelectedItemsKeys()[0].id}`])
  }

  excludeItem(item: CampoDocumentoInterface) {
    this.poDialogService.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.',
      confirm: this.removeItem.bind(this, item)
    })
  }

  excludeItems() {
    const ids = this.getSelectedItemsKeys().map(item => item.id)

    if (ids.length > 0) {
      this.poDialogService.confirm({
        title: 'Confirmar exclusão em lote',
        message: 'Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.',
        confirm: this.removeItems.bind(this, ids)
      })
    }
  }

  removeItem(item: CampoDocumentoInterface) {
    this.subscriptions.add(
      this.httpClient.delete(`${environment.baseUrl}/campos-documento/${item.id}`)
        .subscribe({
          next: (response: ListResponse) => {
            this.poNotificationService.success({
              message: 'Item excluído com sucesso.',
              duration: environment.poNotificationDuration
            })
            this.items = response.items
          }
        })
    )
  }

  removeItems(ids: CampoDocumentoInterface[]) {
    this.subscriptions.add(
      this.restService.deleteAll('/campos-documento', ids)
        .subscribe({
          next: (response: ListResponse) => {
            this.poNotificationService.success({
              message: 'Itens excluídos com sucesso.',
              duration: environment.poNotificationDuration
            })
            this.items = response.items
          }
        })
    )
  }

  updateItems() {
    this.page = 1
    this.getCampoDocumento()
  }

  showMoreItems() {
    if (this.hasNext) {
      this.loading = true
      this.subscriptions.add(
        this.httpClient.get(`${environment.baseUrl}/campos-documento?page=${this.page += 1}&pageSize=10&search=${this.filter}`)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (response: ListResponse) => {
              this.items = this.items.concat(response.items)
              this.hasNext = response.hasNext
            },
            error: (error) => console.log(error)
          })
      )
    }
  }

  calculateListHeight(items?: ListResponse[]) {
    let listHeight = 0

    if (items) {
      listHeight = (this.table.itemSize + 1) * (items.length + 1)
    } else {
      listHeight = (this.table.itemSize + 1) * (this.table.items.length + 1)
    }

    if (listHeight < window.innerHeight - 230) {
      this.listHeight = 0
    } else {
      this.listHeight = window.innerHeight - 230
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.calculateListHeight()
  }
}
