import { Router } from 'express'
import { CreateColetaController } from '@modules/coleta/use-cases/coleta/create-coleta/create-coleta-controller'
import { ListColetaController } from '@modules/coleta/use-cases/coleta/list-coleta/list-coleta-controller'
import { CountColetaController } from '@modules/coleta/use-cases/coleta/count-coleta/count-coleta-controller'
import { SelectColetaController } from '@modules/coleta/use-cases/coleta/select-coleta/select-coleta-controller'
import { IdSelectColetaController } from '@modules/coleta/use-cases/coleta/id-select-coleta/id-select-coleta-controller'
import { GetColetaController } from '@modules/coleta/use-cases/coleta/get-coleta/get-coleta-controller'
import { UpdateColetaController } from '@modules/coleta/use-cases/coleta/update-coleta/update-coleta-controller'
import { DeleteColetaController } from '@modules/coleta/use-cases/coleta/delete-coleta/delete-coleta-controller'
import { MultiDeleteColetaController } from '@modules/coleta/use-cases/coleta/multi-delete-coleta/multi-delete-coleta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const coletasRoutes = Router()

const createColetaController = new CreateColetaController()
const listColetaController = new ListColetaController()
const countColetaController = new CountColetaController()
const selectColetaController = new SelectColetaController()
const idSelectColetaController = new IdSelectColetaController()
const getColetaController = new GetColetaController()
const updateColetaController = new UpdateColetaController()
const deleteColetaController = new DeleteColetaController()
const multiDeleteColetaController = new MultiDeleteColetaController()

coletasRoutes.post('/', ensureAuthenticated, createColetaController.handle )
coletasRoutes.get('/', ensureAuthenticated, listColetaController.handle)
coletasRoutes.post('/count', ensureAuthenticated, countColetaController.handle)
coletasRoutes.get('/select/:id', ensureAuthenticated, idSelectColetaController.handle)
coletasRoutes.get('/select', ensureAuthenticated, selectColetaController.handle)
coletasRoutes.get('/:id', ensureAuthenticated, getColetaController.handle)
coletasRoutes.put('/:id', ensureAuthenticated, updateColetaController.handle)
coletasRoutes.delete('/:id', ensureAuthenticated, deleteColetaController.handle)
coletasRoutes.delete('/', ensureAuthenticated, multiDeleteColetaController.handle)

export { coletasRoutes }
