import { Router } from 'express'
import { CreateDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/create-definicao-extracao/create-definicao-extracao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const definicaoExtracaoRoutes = Router()

const createDefinicaoExtracaoController = new CreateDefinicaoExtracaoController()


definicaoExtracaoRoutes.post('/', ensureAuthenticated, createDefinicaoExtracaoController.handle )


export { definicaoExtracaoRoutes }
