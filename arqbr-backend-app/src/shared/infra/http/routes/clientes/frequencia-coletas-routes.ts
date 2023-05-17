import { Router } from 'express'
import { CreateFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/create-frequencia-coleta/create-frequencia-coleta-controller'
import { ListFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/list-frequencia-coleta/list-frequencia-coleta-controller'
import { CountFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/count-frequencia-coleta/count-frequencia-coleta-controller'
import { SelectFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/select-frequencia-coleta/select-frequencia-coleta-controller'
import { IdSelectFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/id-select-frequencia-coleta/id-select-frequencia-coleta-controller'
import { GetFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/get-frequencia-coleta/get-frequencia-coleta-controller'
import { UpdateFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/update-frequencia-coleta/update-frequencia-coleta-controller'
import { DeleteFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/delete-frequencia-coleta/delete-frequencia-coleta-controller'
import { MultiDeleteFrequenciaColetaController } from '@modules/clientes/use-cases/frequencia-coleta/multi-delete-frequencia-coleta/multi-delete-frequencia-coleta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const frequenciaColetasRoutes = Router()

const createFrequenciaColetaController = new CreateFrequenciaColetaController()
const listFrequenciaColetaController = new ListFrequenciaColetaController()
const countFrequenciaColetaController = new CountFrequenciaColetaController()
const selectFrequenciaColetaController = new SelectFrequenciaColetaController()
const idSelectFrequenciaColetaController = new IdSelectFrequenciaColetaController()
const getFrequenciaColetaController = new GetFrequenciaColetaController()
const updateFrequenciaColetaController = new UpdateFrequenciaColetaController()
const deleteFrequenciaColetaController = new DeleteFrequenciaColetaController()
const multiDeleteFrequenciaColetaController = new MultiDeleteFrequenciaColetaController()

frequenciaColetasRoutes.post('/', ensureAuthenticated, createFrequenciaColetaController.handle )
frequenciaColetasRoutes.post('/list', ensureAuthenticated, listFrequenciaColetaController.handle)
frequenciaColetasRoutes.post('/count', ensureAuthenticated, countFrequenciaColetaController.handle)
frequenciaColetasRoutes.get('/select/:id', ensureAuthenticated, idSelectFrequenciaColetaController.handle)
frequenciaColetasRoutes.get('/select', ensureAuthenticated, selectFrequenciaColetaController.handle)
frequenciaColetasRoutes.get('/:id', ensureAuthenticated, getFrequenciaColetaController.handle)
frequenciaColetasRoutes.put('/:id', ensureAuthenticated, updateFrequenciaColetaController.handle)
frequenciaColetasRoutes.delete('/:id', ensureAuthenticated, deleteFrequenciaColetaController.handle)
frequenciaColetasRoutes.delete('/', ensureAuthenticated, multiDeleteFrequenciaColetaController.handle)

export { frequenciaColetasRoutes }
