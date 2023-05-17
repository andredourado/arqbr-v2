import { Router } from 'express'
import { CreateAfastamentoController } from '@modules/pessoas/use-cases/afastamento/create-afastamento/create-afastamento-controller'
import { ListAfastamentoController } from '@modules/pessoas/use-cases/afastamento/list-afastamento/list-afastamento-controller'
import { CountAfastamentoController } from '@modules/pessoas/use-cases/afastamento/count-afastamento/count-afastamento-controller'
import { SelectAfastamentoController } from '@modules/pessoas/use-cases/afastamento/select-afastamento/select-afastamento-controller'
import { IdSelectAfastamentoController } from '@modules/pessoas/use-cases/afastamento/id-select-afastamento/id-select-afastamento-controller'
import { GetAfastamentoController } from '@modules/pessoas/use-cases/afastamento/get-afastamento/get-afastamento-controller'
import { UpdateAfastamentoController } from '@modules/pessoas/use-cases/afastamento/update-afastamento/update-afastamento-controller'
import { DeleteAfastamentoController } from '@modules/pessoas/use-cases/afastamento/delete-afastamento/delete-afastamento-controller'
import { MultiDeleteAfastamentoController } from '@modules/pessoas/use-cases/afastamento/multi-delete-afastamento/multi-delete-afastamento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const afastamentosRoutes = Router()

const createAfastamentoController = new CreateAfastamentoController()
const listAfastamentoController = new ListAfastamentoController()
const countAfastamentoController = new CountAfastamentoController()
const selectAfastamentoController = new SelectAfastamentoController()
const idSelectAfastamentoController = new IdSelectAfastamentoController()
const getAfastamentoController = new GetAfastamentoController()
const updateAfastamentoController = new UpdateAfastamentoController()
const deleteAfastamentoController = new DeleteAfastamentoController()
const multiDeleteAfastamentoController = new MultiDeleteAfastamentoController()

afastamentosRoutes.post('/', ensureAuthenticated, createAfastamentoController.handle )
afastamentosRoutes.get('/', ensureAuthenticated, listAfastamentoController.handle)
afastamentosRoutes.post('/count', ensureAuthenticated, countAfastamentoController.handle)
afastamentosRoutes.get('/select/:id', ensureAuthenticated, idSelectAfastamentoController.handle)
afastamentosRoutes.get('/select', ensureAuthenticated, selectAfastamentoController.handle)
afastamentosRoutes.get('/:id', ensureAuthenticated, getAfastamentoController.handle)
afastamentosRoutes.put('/:id', ensureAuthenticated, updateAfastamentoController.handle)
afastamentosRoutes.delete('/:id', ensureAuthenticated, deleteAfastamentoController.handle)
afastamentosRoutes.delete('/', ensureAuthenticated, multiDeleteAfastamentoController.handle)

export { afastamentosRoutes }
