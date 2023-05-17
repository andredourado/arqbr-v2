import { inject, injectable } from 'tsyringe'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  nome: string
  desabilitado: boolean
}

@injectable()
class CreateDepartamentoUseCase {
  constructor(
    @inject('DepartamentoRepository')
    private departamentoRepository: IDepartamentoRepository
  ) {}

  async execute({
    clienteId,
    nome,
    desabilitado
  }: IRequest): Promise<Departamento> {
    const result = await this.departamentoRepository.create({
        clienteId,
        nome,
        desabilitado
      })
      .then(departamentoResult => {
        return departamentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateDepartamentoUseCase }
