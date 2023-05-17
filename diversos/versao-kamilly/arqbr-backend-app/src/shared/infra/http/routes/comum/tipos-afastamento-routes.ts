import { Router } from 'express'
import { CreateTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/create-tipo-afastamento/create-tipo-afastamento-controller'
import { ListTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/list-tipo-afastamento/list-tipo-afastamento-controller'
import { CountTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/count-tipo-afastamento/count-tipo-afastamento-controller'
import { SelectTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/select-tipo-afastamento/select-tipo-afastamento-controller'
import { IdSelectTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/id-select-tipo-afastamento/id-select-tipo-afastamento-controller'
import { GetTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/get-tipo-afastamento/get-tipo-afastamento-controller'
import { UpdateTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/update-tipo-afastamento/update-tipo-afastamento-controller'
import { DeleteTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/delete-tipo-afastamento/delete-tipo-afastamento-controller'
import { MultiDeleteTipoAfastamentoController } from '@modules/comum/use-cases/tipo-afastamento/multi-delete-tipo-afastamento/multi-delete-tipo-afastamento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const tiposAfastamentoRoutes = Router()

const createTipoAfastamentoController = new CreateTipoAfastamentoController()
const listTipoAfastamentoController = new ListTipoAfastamentoController()
const countTipoAfastamentoController = new CountTipoAfastamentoController()
const selectTipoAfastamentoController = new SelectTipoAfastamentoController()
const idSelectTipoAfastamentoController = new IdSelectTipoAfastamentoController()
const getTipoAfastamentoController = new GetTipoAfastamentoController()
const updateTipoAfastamentoController = new UpdateTipoAfastamentoController()
const deleteTipoAfastamentoController = new DeleteTipoAfastamentoController()
const multiDeleteTipoAfastamentoController = new MultiDeleteTipoAfastamentoController()

tiposAfastamentoRoutes.post('/', ensureAuthenticated, createTipoAfastamentoController.handle )
tiposAfastamentoRoutes.get('/', ensureAuthenticated, listTipoAfastamentoController.handle)
tiposAfastamentoRoutes.post('/count', ensureAuthenticated, countTipoAfastamentoController.handle)
tiposAfastamentoRoutes.get('/select/:id', ensureAuthenticated, idSelectTipoAfastamentoController.handle)
tiposAfastamentoRoutes.get('/select', ensureAuthenticated, selectTipoAfastamentoController.handle)
tiposAfastamentoRoutes.get('/:id', ensureAuthenticated, getTipoAfastamentoController.handle)
tiposAfastamentoRoutes.put('/:id', ensureAuthenticated, updateTipoAfastamentoController.handle)
tiposAfastamentoRoutes.delete('/:id', ensureAuthenticated, deleteTipoAfastamentoController.handle)
tiposAfastamentoRoutes.delete('/', ensureAuthenticated, multiDeleteTipoAfastamentoController.handle)

export { tiposAfastamentoRoutes }
