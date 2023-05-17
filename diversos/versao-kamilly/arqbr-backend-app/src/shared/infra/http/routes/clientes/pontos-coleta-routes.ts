import { Router } from 'express'
import { CreatePontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/create-ponto-coleta/create-ponto-coleta-controller'
import { ListPontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/list-ponto-coleta/list-ponto-coleta-controller'
import { CountPontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/count-ponto-coleta/count-ponto-coleta-controller'
import { SelectPontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/select-ponto-coleta/select-ponto-coleta-controller'
import { IdSelectPontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/id-select-ponto-coleta/id-select-ponto-coleta-controller'
import { GetPontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/get-ponto-coleta/get-ponto-coleta-controller'
import { UpdatePontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/update-ponto-coleta/update-ponto-coleta-controller'
import { DeletePontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/delete-ponto-coleta/delete-ponto-coleta-controller'
import { MultiDeletePontoColetaController } from '@modules/clientes/use-cases/ponto-coleta/multi-delete-ponto-coleta/multi-delete-ponto-coleta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const pontosColetaRoutes = Router()

const createPontoColetaController = new CreatePontoColetaController()
const listPontoColetaController = new ListPontoColetaController()
const countPontoColetaController = new CountPontoColetaController()
const selectPontoColetaController = new SelectPontoColetaController()
const idSelectPontoColetaController = new IdSelectPontoColetaController()
const getPontoColetaController = new GetPontoColetaController()
const updatePontoColetaController = new UpdatePontoColetaController()
const deletePontoColetaController = new DeletePontoColetaController()
const multiDeletePontoColetaController = new MultiDeletePontoColetaController()

pontosColetaRoutes.post('/', ensureAuthenticated, createPontoColetaController.handle )
pontosColetaRoutes.get('/', ensureAuthenticated, listPontoColetaController.handle)
pontosColetaRoutes.post('/count', ensureAuthenticated, countPontoColetaController.handle)
pontosColetaRoutes.get('/select/:id', ensureAuthenticated, idSelectPontoColetaController.handle)
pontosColetaRoutes.get('/select', ensureAuthenticated, selectPontoColetaController.handle)
pontosColetaRoutes.get('/:id', ensureAuthenticated, getPontoColetaController.handle)
pontosColetaRoutes.put('/:id', ensureAuthenticated, updatePontoColetaController.handle)
pontosColetaRoutes.delete('/:id', ensureAuthenticated, deletePontoColetaController.handle)
pontosColetaRoutes.delete('/', ensureAuthenticated, multiDeletePontoColetaController.handle)

export { pontosColetaRoutes }
