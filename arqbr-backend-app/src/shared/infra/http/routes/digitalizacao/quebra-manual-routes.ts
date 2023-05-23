import { QuebraManualListDocumentosController } from '@modules/digitalizacao/use-cases/quebra-manual/quebra-manual-list-documentos/quebra-manual-list-documentos-controller'
import { Router } from 'express'
import { ensureAuthenticated } from '../../middlewares/ensure-authenticated'
import { QuebraManualOpenDocumentoController } from '@modules/digitalizacao/use-cases/quebra-manual/quebra-manual-open-documento/quebra-manual-open-documento-controller'
const quebraManualRoutes = Router()

const quebraManualListDocumentosController = new QuebraManualListDocumentosController
const quebraManualOpenDocumentoController = new QuebraManualOpenDocumentoController

quebraManualRoutes.get('/list', ensureAuthenticated, quebraManualListDocumentosController.handle)
quebraManualRoutes.post('/open', ensureAuthenticated, quebraManualOpenDocumentoController.handle)

export { quebraManualRoutes } 
