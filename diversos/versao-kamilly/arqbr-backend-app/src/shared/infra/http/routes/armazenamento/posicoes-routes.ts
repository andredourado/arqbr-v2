import { Router } from 'express'
import { CreatePosicaoController } from '@modules/armazenamento/use-cases/posicao/create-posicao/create-posicao-controller'
import { ListPosicaoController } from '@modules/armazenamento/use-cases/posicao/list-posicao/list-posicao-controller'
import { CountPosicaoController } from '@modules/armazenamento/use-cases/posicao/count-posicao/count-posicao-controller'
import { SelectPosicaoController } from '@modules/armazenamento/use-cases/posicao/select-posicao/select-posicao-controller'
import { IdSelectPosicaoController } from '@modules/armazenamento/use-cases/posicao/id-select-posicao/id-select-posicao-controller'
import { GetPosicaoController } from '@modules/armazenamento/use-cases/posicao/get-posicao/get-posicao-controller'
import { UpdatePosicaoController } from '@modules/armazenamento/use-cases/posicao/update-posicao/update-posicao-controller'
import { DeletePosicaoController } from '@modules/armazenamento/use-cases/posicao/delete-posicao/delete-posicao-controller'
import { MultiDeletePosicaoController } from '@modules/armazenamento/use-cases/posicao/multi-delete-posicao/multi-delete-posicao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const posicoesRoutes = Router()

const createPosicaoController = new CreatePosicaoController()
const listPosicaoController = new ListPosicaoController()
const countPosicaoController = new CountPosicaoController()
const selectPosicaoController = new SelectPosicaoController()
const idSelectPosicaoController = new IdSelectPosicaoController()
const getPosicaoController = new GetPosicaoController()
const updatePosicaoController = new UpdatePosicaoController()
const deletePosicaoController = new DeletePosicaoController()
const multiDeletePosicaoController = new MultiDeletePosicaoController()

posicoesRoutes.post('/', ensureAuthenticated, createPosicaoController.handle )
posicoesRoutes.get('/', ensureAuthenticated, listPosicaoController.handle)
posicoesRoutes.post('/count', ensureAuthenticated, countPosicaoController.handle)
posicoesRoutes.get('/select/:id', ensureAuthenticated, idSelectPosicaoController.handle)
posicoesRoutes.get('/select', ensureAuthenticated, selectPosicaoController.handle)
posicoesRoutes.get('/:id', ensureAuthenticated, getPosicaoController.handle)
posicoesRoutes.put('/:id', ensureAuthenticated, updatePosicaoController.handle)
posicoesRoutes.delete('/:id', ensureAuthenticated, deletePosicaoController.handle)
posicoesRoutes.delete('/', ensureAuthenticated, multiDeletePosicaoController.handle)

export { posicoesRoutes }
