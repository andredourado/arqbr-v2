import { Router } from 'express'
import { CreateFuncaoController } from '@modules/pessoas/use-cases/funcao/create-funcao/create-funcao-controller'
import { ListFuncaoController } from '@modules/pessoas/use-cases/funcao/list-funcao/list-funcao-controller'
import { CountFuncaoController } from '@modules/pessoas/use-cases/funcao/count-funcao/count-funcao-controller'
import { SelectFuncaoController } from '@modules/pessoas/use-cases/funcao/select-funcao/select-funcao-controller'
import { IdSelectFuncaoController } from '@modules/pessoas/use-cases/funcao/id-select-funcao/id-select-funcao-controller'
import { GetFuncaoController } from '@modules/pessoas/use-cases/funcao/get-funcao/get-funcao-controller'
import { UpdateFuncaoController } from '@modules/pessoas/use-cases/funcao/update-funcao/update-funcao-controller'
import { DeleteFuncaoController } from '@modules/pessoas/use-cases/funcao/delete-funcao/delete-funcao-controller'
import { MultiDeleteFuncaoController } from '@modules/pessoas/use-cases/funcao/multi-delete-funcao/multi-delete-funcao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const funcoesRoutes = Router()

const createFuncaoController = new CreateFuncaoController()
const listFuncaoController = new ListFuncaoController()
const countFuncaoController = new CountFuncaoController()
const selectFuncaoController = new SelectFuncaoController()
const idSelectFuncaoController = new IdSelectFuncaoController()
const getFuncaoController = new GetFuncaoController()
const updateFuncaoController = new UpdateFuncaoController()
const deleteFuncaoController = new DeleteFuncaoController()
const multiDeleteFuncaoController = new MultiDeleteFuncaoController()

funcoesRoutes.post('/', ensureAuthenticated, createFuncaoController.handle )
funcoesRoutes.get('/', ensureAuthenticated, listFuncaoController.handle)
funcoesRoutes.post('/count', ensureAuthenticated, countFuncaoController.handle)
funcoesRoutes.get('/select/:id', ensureAuthenticated, idSelectFuncaoController.handle)
funcoesRoutes.get('/select', ensureAuthenticated, selectFuncaoController.handle)
funcoesRoutes.get('/:id', ensureAuthenticated, getFuncaoController.handle)
funcoesRoutes.put('/:id', ensureAuthenticated, updateFuncaoController.handle)
funcoesRoutes.delete('/:id', ensureAuthenticated, deleteFuncaoController.handle)
funcoesRoutes.delete('/', ensureAuthenticated, multiDeleteFuncaoController.handle)

export { funcoesRoutes }
