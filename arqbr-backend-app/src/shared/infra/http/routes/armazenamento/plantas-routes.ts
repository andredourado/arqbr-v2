import { Router } from 'express'
import { CreatePlantaController } from '@modules/armazenamento/use-cases/planta/create-planta/create-planta-controller'
import { ListPlantaController } from '@modules/armazenamento/use-cases/planta/list-planta/list-planta-controller'
import { CountPlantaController } from '@modules/armazenamento/use-cases/planta/count-planta/count-planta-controller'
import { SelectPlantaController } from '@modules/armazenamento/use-cases/planta/select-planta/select-planta-controller'
import { IdSelectPlantaController } from '@modules/armazenamento/use-cases/planta/id-select-planta/id-select-planta-controller'
import { GetPlantaController } from '@modules/armazenamento/use-cases/planta/get-planta/get-planta-controller'
import { UpdatePlantaController } from '@modules/armazenamento/use-cases/planta/update-planta/update-planta-controller'
import { DeletePlantaController } from '@modules/armazenamento/use-cases/planta/delete-planta/delete-planta-controller'
import { MultiDeletePlantaController } from '@modules/armazenamento/use-cases/planta/multi-delete-planta/multi-delete-planta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const plantasRoutes = Router()

const createPlantaController = new CreatePlantaController()
const listPlantaController = new ListPlantaController()
const countPlantaController = new CountPlantaController()
const selectPlantaController = new SelectPlantaController()
const idSelectPlantaController = new IdSelectPlantaController()
const getPlantaController = new GetPlantaController()
const updatePlantaController = new UpdatePlantaController()
const deletePlantaController = new DeletePlantaController()
const multiDeletePlantaController = new MultiDeletePlantaController()

plantasRoutes.post('/', ensureAuthenticated, createPlantaController.handle )
plantasRoutes.post('/list', ensureAuthenticated, listPlantaController.handle)
plantasRoutes.post('/count', ensureAuthenticated, countPlantaController.handle)
plantasRoutes.get('/select/:id', ensureAuthenticated, idSelectPlantaController.handle)
plantasRoutes.get('/select', ensureAuthenticated, selectPlantaController.handle)
plantasRoutes.get('/:id', ensureAuthenticated, getPlantaController.handle)
plantasRoutes.put('/:id', ensureAuthenticated, updatePlantaController.handle)
plantasRoutes.delete('/:id', ensureAuthenticated, deletePlantaController.handle)
plantasRoutes.delete('/', ensureAuthenticated, multiDeletePlantaController.handle)

export { plantasRoutes }
