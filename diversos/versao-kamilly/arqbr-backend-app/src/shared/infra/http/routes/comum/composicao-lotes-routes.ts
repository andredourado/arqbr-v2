import { Router } from 'express'
import { CreateComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/create-composicao-lote/create-composicao-lote-controller'
import { ListComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/list-composicao-lote/list-composicao-lote-controller'
import { CountComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/count-composicao-lote/count-composicao-lote-controller'
import { SelectComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/select-composicao-lote/select-composicao-lote-controller'
import { IdSelectComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/id-select-composicao-lote/id-select-composicao-lote-controller'
import { GetComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/get-composicao-lote/get-composicao-lote-controller'
import { UpdateComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/update-composicao-lote/update-composicao-lote-controller'
import { DeleteComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/delete-composicao-lote/delete-composicao-lote-controller'
import { MultiDeleteComposicaoLoteController } from '@modules/comum/use-cases/composicao-lote/multi-delete-composicao-lote/multi-delete-composicao-lote-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const composicaoLotesRoutes = Router()

const createComposicaoLoteController = new CreateComposicaoLoteController()
const listComposicaoLoteController = new ListComposicaoLoteController()
const countComposicaoLoteController = new CountComposicaoLoteController()
const selectComposicaoLoteController = new SelectComposicaoLoteController()
const idSelectComposicaoLoteController = new IdSelectComposicaoLoteController()
const getComposicaoLoteController = new GetComposicaoLoteController()
const updateComposicaoLoteController = new UpdateComposicaoLoteController()
const deleteComposicaoLoteController = new DeleteComposicaoLoteController()
const multiDeleteComposicaoLoteController = new MultiDeleteComposicaoLoteController()

composicaoLotesRoutes.post('/', ensureAuthenticated, createComposicaoLoteController.handle )
composicaoLotesRoutes.get('/', ensureAuthenticated, listComposicaoLoteController.handle)
composicaoLotesRoutes.post('/count', ensureAuthenticated, countComposicaoLoteController.handle)
composicaoLotesRoutes.get('/select/:id', ensureAuthenticated, idSelectComposicaoLoteController.handle)
composicaoLotesRoutes.get('/select', ensureAuthenticated, selectComposicaoLoteController.handle)
composicaoLotesRoutes.get('/:id', ensureAuthenticated, getComposicaoLoteController.handle)
composicaoLotesRoutes.put('/:id', ensureAuthenticated, updateComposicaoLoteController.handle)
composicaoLotesRoutes.delete('/:id', ensureAuthenticated, deleteComposicaoLoteController.handle)
composicaoLotesRoutes.delete('/', ensureAuthenticated, multiDeleteComposicaoLoteController.handle)

export { composicaoLotesRoutes }
