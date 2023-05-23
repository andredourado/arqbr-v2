import { Router } from 'express'
import { CreateCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/create-caixa-quebra/create-caixa-quebra-controller'
import { ListCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/list-caixa-quebra/list-caixa-quebra-controller'
import { CountCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/count-caixa-quebra/count-caixa-quebra-controller'
import { SelectCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/select-caixa-quebra/select-caixa-quebra-controller'
import { IdSelectCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/id-select-caixa-quebra/id-select-caixa-quebra-controller'
import { GetCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/get-caixa-quebra/get-caixa-quebra-controller'
import { UpdateCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/update-caixa-quebra/update-caixa-quebra-controller'
import { DeleteCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/delete-caixa-quebra/delete-caixa-quebra-controller'
import { MultiDeleteCaixaQuebraController } from '@modules/digitalizacao/use-cases/caixa-quebra/multi-delete-caixa-quebra/multi-delete-caixa-quebra-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const caixasQuebrasRoutes = Router()

const createCaixaQuebraController = new CreateCaixaQuebraController()
const listCaixaQuebraController = new ListCaixaQuebraController()
const countCaixaQuebraController = new CountCaixaQuebraController()
const selectCaixaQuebraController = new SelectCaixaQuebraController()
const idSelectCaixaQuebraController = new IdSelectCaixaQuebraController()
const getCaixaQuebraController = new GetCaixaQuebraController()
const updateCaixaQuebraController = new UpdateCaixaQuebraController()
const deleteCaixaQuebraController = new DeleteCaixaQuebraController()
const multiDeleteCaixaQuebraController = new MultiDeleteCaixaQuebraController()

caixasQuebrasRoutes.post('/', ensureAuthenticated, createCaixaQuebraController.handle )
caixasQuebrasRoutes.post('/list', ensureAuthenticated, listCaixaQuebraController.handle)
caixasQuebrasRoutes.post('/count', ensureAuthenticated, countCaixaQuebraController.handle)
caixasQuebrasRoutes.get('/select/:id', ensureAuthenticated, idSelectCaixaQuebraController.handle)
caixasQuebrasRoutes.get('/select', ensureAuthenticated, selectCaixaQuebraController.handle)
caixasQuebrasRoutes.get('/:id', ensureAuthenticated, getCaixaQuebraController.handle)
caixasQuebrasRoutes.put('/:id', ensureAuthenticated, updateCaixaQuebraController.handle)
caixasQuebrasRoutes.delete('/:id', ensureAuthenticated, deleteCaixaQuebraController.handle)
caixasQuebrasRoutes.delete('/', ensureAuthenticated, multiDeleteCaixaQuebraController.handle)

export { caixasQuebrasRoutes }
