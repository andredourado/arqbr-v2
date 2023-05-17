import { Router } from 'express'
import { CreateTimeColetaController } from '@modules/coleta/use-cases/time-coleta/create-time-coleta/create-time-coleta-controller'
import { ListTimeColetaController } from '@modules/coleta/use-cases/time-coleta/list-time-coleta/list-time-coleta-controller'
import { CountTimeColetaController } from '@modules/coleta/use-cases/time-coleta/count-time-coleta/count-time-coleta-controller'
import { SelectTimeColetaController } from '@modules/coleta/use-cases/time-coleta/select-time-coleta/select-time-coleta-controller'
import { IdSelectTimeColetaController } from '@modules/coleta/use-cases/time-coleta/id-select-time-coleta/id-select-time-coleta-controller'
import { GetTimeColetaController } from '@modules/coleta/use-cases/time-coleta/get-time-coleta/get-time-coleta-controller'
import { UpdateTimeColetaController } from '@modules/coleta/use-cases/time-coleta/update-time-coleta/update-time-coleta-controller'
import { DeleteTimeColetaController } from '@modules/coleta/use-cases/time-coleta/delete-time-coleta/delete-time-coleta-controller'
import { MultiDeleteTimeColetaController } from '@modules/coleta/use-cases/time-coleta/multi-delete-time-coleta/multi-delete-time-coleta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const timesColetaRoutes = Router()

const createTimeColetaController = new CreateTimeColetaController()
const listTimeColetaController = new ListTimeColetaController()
const countTimeColetaController = new CountTimeColetaController()
const selectTimeColetaController = new SelectTimeColetaController()
const idSelectTimeColetaController = new IdSelectTimeColetaController()
const getTimeColetaController = new GetTimeColetaController()
const updateTimeColetaController = new UpdateTimeColetaController()
const deleteTimeColetaController = new DeleteTimeColetaController()
const multiDeleteTimeColetaController = new MultiDeleteTimeColetaController()

timesColetaRoutes.post('/', ensureAuthenticated, createTimeColetaController.handle )
timesColetaRoutes.post('/list', ensureAuthenticated, listTimeColetaController.handle)
timesColetaRoutes.post('/count', ensureAuthenticated, countTimeColetaController.handle)
timesColetaRoutes.get('/select/:id', ensureAuthenticated, idSelectTimeColetaController.handle)
timesColetaRoutes.get('/select', ensureAuthenticated, selectTimeColetaController.handle)
timesColetaRoutes.get('/:id', ensureAuthenticated, getTimeColetaController.handle)
timesColetaRoutes.put('/:id', ensureAuthenticated, updateTimeColetaController.handle)
timesColetaRoutes.delete('/:id', ensureAuthenticated, deleteTimeColetaController.handle)
timesColetaRoutes.delete('/', ensureAuthenticated, multiDeleteTimeColetaController.handle)

export { timesColetaRoutes }
