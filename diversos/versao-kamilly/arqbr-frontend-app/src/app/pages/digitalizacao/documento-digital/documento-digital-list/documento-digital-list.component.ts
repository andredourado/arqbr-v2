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
  selector: "/documento-digital-list",
  templateUrl: ".//documento-digital-list.component.html",
})
export class DocumentoDigitalListComponent implements OnInit, OnDestroy {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;

  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  public readonly fields: Array<any> = [
    { property: "id", key: true, visible: false },
    { property: 'versaoDocumentoDescricaoVersao', label: 'Versão' },
    { property: 'nomeArquivo', label: 'Nome do Arquivo' },
  ]
  public permissions: IPermissionsDTO
  public tableActions: PoPageAction[] = [
    { label: 'Visualizar', action: this.editItem.bind(this), icon: 'fa-solid fa-eye' }
  ]
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
    this.subscriptions.add(this.getDocumentoDigital())
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  // Função de listagem dos itens

  changeTipoDocumento(value: string) {
    this.tipoDocumentoSelected = this.tiposDocumento.find(tipoDocumento => tipoDocumento.value === value)
    this.tipoDocumentoSelected.campos.map(campo => {
      this.filterForm.addControl(campo.value, this.formBuilder.control(''))
    })
  }

  filterDocumentos() {
    console.log(this.tipoDocumentoSelected)
    const props = {
      page: 1,
      pageSize: 50,
      order: 'ASC',
      search: null,
      filter: this.filterForm.value
    }

    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/list`, props)
      .subscribe({
        next: (res: any) => {
          this.items = res.items
          this.hasNext = res.hasNext
        }
      })
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

  getDocumentoDigital() {
    const props = {
      page: 1,
      pageSize: 50,
      order: 'ASC',
      search: null
    }

    this.httpClient.post(`${environment.baseUrl}/documentos-digitais/list`, props)
      .pipe(finalize(() => this.loading = false))
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
      this.httpClient.get(`${environment.baseUrl}/documentos-digitais?page=1&pageSize=10&search=${search}`)
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
    this.router.navigate(['documentos-digitais/new'])
  }

  editItem(item: CampoDocumentoInterface) {
    this.router.navigate([`documentos-digitais/edit/${item.nomeArquivo}`])
  }

  viewItem(item: CampoDocumentoInterface) {
    if (item.id) this.router.navigate([`documentos-digitais/view/${item.id}`])
    else this.router.navigate([`documentos-digitais/view/${this.getSelectedItemsKeys()[0].id}`])
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
      this.httpClient.delete(`${environment.baseUrl}/documentos-digitais/${item.id}`)
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
      this.restService.deleteAll('/documentos-digitais', ids)
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
    this.getDocumentoDigital()
  }

  showMoreItems() {
    if (this.hasNext) {
      this.loading = true
      this.subscriptions.add(
        this.httpClient.get(`${environment.baseUrl}/documentos-digitais?page=${this.page += 1}&pageSize=10&search=${this.filter}`)
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


