import { inject, injectable } from 'tsyringe'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  unidadeId: string
  nome: string
  email: string
  funcaoId: string
  gerente: boolean
  desabilitado: boolean
}

@injectable()
class UpdatePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    id,
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.update({
      id,
      unidadeId,
      nome,
      email,
      funcaoId,
      gerente,
      desabilitado
    })

    return pessoa
  }
}

export { UpdatePessoaUseCase }
