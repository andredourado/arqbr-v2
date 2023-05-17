import { Router } from 'express'
import { CreateEntregadorController } from '@modules/coleta/use-cases/entregador/create-entregador/create-entregador-controller'
import { ListEntregadorController } from '@modules/coleta/use-cases/entregador/list-entregador/list-entregador-controller'
import { CountEntregadorController } from '@modules/coleta/use-cases/entregador/count-entregador/count-entregador-controller'
import { SelectEntregadorController } from '@modules/coleta/use-cases/entregador/select-entregador/select-entregador-controller'
import { IdSelectEntregadorController } from '@modules/coleta/use-cases/entregador/id-select-entregador/id-select-entregador-controller'
import { GetEntregadorController } from '@modules/coleta/use-cases/entregador/get-entregador/get-entregador-controller'
import { UpdateEntregadorController } from '@modules/coleta/use-cases/entregador/update-entregador/update-entregador-controller'
import { DeleteEntregadorController } from '@modules/coleta/use-cases/entregador/delete-entregador/delete-entregador-controller'
import { MultiDeleteEntregadorController } from '@modules/coleta/use-cases/entregador/multi-delete-entregador/multi-delete-entregador-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const entregadoresRoutes = Router()

const createEntregadorController = new CreateEntregadorController()
const listEntregadorController = new ListEntregadorController()
const countEntregadorController = new CountEntregadorController()
const selectEntregadorController = new SelectEntregadorController()
const idSelectEntregadorController = new IdSelectEntregadorController()
const getEntregadorController = new GetEntregadorController()
const updateEntregadorController = new UpdateEntregadorController()
const deleteEntregadorController = new DeleteEntregadorController()
const multiDeleteEntregadorController = new MultiDeleteEntregadorController()

entregadoresRoutes.post('/', ensureAuthenticated, createEntregadorController.handle )
entregadoresRoutes.get('/', ensureAuthenticated, listEntregadorController.handle)
entregadoresRoutes.post('/count', ensureAuthenticated, countEntregadorController.handle)
entregadoresRoutes.get('/select/:id', ensureAuthenticated, idSelectEntregadorController.handle)
entregadoresRoutes.get('/select', ensureAuthenticated, selectEntregadorController.handle)
entregadoresRoutes.get('/:id', ensureAuthenticated, getEntregadorController.handle)
entregadoresRoutes.put('/:id', ensureAuthenticated, updateEntregadorController.handle)
entregadoresRoutes.delete('/:id', ensureAuthenticated, deleteEntregadorController.handle)
entregadoresRoutes.delete('/', ensureAuthenticated, multiDeleteEntregadorController.handle)

export { entregadoresRoutes }
