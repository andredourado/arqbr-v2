import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { UserSecurityRepository } from '@modules/security/infra/typeorm/repositories/user-security-repository'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import { UserTokenRepository } from '@modules/authentication/infra/typeorm/repositories/user-token-repository'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReasonRepository } from '@modules/security/infra/typeorm/repositories/block-reason-repository'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroupRepository } from '@modules/security/infra/typeorm/repositories/user-group-repository'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { ModuleRepository } from '@modules/security/infra/typeorm/repositories/module-repository'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { ProfileRepository } from '@modules/security/infra/typeorm/repositories/profile-repository'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { MenuOptionRepository } from '@modules/security/infra/typeorm/repositories/menu-option-repository'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { NavigationRepository } from '@modules/security/infra/typeorm/repositories/navigation-repository'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfileRepository } from '@modules/security/infra/typeorm/repositories/user-profile-repository'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOptionRepository } from '@modules/security/infra/typeorm/repositories/profile-option-repository'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { ConfigRepository } from '@modules/security/infra/typeorm/repositories/config-repository'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { FilterRepository } from '@modules/security/infra/typeorm/repositories/filter-repository'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { PaisRepository } from '@modules/comum/infra/typeorm/repositories/pais-repository'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { EstadoRepository } from '@modules/comum/infra/typeorm/repositories/estado-repository'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { CidadeRepository } from '@modules/comum/infra/typeorm/repositories/cidade-repository'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { CepRepository } from '@modules/comum/infra/typeorm/repositories/cep-repository'
import { ITipoAfastamentoRepository } from '@modules/comum/repositories/i-tipo-afastamento-repository'
import { TipoAfastamentoRepository } from '@modules/comum/infra/typeorm/repositories/tipo-afastamento-repository'
import { IClienteRepository } from '@modules/clientes/repositories/i-cliente-repository'
import { ClienteRepository } from '@modules/clientes/infra/typeorm/repositories/cliente-repository'
import { IDepartamentoRepository } from '@modules/clientes/repositories/i-departamento-repository'
import { DepartamentoRepository } from '@modules/clientes/infra/typeorm/repositories/departamento-repository'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { SolicitanteRepository } from '@modules/clientes/infra/typeorm/repositories/solicitante-repository'
import { IPontoColetaRepository } from '@modules/clientes/repositories/i-ponto-coleta-repository'
import { PontoColetaRepository } from '@modules/clientes/infra/typeorm/repositories/ponto-coleta-repository'
import { IFrequenciaColetaRepository } from '@modules/clientes/repositories/i-frequencia-coleta-repository'
import { FrequenciaColetaRepository } from '@modules/clientes/infra/typeorm/repositories/frequencia-coleta-repository'
import { IServicoContratadoRepository } from '@modules/clientes/repositories/i-servico-contratado-repository'
import { ServicoContratadoRepository } from '@modules/clientes/infra/typeorm/repositories/servico-contratado-repository'
import { ISugestaoRepository } from '@modules/clientes/repositories/i-sugestao-repository'
import { SugestaoRepository } from '@modules/clientes/infra/typeorm/repositories/sugestao-repository'
import { IFuncaoRepository } from '@modules/pessoas/repositories/i-funcao-repository'
import { FuncaoRepository } from '@modules/pessoas/infra/typeorm/repositories/funcao-repository'
import { IPessoaRepository } from '@modules/pessoas/repositories/i-pessoa-repository'
import { PessoaRepository } from '@modules/pessoas/infra/typeorm/repositories/pessoa-repository'
import { IJornadaRepository } from '@modules/pessoas/repositories/i-jornada-repository'
import { JornadaRepository } from '@modules/pessoas/infra/typeorm/repositories/jornada-repository'
import { IEscalaRepository } from '@modules/pessoas/repositories/i-escala-repository'
import { EscalaRepository } from '@modules/pessoas/infra/typeorm/repositories/escala-repository'
import { IAfastamentoRepository } from '@modules/pessoas/repositories/i-afastamento-repository'
import { AfastamentoRepository } from '@modules/pessoas/infra/typeorm/repositories/afastamento-repository'
import { IVeiculoRepository } from '@modules/coleta/repositories/i-veiculo-repository'
import { VeiculoRepository } from '@modules/coleta/infra/typeorm/repositories/veiculo-repository'
import { IEntregadorRepository } from '@modules/coleta/repositories/i-entregador-repository'
import { EntregadorRepository } from '@modules/coleta/infra/typeorm/repositories/entregador-repository'
import { IColetaRepository } from '@modules/coleta/repositories/i-coleta-repository'
import { ColetaRepository } from '@modules/coleta/infra/typeorm/repositories/coleta-repository'
import { ITimeColetaRepository } from '@modules/coleta/repositories/i-time-coleta-repository'
import { TimeColetaRepository } from '@modules/coleta/infra/typeorm/repositories/time-coleta-repository'
import { IVolumeRepository } from '@modules/coleta/repositories/i-volume-repository'
import { VolumeRepository } from '@modules/coleta/infra/typeorm/repositories/volume-repository'
import { IRastreamentoVolumeRepository } from '@modules/coleta/repositories/i-rastreamento-volume-repository'
import { RastreamentoVolumeRepository } from '@modules/coleta/infra/typeorm/repositories/rastreamento-volume-repository'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { TipoDocumentoRepository } from '@modules/digitalizacao/infra/typeorm/repositories/tipo-documento-repository'
import { ICampoDocumentoRepository } from '@modules/digitalizacao/repositories/i-campo-documento-repository'
import { CampoDocumentoRepository } from '@modules/digitalizacao/infra/typeorm/repositories/campo-documento-repository'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { DocumentoDigitalRepository } from '@modules/digitalizacao/infra/typeorm/repositories/documento-digital-repository'
import { IDocumentoDigitalCampoRepository } from '@modules/digitalizacao/repositories/i-documento-digital-campo-repository'
import { DocumentoDigitalCampoRepository } from '@modules/digitalizacao/infra/typeorm/repositories/documento-digital-campo-repository'
import { IUnidadeRepository } from '@modules/armazenamento/repositories/i-unidade-repository'
import { UnidadeRepository } from '@modules/armazenamento/infra/typeorm/repositories/unidade-repository'
import { IPlantaRepository } from '@modules/armazenamento/repositories/i-planta-repository'
import { PlantaRepository } from '@modules/armazenamento/infra/typeorm/repositories/planta-repository'
import { IPosicaoRepository } from '@modules/armazenamento/repositories/i-posicao-repository'
import { PosicaoRepository } from '@modules/armazenamento/infra/typeorm/repositories/posicao-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserSecurityRepository>('UserSecurityRepository', UserSecurityRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IBlockReasonRepository>('BlockReasonRepository', BlockReasonRepository)
container.registerSingleton<IUserGroupRepository>('UserGroupRepository', UserGroupRepository)
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository)
container.registerSingleton<IProfileRepository>('ProfileRepository', ProfileRepository)
container.registerSingleton<IMenuOptionRepository>('MenuOptionRepository', MenuOptionRepository)
container.registerSingleton<INavigationRepository>('NavigationRepository', NavigationRepository)
container.registerSingleton<IUserProfileRepository>('UserProfileRepository', UserProfileRepository)
container.registerSingleton<IProfileOptionRepository>('ProfileOptionRepository', ProfileOptionRepository)
container.registerSingleton<IConfigRepository>('ConfigRepository', ConfigRepository)
container.registerSingleton<IFilterRepository>('FilterRepository', FilterRepository)
container.registerSingleton<IPaisRepository>('PaisRepository', PaisRepository)
container.registerSingleton<IEstadoRepository>('EstadoRepository', EstadoRepository)
container.registerSingleton<ICidadeRepository>('CidadeRepository', CidadeRepository)
container.registerSingleton<ICepRepository>('CepRepository', CepRepository)
container.registerSingleton<ITipoAfastamentoRepository>('TipoAfastamentoRepository', TipoAfastamentoRepository)
container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
container.registerSingleton<IDepartamentoRepository>('DepartamentoRepository', DepartamentoRepository)
container.registerSingleton<ISolicitanteRepository>('SolicitanteRepository', SolicitanteRepository)
container.registerSingleton<IPontoColetaRepository>('PontoColetaRepository', PontoColetaRepository)
container.registerSingleton<IFrequenciaColetaRepository>('FrequenciaColetaRepository', FrequenciaColetaRepository)
container.registerSingleton<IServicoContratadoRepository>('ServicoContratadoRepository', ServicoContratadoRepository)
container.registerSingleton<ISugestaoRepository>('SugestaoRepository', SugestaoRepository)
container.registerSingleton<IFuncaoRepository>('FuncaoRepository', FuncaoRepository)
container.registerSingleton<IPessoaRepository>('PessoaRepository', PessoaRepository)
container.registerSingleton<IJornadaRepository>('JornadaRepository', JornadaRepository)
container.registerSingleton<IEscalaRepository>('EscalaRepository', EscalaRepository)
container.registerSingleton<IAfastamentoRepository>('AfastamentoRepository', AfastamentoRepository)
container.registerSingleton<IVeiculoRepository>('VeiculoRepository', VeiculoRepository)
container.registerSingleton<IEntregadorRepository>('EntregadorRepository', EntregadorRepository)
container.registerSingleton<IColetaRepository>('ColetaRepository', ColetaRepository)
container.registerSingleton<ITimeColetaRepository>('TimeColetaRepository', TimeColetaRepository)
container.registerSingleton<IVolumeRepository>('VolumeRepository', VolumeRepository)
container.registerSingleton<IRastreamentoVolumeRepository>('RastreamentoVolumeRepository', RastreamentoVolumeRepository)
container.registerSingleton<ITipoDocumentoRepository>('TipoDocumentoRepository', TipoDocumentoRepository)
container.registerSingleton<ICampoDocumentoRepository>('CampoDocumentoRepository', CampoDocumentoRepository)
container.registerSingleton<IDocumentoDigitalRepository>('DocumentoDigitalRepository', DocumentoDigitalRepository)
container.registerSingleton<IDocumentoDigitalCampoRepository>('DocumentoDigitalCampoRepository', DocumentoDigitalCampoRepository)
container.registerSingleton<IUnidadeRepository>('UnidadeRepository', UnidadeRepository)
container.registerSingleton<IPlantaRepository>('PlantaRepository', PlantaRepository)
container.registerSingleton<IPosicaoRepository>('PosicaoRepository', PosicaoRepository)
