import { Router } from 'express'
import { CreateFrequenciaController } from '@modules/comum/use-cases/frequencia/create-frequencia/create-frequencia-controller'
import { ListFrequenciaController } from '@modules/comum/use-cases/frequencia/list-frequencia/list-frequencia-controller'
import { CountFrequenciaController } from '@modules/comum/use-cases/frequencia/count-frequencia/count-frequencia-controller'
import { SelectFrequenciaController } from '@modules/comum/use-cases/frequencia/select-frequencia/select-frequencia-controller'
import { IdSelectFrequenciaController } from '@modules/comum/use-cases/frequencia/id-select-frequencia/id-select-frequencia-controller'
import { GetFrequenciaController } from '@modules/comum/use-cases/frequencia/get-frequencia/get-frequencia-controller'
import { UpdateFrequenciaController } from '@modules/comum/use-cases/frequencia/update-frequencia/update-frequencia-controller'
import { DeleteFrequenciaController } from '@modules/comum/use-cases/frequencia/delete-frequencia/delete-frequencia-controller'
import { MultiDeleteFrequenciaController } from '@modules/comum/use-cases/frequencia/multi-delete-frequencia/multi-delete-frequencia-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const frequenciasRoutes = Router()

const createFrequenciaController = new CreateFrequenciaController()
const listFrequenciaController = new ListFrequenciaController()
const countFrequenciaController = new CountFrequenciaController()
const selectFrequenciaController = new SelectFrequenciaController()
const idSelectFrequenciaController = new IdSelectFrequenciaController()
const getFrequenciaController = new GetFrequenciaController()
const updateFrequenciaController = new UpdateFrequenciaController()
const deleteFrequenciaController = new DeleteFrequenciaController()
const multiDeleteFrequenciaController = new MultiDeleteFrequenciaController()

frequenciasRoutes.post('/', ensureAuthenticated, createFrequenciaController.handle )
frequenciasRoutes.get('/', ensureAuthenticated, listFrequenciaController.handle)
frequenciasRoutes.post('/count', ensureAuthenticated, countFrequenciaController.handle)
frequenciasRoutes.get('/select/:id', ensureAuthenticated, idSelectFrequenciaController.handle)
frequenciasRoutes.get('/select', ensureAuthenticated, selectFrequenciaController.handle)
frequenciasRoutes.get('/:id', ensureAuthenticated, getFrequenciaController.handle)
frequenciasRoutes.put('/:id', ensureAuthenticated, updateFrequenciaController.handle)
frequenciasRoutes.delete('/:id', ensureAuthenticated, deleteFrequenciaController.handle)
frequenciasRoutes.delete('/', ensureAuthenticated, multiDeleteFrequenciaController.handle)

export { frequenciasRoutes }
