import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePontoColetaUseCase } from './create-ponto-coleta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    } = request.body

    const createPontoColetaUseCase = container.resolve(CreatePontoColetaUseCase)

    const result = await createPontoColetaUseCase.execute({
        clienteId,
        descricao,
        estadoId,
        cidadeId,
        endereco,
        numero,
        complemento,
        pessoaContatoNome,
        pessoaContatoCelular,
        desabilitado
      })
      .then(pontoColetaResult => {
        return pontoColetaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePontoColetaController }
