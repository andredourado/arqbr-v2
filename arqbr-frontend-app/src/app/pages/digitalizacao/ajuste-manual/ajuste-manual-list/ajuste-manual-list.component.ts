import { FormBuilder } from '@angular/forms';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from "@angular/common/http"
import { Subscription } from "rxjs"
import { finalize } from 'rxjs/operators'
import { PoDialogService, PoPageAction, PoPageSlideComponent, PoSelectOption, PoTableComponent } from "@po-ui/ng-components"
import { PermService } from 'src/app/services/perm.service'
import { FilterService } from "src/app/services/filter.service"
import { environment } from "src/environments/environment"
import { CampoDocumentoInterface } from 'src/app/interfaces/digitalizacao/campo-documento'
import { AuthService } from 'src/app/services/auth.service';

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
  selector: "/ajuste-manual-list",
  templateUrl: ".//ajuste-manual-list.component.html",
  styleUrls: ["./ajuste-manual-list.component.scss"],
})
export class AjusteManualListComponent implements OnInit, OnDestroy {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide: PoPageSlideComponent;

  @ViewChild(PoTableComponent, { static: true }) table: PoTableComponent
  public fields: Array<any> = [
    { property: "id", key: true, visible: false },
    { property: 'nomeArquivo', label: 'Nome do Arquivo', width: '25%' },
    { property: 'campo1', label: 'Campo 1' },
    { property: 'campo2', label: 'Campo 2' },
    { property: 'campo3', label: 'Campo 3' },
  ]
  public pageActions: Array<PoPageAction> = [
  ]
  
  public permissions: IPermissionsDTO
  public tableActions: PoPageAction[] = [
    { label: 'Editar', action: this.editItem.bind(this), icon: 'fa-solid fa-pen' }
  ]
  public listHeight: number
  public items: any
  public hasNext: boolean
  private page = 1
  private filter = ''
  public loading = false
  public canSeeDepartamento = false
  public totalDocumentos = 0
  public id: string

  public tiposDocumento: PoSelectOption[] = []
  public departamentoList: PoSelectOption[] = []
  public tipoDocumentoSelected = null
  public departamentoSelected = null
  public tipoDocumento: PoSelectOption = this.filterService.getTipoDocumento
  public departamento: PoSelectOption = this.filterService.getDepartamento

  filterForm = this.formBuilder.group({
    texto: null
  })

  private subscriptions = new Subscription()

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private filterService: FilterService
  ) { }


  // Funções de entradas e saídas

  ngOnInit() {
    this.getPermissions()
    this.subscriptions.add(this.getDepartamento())
    if (!this.canSeeDepartamento) {
      this.subscriptions.add(this.getTipoDocumento())
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private getAjustesManuais(props, merge: boolean = false) {
    this.subscriptions.add(
      this.httpClient.post(`${environment.baseUrl}/documentos-digitais/list`, props)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response: ListResponse) => {
            this.items = merge? this.items.concat(response.items):response.items
            this.hasNext = response.hasNext
          },
          error: (error) => console.log(error)
        })
    )
  }


  // Função de listagem dos itens

  changeTipoDocumento(value: string) {
    this.filterForm = this.formBuilder.group({
      texto: null
    })
    this.filterService.updateTipoDocumentoId(null)
    this.tipoDocumentoSelected = null
    const tipoDocumentoSelected = this.tiposDocumento.find(tipoDocumento => tipoDocumento.value === value) as any
    this.filterService.updateTipoDocumentoId(tipoDocumentoSelected.value)
    if (tipoDocumentoSelected) {
      this.tipoDocumentoSelected = tipoDocumentoSelected
      this.filterForm.addControl('texto', this.formBuilder.control(''))
      tipoDocumentoSelected.campos.map(campo => {
        if (this.filterService.getFilters) {
          this.filterForm.patchValue({ texto: this.filterService.getFilters['texto'] })
          this.filterForm.addControl(campo.id, this.formBuilder.control(this.filterService.getFilters[campo.id]))
        } else {
          this.filterForm.addControl(campo.id, this.formBuilder.control(''))
        }
      })
    }
    this.calculateListHeight()
  }


  changeDepartamento(value: string) {
    if (value) {
      this.getTipoDocumento(value)
    }
  }

  filterDocumentos(initialLoad: boolean) {
    this.filterService.filterDocumentos(this.tipoDocumento, this.departamento, initialLoad ? null : this.filterForm.value)
      .subscribe({
        next: (res: any) => {
          this.items = res.items
          this.hasNext = res.hasNext
          this.calculateListHeight(res.items)
          this.countDocumentos()
          console.log(res)
        }
      })
  }

  countDocumentos() {
    this.filterService.countDocumento(this.tipoDocumento, this.departamento)
      .subscribe({
        next: (res: any) => this.totalDocumentos = res.data.count
      })
  }

  clearFilter() {
    this.filterForm.reset()
    this.filterDocumentos(false)
  }

  getTipoDocumento(departamentoId?: string) {
    const url = departamentoId ? `/tipos-documento/select-filtered?departamentoId=${departamentoId}&filter=` : `/tipos-documento/select-filtered?filter=`
    this.httpClient.get(`${environment.baseUrl}${url}`)
      .subscribe({
        next: (res: ListResponse) => {
          this.tiposDocumento = res.items
          if (this.filterService.getTipoDocumentoId) {
            this.changeTipoDocumento(this.filterService.getTipoDocumentoId)
          }
        }
      })
  }

  getDepartamento() {
    this.httpClient.get(`${environment.baseUrl}/departamentos/select-filtered?filter=`)
      .subscribe({
        next: (res: ListResponse) => {
          this.departamentoList = res.items
          this.subscriptions.add(this.filterDocumentos(true))
        }
      })
  }

  getPermissions() {
    // this.canSeeDepartamento = this.authService.isAdmin || this.authService.isSuperUser || this.authService.isGestor
    console.log(this.canSeeDepartamento)
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
    this.router.navigate(['ajustes-manuais/new'])
  }

  editItem(item: CampoDocumentoInterface) {
    this.router.navigate([`ajustes-manuais/edit/${item.id}`])
  }

  showMoreItems() {
    const props = {
      page: ++this.page,
      pageSize: 50,
      order: 'ASC',
      search: null
    }

    if (this.hasNext) {
      this.loading = true
      this.getAjustesManuais(props, true)
    }
  }

  calculateListHeight(items?: ListResponse[]) {
    let listHeight = 0
    console.log('teste')
    if (items) {
      listHeight = (this.table.itemSize + 1) * (items.length + 1)
    } else {
      listHeight = (this.table.itemSize + 1) * (this.table.items.length + 1)
    }

    const reduce = this.tipoDocumentoSelected ? 388 : 320

    if (listHeight < window.innerHeight - reduce) {
      this.listHeight = 0
    } else {
      this.listHeight = window.innerHeight - reduce
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.calculateListHeight()
  }
}


