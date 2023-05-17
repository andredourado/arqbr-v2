import { IFrequenciaColetaDTO } from '@modules/clientes/dtos/i-frequencia-coleta-dto'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { FrequenciaColeta } from '@modules/clientes/infra/typeorm/entities/frequencia-coleta'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class FrequenciaColetaRepositoryInMemory implements IFrequenciaColetaRepository {
  frequenciaColetas: FrequenciaColeta[] = []

  // create
  async create ({
    clienteId,
    contratoId,
    frequenciaId,
    diasDoMes,
    segHorarioInicio,
    segHorarioFim,
    terHorarioInicio,
    terHorarioFim,
    quaHorarioInicio,
    quaHorarioFim,
    quiHorarioInicio,
    quiHorarioFim,
    sexHorarioInicio,
    sexHorarioFim,
    sabHorarioInicio,
    sabHorarioFim,
    domHorarioInicio,
    domHorarioFim,
    desabilitado
  }: IFrequenciaColetaDTO): Promise<HttpResponse> {
    const frequenciaColeta = new FrequenciaColeta()

    Object.assign(frequenciaColeta, {
      clienteId,
      contratoId,
      frequenciaId,
      diasDoMes,
      segHorarioInicio,
      segHorarioFim,
      terHorarioInicio,
      terHorarioFim,
      quaHorarioInicio,
      quaHorarioFim,
      quiHorarioInicio,
      quiHorarioFim,
      sexHorarioInicio,
      sexHorarioFim,
      sabHorarioInicio,
      sabHorarioFim,
      domHorarioInicio,
      domHorarioFim,
      desabilitado
    })

    this.frequenciaColetas.push(frequenciaColeta)

    return ok(frequenciaColeta)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredFrequenciaColetas = this.frequenciaColetas

    filteredFrequenciaColetas = filteredFrequenciaColetas.filter((frequenciaColeta) => {

      return false
    })

    return ok(filteredFrequenciaColetas.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredFrequenciaColetas = this.frequenciaColetas

    filteredFrequenciaColetas = filteredFrequenciaColetas.filter((frequenciaColeta) => {

      return false
    })

    return ok(filteredFrequenciaColetas)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    let filteredFrequenciaColetas = this.frequenciaColetas

    filteredFrequenciaColetas = filteredFrequenciaColetas.filter((frequenciaColeta) => {

      return false
    })

    return ok(filteredFrequenciaColetas.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const frequenciaColeta = this.frequenciaColetas.find((frequenciaColeta) => frequenciaColeta.id === id)

    if (typeof frequenciaColeta === 'undefined') {
      return notFound()
    } else {
      return ok(frequenciaColeta)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    frequenciaId,
    diasDoMes,
    segHorarioInicio,
    segHorarioFim,
    terHorarioInicio,
    terHorarioFim,
    quaHorarioInicio,
    quaHorarioFim,
    quiHorarioInicio,
    quiHorarioFim,
    sexHorarioInicio,
    sexHorarioFim,
    sabHorarioInicio,
    sabHorarioFim,
    domHorarioInicio,
    domHorarioFim,
    desabilitado
  }: IFrequenciaColetaDTO): Promise<HttpResponse> {
    const index = this.frequenciaColetas.findIndex((frequenciaColeta) => frequenciaColeta.id === id)

    this.frequenciaColetas[index].clienteId = clienteId
    this.frequenciaColetas[index].contratoId = contratoId
    this.frequenciaColetas[index].frequenciaId = frequenciaId
    this.frequenciaColetas[index].diasDoMes = diasDoMes
    this.frequenciaColetas[index].segHorarioInicio = segHorarioInicio
    this.frequenciaColetas[index].segHorarioFim = segHorarioFim
    this.frequenciaColetas[index].terHorarioInicio = terHorarioInicio
    this.frequenciaColetas[index].terHorarioFim = terHorarioFim
    this.frequenciaColetas[index].quaHorarioInicio = quaHorarioInicio
    this.frequenciaColetas[index].quaHorarioFim = quaHorarioFim
    this.frequenciaColetas[index].quiHorarioInicio = quiHorarioInicio
    this.frequenciaColetas[index].quiHorarioFim = quiHorarioFim
    this.frequenciaColetas[index].sexHorarioInicio = sexHorarioInicio
    this.frequenciaColetas[index].sexHorarioFim = sexHorarioFim
    this.frequenciaColetas[index].sabHorarioInicio = sabHorarioInicio
    this.frequenciaColetas[index].sabHorarioFim = sabHorarioFim
    this.frequenciaColetas[index].domHorarioInicio = domHorarioInicio
    this.frequenciaColetas[index].domHorarioFim = domHorarioFim
    this.frequenciaColetas[index].desabilitado = desabilitado

    return ok(this.frequenciaColetas[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.frequenciaColetas.findIndex((frequenciaColeta) => frequenciaColeta.id === id)

    this.frequenciaColetas.splice(index, 1)

    return ok(this.frequenciaColetas)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { FrequenciaColetaRepositoryInMemory }
