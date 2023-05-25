import { Router } from 'express'
import { CreateCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/create-campo-documento/create-campo-documento-controller'
import { ListCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/list-campo-documento/list-campo-documento-controller'
import { CountCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/count-campo-documento/count-campo-documento-controller'
import { SelectCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/select-campo-documento/select-campo-documento-controller'
import { IdSelectCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/id-select-campo-documento/id-select-campo-documento-controller'
import { GetCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/get-campo-documento/get-campo-documento-controller'
import { GetCampoDocumentoByTipoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/get-campo-documento-by-tipo-documento/get-campo-documento-by-tipo-documento-controller'
import { UpdateCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/update-campo-documento/update-campo-documento-controller'
import { DeleteCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/delete-campo-documento/delete-campo-documento-controller'
import { MultiDeleteCampoDocumentoController } from '@modules/digitalizacao/use-cases/campo-documento/multi-delete-campo-documento/multi-delete-campo-documento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const camposDocumentoRoutes = Router()

const createCampoDocumentoController = new CreateCampoDocumentoController()
const listCampoDocumentoController = new ListCampoDocumentoController()
const countCampoDocumentoController = new CountCampoDocumentoController()
const selectCampoDocumentoController = new SelectCampoDocumentoController()
const idSelectCampoDocumentoController = new IdSelectCampoDocumentoController()
const getCampoDocumentoController = new GetCampoDocumentoController()
const getCampoDocumentoByTipoDocumentoController = new GetCampoDocumentoByTipoDocumentoController()
const updateCampoDocumentoController = new UpdateCampoDocumentoController()
const deleteCampoDocumentoController = new DeleteCampoDocumentoController()
const multiDeleteCampoDocumentoController = new MultiDeleteCampoDocumentoController()

camposDocumentoRoutes.post('/', ensureAuthenticated, createCampoDocumentoController.handle )
camposDocumentoRoutes.post('/list', ensureAuthenticated, listCampoDocumentoController.handle)
camposDocumentoRoutes.post('/count', ensureAuthenticated, countCampoDocumentoController.handle)
camposDocumentoRoutes.get('/select/:id', ensureAuthenticated, idSelectCampoDocumentoController.handle)
camposDocumentoRoutes.get('/select', ensureAuthenticated, selectCampoDocumentoController.handle)
camposDocumentoRoutes.get('/:id', ensureAuthenticated, getCampoDocumentoController.handle)
camposDocumentoRoutes.post('/find', ensureAuthenticated, getCampoDocumentoByTipoDocumentoController.handle)
camposDocumentoRoutes.put('/:id', ensureAuthenticated, updateCampoDocumentoController.handle)
camposDocumentoRoutes.delete('/:id', ensureAuthenticated, deleteCampoDocumentoController.handle)
camposDocumentoRoutes.delete('/', ensureAuthenticated, multiDeleteCampoDocumentoController.handle)

export { camposDocumentoRoutes }
