import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountByDepartamentoDocumentoDigitalUseCase } from './count-by-departamento-documento-digital-use-case'

class CountByDepartamentoDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const countByDepartamentoDocumentoDigitalUseCase = container.resolve(CountByDepartamentoDocumentoDigitalUseCase)

    const countByDepartamento = await countByDepartamentoDocumentoDigitalUseCase.execute()

    return response.status(countByDepartamento.statusCode).json(countByDepartamento)
  }
}

export { CountByDepartamentoDocumentoDigitalController }
