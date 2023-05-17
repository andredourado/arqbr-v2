import { inject, injectable } from 'tsyringe'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  nome: string
  desabilitado: boolean
}

@injectable()
class UpdateDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    id,
    clienteId,
    nome,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const departamento = await this.departamentoRepository.update({
      id,
      clienteId,
      nome,
      desabilitado
    })

    return departamento
  }
}

export { UpdateDepartamentoUseCase }
