import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import { CreateDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/create-documento-digital/create-documento-digital-controller'
import { ListDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/list-documento-digital/list-documento-digital-controller'
import { CountDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-documento-digital/count-documento-digital-controller'
import { CountPagesDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-pages-documento-digital/count-pages-documento-digital-controller'
import { CountByTipoDocumentoDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-by-tipo-documento-documento-digital/count-by-tipo-documento-documento-digital-controller'
import { SelectDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/select-documento-digital/select-documento-digital-controller'
import { PageDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/page-documento-digital/page-documento-digital-controller'
import { ExtracaoDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/extracao-documento-digital/extracao-documento-digital-controller'
import { ExtracaoS3DocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/extracao-s3-documento-digital/extracao-s3-documento-digital-controller'
import { GetPdfDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/get-pdf-documento-digital/get-pdf-documento-digital-controller'
import { IdSelectDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/id-select-documento-digital/id-select-documento-digital-controller'
import { GetDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/get-documento-digital/get-documento-digital-controller'
import { UpdateDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/update-documento-digital/update-documento-digital-controller'
import { DeleteDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/delete-documento-digital/delete-documento-digital-controller'
import { MultiDeleteDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/multi-delete-documento-digital/multi-delete-documento-digital-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'
import { CountProcessingDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-processing-documento-digital/count-processing-documento-digital-controller'
import { CountByDepartamentoDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-by-departamento-documento-digital/count-by-departamento-documento-digital-controller'
import { SolicitarDocumentoFisicoController } from '@modules/digitalizacao/use-cases/documento-digital/solicitar-documento-fisico/solicitar-documento-fisico-controller'
import { ListSolicitacaoController } from '@modules/digitalizacao/use-cases/documento-digital/list-solicitacao/list-solicitacao-controller'

const documentosDigitaisRoutes = Router()

const uploadFile = multer(uploadConfig)

const createDocumentoDigitalController = new CreateDocumentoDigitalController()
const listDocumentoDigitalController = new ListDocumentoDigitalController()
const countDocumentoDigitalController = new CountDocumentoDigitalController()
const countPagesDocumentoDigitalController = new CountPagesDocumentoDigitalController()
const countByTipoDocumentoDocumentoDigitalController = new CountByTipoDocumentoDocumentoDigitalController()
const countByDepartamentoDocumentoDigitalController = new CountByDepartamentoDocumentoDigitalController()
const selectDocumentoDigitalController = new SelectDocumentoDigitalController()
const countProcessingDocumentoDigitalController = new CountProcessingDocumentoDigitalController()
const pageDocumentoDigitalController = new PageDocumentoDigitalController()
const extracaoDocumentoDigitalController = new ExtracaoDocumentoDigitalController()
const extracaoS3DocumentoDigitalController = new ExtracaoS3DocumentoDigitalController()
const getPdfDocumentoDigitalController = new GetPdfDocumentoDigitalController()
const idSelectDocumentoDigitalController = new IdSelectDocumentoDigitalController()
const getDocumentoDigitalController = new GetDocumentoDigitalController()
const updateDocumentoDigitalController = new UpdateDocumentoDigitalController()
const deleteDocumentoDigitalController = new DeleteDocumentoDigitalController()
const multiDeleteDocumentoDigitalController = new MultiDeleteDocumentoDigitalController()
const solicitarDocumentoFisicoController = new SolicitarDocumentoFisicoController()
const listSolicitacaoController = new ListSolicitacaoController()

documentosDigitaisRoutes.get('/solicitacao', ensureAuthenticated, listSolicitacaoController.handle)
documentosDigitaisRoutes.post('/', ensureAuthenticated, createDocumentoDigitalController.handle )
documentosDigitaisRoutes.post('/list', ensureAuthenticated, listDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/count', ensureAuthenticated, countDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/count-pages', ensureAuthenticated, countPagesDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/count-by-tipo-documento', ensureAuthenticated, countByTipoDocumentoDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/count-by-departamento', ensureAuthenticated, countByDepartamentoDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/page', ensureAuthenticated, pageDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/extracao', ensureAuthenticated, uploadFile.single('file'), extracaoDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/extracao-s3', ensureAuthenticated, extracaoS3DocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/pdf', ensureAuthenticated, getPdfDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/select/:id', ensureAuthenticated, idSelectDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/select', ensureAuthenticated, selectDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/processing', ensureAuthenticated, countProcessingDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/:id', ensureAuthenticated, getDocumentoDigitalController.handle)
documentosDigitaisRoutes.put('/:id', ensureAuthenticated, updateDocumentoDigitalController.handle)
documentosDigitaisRoutes.delete('/:id', ensureAuthenticated, deleteDocumentoDigitalController.handle)
documentosDigitaisRoutes.delete('/', ensureAuthenticated, multiDeleteDocumentoDigitalController.handle)
documentosDigitaisRoutes.patch('/solicitar-documento-fisico/', ensureAuthenticated, solicitarDocumentoFisicoController.handle)

export { documentosDigitaisRoutes }
