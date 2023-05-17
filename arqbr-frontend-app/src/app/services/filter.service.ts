import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PoSelectOption } from '@po-ui/ng-components'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private tipoDocumentoId: string 
  private tipoDocumento: PoSelectOption
  private departamentoId: string 
  private departamento: PoSelectOption
  private filters: any

  constructor(
    private httpClient: HttpClient
  ) { }

  filterDocumentos(tipoDocumento: PoSelectOption, departamento: PoSelectOption, data?: any) {
    if (data) {
      this.tipoDocumento = tipoDocumento
      this.departamento = departamento
      this.filters = data
    }
    const props = {
      page: 1,
      pageSize: 50,
      order: 'ASC',
      search: null,
      tipoDocumentoId: this.tipoDocumentoId,
      departamentoId: this.departamentoId
    }

    if (this.filters) {
      props['filter'] = Object.entries(this.filters).length !== 0 ? this.filters : null
    }

    return this.httpClient.post(`${environment.baseUrl}/documentos-digitais/list`, props)
  }

  countDocumento(tipoDocumento: PoSelectOption, departamento: PoSelectOption, data?: any) {
    if (data) {
      this.tipoDocumento = tipoDocumento
      this.departamento = departamento
      this.filters = data
    }
    const props = {
      search: null,
      tipoDocumentoId: this.tipoDocumentoId,
      departamentoId: this.departamentoId
    }

    if (this.filters) {
      props['filter'] = Object.entries(this.filters).length !== 0 ? this.filters : null
    }

    return this.httpClient.post(`${environment.baseUrl}/documentos-digitais/count`, props)
  }

  get getTipoDocumentoId() {
    return this.tipoDocumentoId
  }

  get getFilters() {
    return this.filters
  }

  get getTipoDocumento() {
    return this.tipoDocumento
  }

  updateTipoDocumentoId(value) {
    this.tipoDocumentoId = value
  }

  get getDepartamentoId() {
    return this.departamentoId
  }

  get getDepartamento() {
    return this.departamento
  }

  updateDepartamentoId(value) {
    this.departamentoId = value
  }
}
