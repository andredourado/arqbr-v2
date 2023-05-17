import { inject, injectable } from 'tsyringe'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  unidadeId: string
  nome: string
  email: string
  funcaoId: string
  gerente: boolean
  desabilitado: boolean
}

@injectable()
class CreatePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    unidadeId,
    nome,
    email,
    funcaoId,
    gerente,
    desabilitado
  }: IRequest): Promise<Pessoa> {
    const result = await this.pessoaRepository.create({
        unidadeId,
        nome,
        email,
        funcaoId,
        gerente,
        desabilitado
      })
      .then(pessoaResult => {
        return pessoaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePessoaUseCase }
