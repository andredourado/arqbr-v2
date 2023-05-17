import { Router } from 'express'
import { CreateJornadaController } from '@modules/pessoas/use-cases/jornada/create-jornada/create-jornada-controller'
import { ListJornadaController } from '@modules/pessoas/use-cases/jornada/list-jornada/list-jornada-controller'
import { CountJornadaController } from '@modules/pessoas/use-cases/jornada/count-jornada/count-jornada-controller'
import { SelectJornadaController } from '@modules/pessoas/use-cases/jornada/select-jornada/select-jornada-controller'
import { IdSelectJornadaController } from '@modules/pessoas/use-cases/jornada/id-select-jornada/id-select-jornada-controller'
import { GetJornadaController } from '@modules/pessoas/use-cases/jornada/get-jornada/get-jornada-controller'
import { UpdateJornadaController } from '@modules/pessoas/use-cases/jornada/update-jornada/update-jornada-controller'
import { DeleteJornadaController } from '@modules/pessoas/use-cases/jornada/delete-jornada/delete-jornada-controller'
import { MultiDeleteJornadaController } from '@modules/pessoas/use-cases/jornada/multi-delete-jornada/multi-delete-jornada-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const jornadasRoutes = Router()

const createJornadaController = new CreateJornadaController()
const listJornadaController = new ListJornadaController()
const countJornadaController = new CountJornadaController()
const selectJornadaController = new SelectJornadaController()
const idSelectJornadaController = new IdSelectJornadaController()
const getJornadaController = new GetJornadaController()
const updateJornadaController = new UpdateJornadaController()
const deleteJornadaController = new DeleteJornadaController()
const multiDeleteJornadaController = new MultiDeleteJornadaController()

jornadasRoutes.post('/', ensureAuthenticated, createJornadaController.handle )
jornadasRoutes.post('/list', ensureAuthenticated, listJornadaController.handle)
jornadasRoutes.post('/count', ensureAuthenticated, countJornadaController.handle)
jornadasRoutes.get('/select/:id', ensureAuthenticated, idSelectJornadaController.handle)
jornadasRoutes.get('/select', ensureAuthenticated, selectJornadaController.handle)
jornadasRoutes.get('/:id', ensureAuthenticated, getJornadaController.handle)
jornadasRoutes.put('/:id', ensureAuthenticated, updateJornadaController.handle)
jornadasRoutes.delete('/:id', ensureAuthenticated, deleteJornadaController.handle)
jornadasRoutes.delete('/', ensureAuthenticated, multiDeleteJornadaController.handle)

export { jornadasRoutes }
