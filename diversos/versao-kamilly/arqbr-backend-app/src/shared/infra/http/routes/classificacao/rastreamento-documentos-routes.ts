import { Router } from 'express'
import { CreateRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/create-rastreamento-documento/create-rastreamento-documento-controller'
import { ListRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/list-rastreamento-documento/list-rastreamento-documento-controller'
import { CountRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/count-rastreamento-documento/count-rastreamento-documento-controller'
import { SelectRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/select-rastreamento-documento/select-rastreamento-documento-controller'
import { IdSelectRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/id-select-rastreamento-documento/id-select-rastreamento-documento-controller'
import { GetRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/get-rastreamento-documento/get-rastreamento-documento-controller'
import { UpdateRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/update-rastreamento-documento/update-rastreamento-documento-controller'
import { DeleteRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/delete-rastreamento-documento/delete-rastreamento-documento-controller'
import { MultiDeleteRastreamentoDocumentoController } from '@modules/classificacao/use-cases/rastreamento-documento/multi-delete-rastreamento-documento/multi-delete-rastreamento-documento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const rastreamentoDocumentosRoutes = Router()

const createRastreamentoDocumentoController = new CreateRastreamentoDocumentoController()
const listRastreamentoDocumentoController = new ListRastreamentoDocumentoController()
const countRastreamentoDocumentoController = new CountRastreamentoDocumentoController()
const selectRastreamentoDocumentoController = new SelectRastreamentoDocumentoController()
const idSelectRastreamentoDocumentoController = new IdSelectRastreamentoDocumentoController()
const getRastreamentoDocumentoController = new GetRastreamentoDocumentoController()
const updateRastreamentoDocumentoController = new UpdateRastreamentoDocumentoController()
const deleteRastreamentoDocumentoController = new DeleteRastreamentoDocumentoController()
const multiDeleteRastreamentoDocumentoController = new MultiDeleteRastreamentoDocumentoController()

rastreamentoDocumentosRoutes.post('/', ensureAuthenticated, createRastreamentoDocumentoController.handle )
rastreamentoDocumentosRoutes.get('/', ensureAuthenticated, listRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.post('/count', ensureAuthenticated, countRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.get('/select/:id', ensureAuthenticated, idSelectRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.get('/select', ensureAuthenticated, selectRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.get('/:id', ensureAuthenticated, getRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.put('/:id', ensureAuthenticated, updateRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.delete('/:id', ensureAuthenticated, deleteRastreamentoDocumentoController.handle)
rastreamentoDocumentosRoutes.delete('/', ensureAuthenticated, multiDeleteRastreamentoDocumentoController.handle)

export { rastreamentoDocumentosRoutes }
