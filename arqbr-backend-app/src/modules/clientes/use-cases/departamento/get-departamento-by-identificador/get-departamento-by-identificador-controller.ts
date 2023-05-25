import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDepartamentoByIdentificadorUseCase } from './get-departamento-by-identificador-use-case'

class GetDepartamentoByIdentificadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const identificador = request.params.identificador
    const getDepartamentoByIdentificadorUseCase = container.resolve(GetDepartamentoByIdentificadorUseCase)
    const departamento = await getDepartamentoByIdentificadorUseCase.execute(identificador)

    return response.status(departamento.statusCode).json(departamento.data)
  }
}

export { GetDepartamentoByIdentificadorController }
