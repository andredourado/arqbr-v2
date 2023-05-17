import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateClienteUseCase } from './create-cliente-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cnpj,
      nomeFantasia,
      razaoSocial,
      inscricaoEstadual,
      endereco,
      numero,
      complemento,
      estadoId,
      cidadeId,
      cep,
      desabilitado
    } = request.body

    const createClienteUseCase = container.resolve(CreateClienteUseCase)

    const result = await createClienteUseCase.execute({
        cnpj,
        nomeFantasia,
        razaoSocial,
        inscricaoEstadual,
        endereco,
        numero,
        complemento,
        estadoId,
        cidadeId,
        cep,
        desabilitado
      })
      .then(clienteResult => {
        return clienteResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateClienteController }
