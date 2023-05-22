import { Router } from 'express'
import { authenticateRoutes } from './authentication/authenticate-routes'
import { userGroupsRoutes } from './security/user-groups-routes'
import { blockReasonsRoutes } from './security/block-reasons-routes'
import { usersRoutes } from './authentication/users-routes'
import { tfaRoutes } from './authentication/tfa-routes'
import { usersSecurityRoutes } from './security/users-security-routes'
import { passwordsRoutes } from './authentication/passwords-routes'
import { modulesRoutes } from './security/modules-routes'
import { menuOptionsRoutes } from './security/menu-options-routes'
import { profilesRoutes } from './security/profiles-routes'
import { profileOptionsRoutes } from './security/profile-options-routes'
import { usersProfilesRoutes } from './security/users-profiles-routes'
import { navigationsRoutes } from './security/navigations-routes'
import { configsRoutes } from './security/configs-routes'
import { filtersRoutes } from './security/filters-routes'
import { paisesRoutes } from './comum/paises-routes'
import { estadosRoutes } from './comum/estados-routes'
import { cidadesRoutes } from './comum/cidades-routes'
import { cepsRoutes } from './comum/ceps-routes'
import { tiposAfastamentoRoutes } from './comum/tipos-afastamento-routes'
import { clientesRoutes } from './clientes/clientes-routes'
import { departamentosRoutes } from './clientes/departamentos-routes'
import { solicitantesRoutes } from './clientes/solicitantes-routes'
import { pontosColetaRoutes } from './clientes/pontos-coleta-routes'
import { frequenciaColetasRoutes } from './clientes/frequencia-coletas-routes'
import { servicosContratadosRoutes } from './clientes/servicos-contratados-routes'
import { sugestoesRoutes } from './clientes/sugestoes-routes'
import { funcoesRoutes } from './pessoas/funcoes-routes'
import { pessoasRoutes } from './pessoas/pessoas-routes'
import { jornadasRoutes } from './pessoas/jornadas-routes'
import { escalasRoutes } from './pessoas/escalas-routes'
import { afastamentosRoutes } from './pessoas/afastamentos-routes'
import { veiculosRoutes } from './coleta/veiculos-routes'
import { entregadoresRoutes } from './coleta/entregadores-routes'
import { coletasRoutes } from './coleta/coletas-routes'
import { timesColetaRoutes } from './coleta/times-coleta-routes'
import { volumesRoutes } from './coleta/volumes-routes'
import { rastreamentoVolumesRoutes } from './coleta/rastreamento-volumes-routes'
import { tiposDocumentoRoutes } from './digitalizacao/tipos-documento-routes'
import { camposDocumentoRoutes } from './digitalizacao/campos-documento-routes'
import { documentosDigitaisRoutes } from './digitalizacao/documentos-digitais-routes'
import { documentosDigitaisCamposRoutes } from './digitalizacao/documentos-digitais-campos-routes'
import { quebraManualRoutes } from './digitalizacao/quebra-manual-routes'
import { unidadesRoutes } from './armazenamento/unidades-routes'
import { plantasRoutes } from './armazenamento/plantas-routes'
import { posicoesRoutes } from './armazenamento/posicoes-routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/block-reasons', blockReasonsRoutes)
router.use('/user-groups', userGroupsRoutes)
router.use('/users', usersRoutes)
router.use('/tfa', tfaRoutes)
router.use('/users-security', usersSecurityRoutes)
router.use('/passwords', passwordsRoutes)
router.use('/modules', modulesRoutes)
router.use('/menu-options', menuOptionsRoutes)
router.use('/profiles', profilesRoutes)
router.use('/profile-options', profileOptionsRoutes)
router.use('/users-profiles', usersProfilesRoutes)
router.use('/navigations', navigationsRoutes)
router.use('/configs', configsRoutes)
router.use('/filters', filtersRoutes)
router.use('/paises', paisesRoutes)
router.use('/estados', estadosRoutes)
router.use('/cidades', cidadesRoutes)
router.use('/ceps', cepsRoutes)
router.use('/tipos-afastamento', tiposAfastamentoRoutes)
router.use('/clientes', clientesRoutes)
router.use('/departamentos', departamentosRoutes)
router.use('/solicitantes', solicitantesRoutes)
router.use('/pontos-coleta', pontosColetaRoutes)
router.use('/frequencia-coletas', frequenciaColetasRoutes)
router.use('/servicos-contratados', servicosContratadosRoutes)
router.use('/sugestoes', sugestoesRoutes)
router.use('/funcoes', funcoesRoutes)
router.use('/pessoas', pessoasRoutes)
router.use('/jornadas', jornadasRoutes)
router.use('/escalas', escalasRoutes)
router.use('/afastamentos', afastamentosRoutes)
router.use('/veiculos', veiculosRoutes)
router.use('/entregadores', entregadoresRoutes)
router.use('/coletas', coletasRoutes)
router.use('/times-coleta', timesColetaRoutes)
router.use('/volumes', volumesRoutes)
router.use('/rastreamento-volumes', rastreamentoVolumesRoutes)
router.use('/tipos-documento', tiposDocumentoRoutes)
router.use('/campos-documento', camposDocumentoRoutes)
router.use('/documentos-digitais', documentosDigitaisRoutes)
router.use('/documentos-digitais-campos', documentosDigitaisCamposRoutes)
router.use('/quebras-manuais', quebraManualRoutes)
router.use('/unidades', unidadesRoutes)
router.use('/plantas', plantasRoutes)
router.use('/posicoes', posicoesRoutes)

export { router }
