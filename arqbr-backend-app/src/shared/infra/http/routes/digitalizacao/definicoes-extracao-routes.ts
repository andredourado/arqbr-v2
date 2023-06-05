import { Router } from 'express'
import { CreateDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/create-definicao-extracao/create-definicao-extracao-controller'
import { ListDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/list-definicao-extracao/list-definicao-extracao-controller'
import { CountDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/count-definicao-extracao/count-definicao-extracao-controller'
import { SelectDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/select-definicao-extracao/select-definicao-extracao-controller'
import { IdSelectDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/id-select-definicao-extracao/id-select-definicao-extracao-controller'
import { GetDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/get-definicao-extracao/get-definicao-extracao-controller'
import { UpdateDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/update-definicao-extracao/update-definicao-extracao-controller'
import { DeleteDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/delete-definicao-extracao/delete-definicao-extracao-controller'
import { MultiDeleteDefinicaoExtracaoController } from '@modules/digitalizacao/use-cases/definicao-extracao/multi-delete-definicao-extracao/multi-delete-definicao-extracao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const definicaoExtracaoRoutes = Router()

const createDefinicaoExtracaoController = new CreateDefinicaoExtracaoController()
const listDefinicaoExtracaoController = new ListDefinicaoExtracaoController()
const countDefinicaoExtracaoController = new CountDefinicaoExtracaoController()
const selectDefinicaoExtracaoController = new SelectDefinicaoExtracaoController()
const idSelectDefinicaoExtracaoController = new IdSelectDefinicaoExtracaoController()
const getDefinicaoExtracaoController = new GetDefinicaoExtracaoController()
const updateDefinicaoExtracaoController = new UpdateDefinicaoExtracaoController()
const deleteDefinicaoExtracaoController = new DeleteDefinicaoExtracaoController()
const multiDeleteDefinicaoExtracaoController = new MultiDeleteDefinicaoExtracaoController()


definicaoExtracaoRoutes.post('/', ensureAuthenticated, createDefinicaoExtracaoController.handle )
definicaoExtracaoRoutes.post('/list', ensureAuthenticated, listDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.post('/count', ensureAuthenticated, countDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.get('/select/:id', ensureAuthenticated, idSelectDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.get('/select', ensureAuthenticated, selectDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.get('/:id', ensureAuthenticated, getDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.put('/:id', ensureAuthenticated, updateDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.delete('/:id', ensureAuthenticated, deleteDefinicaoExtracaoController.handle)
definicaoExtracaoRoutes.delete('/', ensureAuthenticated, multiDeleteDefinicaoExtracaoController.handle)


export { definicaoExtracaoRoutes }
