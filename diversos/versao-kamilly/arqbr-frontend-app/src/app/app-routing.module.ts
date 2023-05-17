import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DefaultComponent } from "./_layouts/default/default.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
import { BlockReasonEditComponent } from "./pages/security/block-reason/block-reason-edit/block-reason-edit.component"
import { BlockReasonListComponent } from "./pages/security/block-reason/block-reason-list/block-reason-list.component"
import { UserGroupEditComponent } from "./pages/security/user-group/user-group-edit/user-group-edit.component"
import { UserGroupListComponent } from "./pages/security/user-group/user-group-list/user-group-list.component"
import { UserEditComponent } from "./pages/security/user/user-edit/user-edit.component"
import { UserListComponent } from "./pages/security/user/user-list/user-list.component"
import { ModuleEditComponent } from "./pages/security/module/module-edit/module-edit.component"
import { ModuleListComponent } from "./pages/security/module/module-list/module-list.component"
import { MenuOptionEditComponent } from "./pages/security/menu-option/menu-option-edit/menu-option-edit.component"
import { MenuOptionListComponent } from "./pages/security/menu-option/menu-option-list/menu-option-list.component"
import { ProfileEditComponent } from "./pages/security/profile/profile-edit/profile-edit.component"
import { ProfileListComponent } from "./pages/security/profile/profile-list/profile-list.component"
import { ProfileOptionEditComponent } from "./pages/security/profile-option/profile-option-edit/profile-option-edit.component"
import { ProfileOptionListComponent } from "./pages/security/profile-option/profile-option-list/profile-option-list.component"
import { UserProfileEditComponent } from "./pages/security/user-profile/user-profile-edit/user-profile-edit.component"
import { UserProfileListComponent } from "./pages/security/user-profile/user-profile-list/user-profile-list.component"
import { NavigationEditComponent } from "./pages/security/navigation/navigation-edit/navigation-edit.component"
import { NavigationListComponent } from "./pages/security/navigation/navigation-list/navigation-list.component"
import { EstadoEditComponent } from "./pages/comum/estado/estado-edit/estado-edit.component"
import { EstadoListComponent } from "./pages/comum/estado/estado-list/estado-list.component"
import { CidadeEditComponent } from "./pages/comum/cidade/cidade-edit/cidade-edit.component"
import { CidadeListComponent } from "./pages/comum/cidade/cidade-list/cidade-list.component"
import { ServicoEditComponent } from "./pages/comum/servico/servico-edit/servico-edit.component"
import { ServicoListComponent } from "./pages/comum/servico/servico-list/servico-list.component"
import { StatusEditComponent } from "./pages/comum/status/status-edit/status-edit.component"
import { StatusListComponent } from "./pages/comum/status/status-list/status-list.component"
import { TipoAfastamentoEditComponent } from "./pages/comum/tipo-afastamento/tipo-afastamento-edit/tipo-afastamento-edit.component"
import { TipoAfastamentoListComponent } from "./pages/comum/tipo-afastamento/tipo-afastamento-list/tipo-afastamento-list.component"
import { ComposicaoLoteEditComponent } from "./pages/comum/composicao-lote/composicao-lote-edit/composicao-lote-edit.component"
import { ComposicaoLoteListComponent } from "./pages/comum/composicao-lote/composicao-lote-list/composicao-lote-list.component"
import { FrequenciaEditComponent } from "./pages/comum/frequencia/frequencia-edit/frequencia-edit.component"
import { FrequenciaListComponent } from "./pages/comum/frequencia/frequencia-list/frequencia-list.component"
import { UnidadeSlaEditComponent } from "./pages/comum/unidade-sla/unidade-sla-edit/unidade-sla-edit.component"
import { UnidadeSlaListComponent } from "./pages/comum/unidade-sla/unidade-sla-list/unidade-sla-list.component"
import { ClienteEditComponent } from "./pages/clientes/cliente/cliente-edit/cliente-edit.component"
import { ClienteListComponent } from "./pages/clientes/cliente/cliente-list/cliente-list.component"
import { DepartamentoEditComponent } from "./pages/clientes/departamento/departamento-edit/departamento-edit.component"
import { DepartamentoListComponent } from "./pages/clientes/departamento/departamento-list/departamento-list.component"
import { SolicitanteEditComponent } from "./pages/clientes/solicitante/solicitante-edit/solicitante-edit.component"
import { SolicitanteListComponent } from "./pages/clientes/solicitante/solicitante-list/solicitante-list.component"
import { ContratoEditComponent } from "./pages/clientes/contrato/contrato-edit/contrato-edit.component"
import { ContratoListComponent } from "./pages/clientes/contrato/contrato-list/contrato-list.component"
import { TipoDocumentoEditComponent } from "./pages/clientes/tipo-documento/tipo-documento-edit/tipo-documento-edit.component"
import { TipoDocumentoListComponent } from "./pages/clientes/tipo-documento/tipo-documento-list/tipo-documento-list.component"
import { PontoColetaEditComponent } from "./pages/clientes/ponto-coleta/ponto-coleta-edit/ponto-coleta-edit.component"
import { PontoColetaListComponent } from "./pages/clientes/ponto-coleta/ponto-coleta-list/ponto-coleta-list.component"
import { FrequenciaColetaEditComponent } from "./pages/clientes/frequencia-coleta/frequencia-coleta-edit/frequencia-coleta-edit.component"
import { FrequenciaColetaListComponent } from "./pages/clientes/frequencia-coleta/frequencia-coleta-list/frequencia-coleta-list.component"
import { ServicoContratadoEditComponent } from "./pages/clientes/servico-contratado/servico-contratado-edit/servico-contratado-edit.component"
import { ServicoContratadoListComponent } from "./pages/clientes/servico-contratado/servico-contratado-list/servico-contratado-list.component"
import { FuncaoEditComponent } from "./pages/pessoas/funcao/funcao-edit/funcao-edit.component"
import { FuncaoListComponent } from "./pages/pessoas/funcao/funcao-list/funcao-list.component"
import { PessoaEditComponent } from "./pages/pessoas/pessoa/pessoa-edit/pessoa-edit.component"
import { PessoaListComponent } from "./pages/pessoas/pessoa/pessoa-list/pessoa-list.component"
import { JornadaEditComponent } from "./pages/pessoas/jornada/jornada-edit/jornada-edit.component"
import { JornadaListComponent } from "./pages/pessoas/jornada/jornada-list/jornada-list.component"
import { EscalaEditComponent } from "./pages/pessoas/escala/escala-edit/escala-edit.component"
import { EscalaListComponent } from "./pages/pessoas/escala/escala-list/escala-list.component"
import { AfastamentoEditComponent } from "./pages/pessoas/afastamento/afastamento-edit/afastamento-edit.component"
import { AfastamentoListComponent } from "./pages/pessoas/afastamento/afastamento-list/afastamento-list.component"
import { VeiculoEditComponent } from "./pages/coleta/veiculo/veiculo-edit/veiculo-edit.component"
import { VeiculoListComponent } from "./pages/coleta/veiculo/veiculo-list/veiculo-list.component"
import { EntregadorEditComponent } from "./pages/coleta/entregador/entregador-edit/entregador-edit.component"
import { EntregadorListComponent } from "./pages/coleta/entregador/entregador-list/entregador-list.component"
import { ColetaEditComponent } from "./pages/coleta/coleta/coleta-edit/coleta-edit.component"
import { ColetaListComponent } from "./pages/coleta/coleta/coleta-list/coleta-list.component"
import { TimeColetaEditComponent } from "./pages/coleta/time-coleta/time-coleta-edit/time-coleta-edit.component"
import { TimeColetaListComponent } from "./pages/coleta/time-coleta/time-coleta-list/time-coleta-list.component"
import { VolumeEditComponent } from "./pages/coleta/volume/volume-edit/volume-edit.component"
import { VolumeListComponent } from "./pages/coleta/volume/volume-list/volume-list.component"
import { RastreamentoVolumeEditComponent } from "./pages/coleta/rastreamento-volume/rastreamento-volume-edit/rastreamento-volume-edit.component"
import { RastreamentoVolumeListComponent } from "./pages/coleta/rastreamento-volume/rastreamento-volume-list/rastreamento-volume-list.component"
import { DocumentoEditComponent } from "./pages/classificacao/documento/documento-edit/documento-edit.component"
import { DocumentoListComponent } from "./pages/classificacao/documento/documento-list/documento-list.component"
import { RastreamentoDocumentoEditComponent } from "./pages/classificacao/rastreamento-documento/rastreamento-documento-edit/rastreamento-documento-edit.component"
import { RastreamentoDocumentoListComponent } from "./pages/classificacao/rastreamento-documento/rastreamento-documento-list/rastreamento-documento-list.component"
import { VersaoDocumentoEditComponent } from "./pages/digitalizacao/versao-documento/versao-documento-edit/versao-documento-edit.component"
import { VersaoDocumentoListComponent } from "./pages/digitalizacao/versao-documento/versao-documento-list/versao-documento-list.component"
import { CampoDocumentoEditComponent } from "./pages/digitalizacao/campo-documento/campo-documento-edit/campo-documento-edit.component"
import { CampoDocumentoListComponent } from "./pages/digitalizacao/campo-documento/campo-documento-list/campo-documento-list.component"
import { DocumentoDigitalEditComponent } from "./pages/digitalizacao/documento-digital/documento-digital-edit/documento-digital-edit.component"
import { DocumentoDigitalListComponent } from "./pages/digitalizacao/documento-digital/documento-digital-list/documento-digital-list.component"
import { DocumentoDigitalCampoEditComponent } from "./pages/digitalizacao/documento-digital-campo/documento-digital-campo-edit/documento-digital-campo-edit.component"
import { DocumentoDigitalCampoListComponent } from "./pages/digitalizacao/documento-digital-campo/documento-digital-campo-list/documento-digital-campo-list.component"
import { UnidadeEditComponent } from "./pages/armazenamento/unidade/unidade-edit/unidade-edit.component"
import { UnidadeListComponent } from "./pages/armazenamento/unidade/unidade-list/unidade-list.component"
import { PlantaEditComponent } from "./pages/armazenamento/planta/planta-edit/planta-edit.component"
import { PlantaListComponent } from "./pages/armazenamento/planta/planta-list/planta-list.component"
import { PosicaoEditComponent } from "./pages/armazenamento/posicao/posicao-edit/posicao-edit.component"
import { PosicaoListComponent } from "./pages/armazenamento/posicao/posicao-list/posicao-list.component"
import { NotAuthorizedComponent } from "./pages/security/not-authorized/not-authorized.component"
import { AuthGuard } from "./services/auth.guard"

// Componentes
const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons",
        component: BlockReasonListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons/new",
        component: BlockReasonEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "block-reasons/edit/:id",
        component: BlockReasonEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups",
        component: UserGroupListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups/new",
        component: UserGroupEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "user-groups/edit/:id",
        component: UserGroupEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/new",
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/edit/:id",
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules",
        component: ModuleListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules/new",
        component: ModuleEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "modules/edit/:id",
        component: ModuleEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options",
        component: MenuOptionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options/new",
        component: MenuOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "menu-options/edit/:id",
        component: MenuOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles",
        component: ProfileListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles/new",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profiles/edit/:id",
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options",
        component: ProfileOptionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options/new",
        component: ProfileOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "profile-options/edit/:id",
        component: ProfileOptionEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles",
        component: UserProfileListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles/new",
        component: UserProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-profiles/edit/:id",
        component: UserProfileEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations",
        component: NavigationListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations/new",
        component: NavigationEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "navigations/edit/:id",
        component: NavigationEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados",
        component: EstadoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/new",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/edit/:id",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "estados/view/:id",
        component: EstadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades",
        component: CidadeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/new",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/edit/:id",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "cidades/view/:id",
        component: CidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos",
        component: ServicoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos/new",
        component: ServicoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos/edit/:id",
        component: ServicoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos/view/:id",
        component: ServicoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "statuses",
        component: StatusListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "statuses/new",
        component: StatusEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "statuses/edit/:id",
        component: StatusEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "statuses/view/:id",
        component: StatusEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-afastamento",
        component: TipoAfastamentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-afastamento/new",
        component: TipoAfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-afastamento/edit/:id",
        component: TipoAfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-afastamento/view/:id",
        component: TipoAfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "composicao-lotes",
        component: ComposicaoLoteListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "composicao-lotes/new",
        component: ComposicaoLoteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "composicao-lotes/edit/:id",
        component: ComposicaoLoteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "composicao-lotes/view/:id",
        component: ComposicaoLoteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencias",
        component: FrequenciaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencias/new",
        component: FrequenciaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencias/edit/:id",
        component: FrequenciaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencias/view/:id",
        component: FrequenciaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades-sla",
        component: UnidadeSlaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades-sla/new",
        component: UnidadeSlaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades-sla/edit/:id",
        component: UnidadeSlaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades-sla/view/:id",
        component: UnidadeSlaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "clientes",
        component: ClienteListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "clientes/new",
        component: ClienteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "clientes/edit/:id",
        component: ClienteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "clientes/view/:id",
        component: ClienteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "departamentos",
        component: DepartamentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "departamentos/new",
        component: DepartamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "departamentos/edit/:id",
        component: DepartamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "departamentos/view/:id",
        component: DepartamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitantes",
        component: SolicitanteListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitantes/new",
        component: SolicitanteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitantes/edit/:id",
        component: SolicitanteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitantes/view/:id",
        component: SolicitanteEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "contratos",
        component: ContratoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "contratos/new",
        component: ContratoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "contratos/edit/:id",
        component: ContratoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "contratos/view/:id",
        component: ContratoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-documento",
        component: TipoDocumentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-documento/new",
        component: TipoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-documento/edit/:id",
        component: TipoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "tipos-documento/view/:id",
        component: TipoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pontos-coleta",
        component: PontoColetaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pontos-coleta/new",
        component: PontoColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pontos-coleta/edit/:id",
        component: PontoColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pontos-coleta/view/:id",
        component: PontoColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencia-coletas",
        component: FrequenciaColetaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencia-coletas/new",
        component: FrequenciaColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencia-coletas/edit/:id",
        component: FrequenciaColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "frequencia-coletas/view/:id",
        component: FrequenciaColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos-contratados",
        component: ServicoContratadoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos-contratados/new",
        component: ServicoContratadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos-contratados/edit/:id",
        component: ServicoContratadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "servicos-contratados/view/:id",
        component: ServicoContratadoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "funcoes",
        component: FuncaoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "funcoes/new",
        component: FuncaoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "funcoes/edit/:id",
        component: FuncaoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "funcoes/view/:id",
        component: FuncaoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pessoas",
        component: PessoaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pessoas/new",
        component: PessoaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pessoas/edit/:id",
        component: PessoaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "pessoas/view/:id",
        component: PessoaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jornadas",
        component: JornadaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jornadas/new",
        component: JornadaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jornadas/edit/:id",
        component: JornadaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "jornadas/view/:id",
        component: JornadaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "escalas",
        component: EscalaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "escalas/new",
        component: EscalaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "escalas/edit/:id",
        component: EscalaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "escalas/view/:id",
        component: EscalaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "afastamentos",
        component: AfastamentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "afastamentos/new",
        component: AfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "afastamentos/edit/:id",
        component: AfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "afastamentos/view/:id",
        component: AfastamentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "veiculos",
        component: VeiculoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "veiculos/new",
        component: VeiculoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "veiculos/edit/:id",
        component: VeiculoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "veiculos/view/:id",
        component: VeiculoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "entregadores",
        component: EntregadorListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "entregadores/new",
        component: EntregadorEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "entregadores/edit/:id",
        component: EntregadorEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "entregadores/view/:id",
        component: EntregadorEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coletas",
        component: ColetaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coletas/new",
        component: ColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coletas/edit/:id",
        component: ColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "coletas/view/:id",
        component: ColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "times-coleta",
        component: TimeColetaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "times-coleta/new",
        component: TimeColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "times-coleta/edit/:id",
        component: TimeColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "times-coleta/view/:id",
        component: TimeColetaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "volumes",
        component: VolumeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "volumes/new",
        component: VolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "volumes/edit/:id",
        component: VolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "volumes/view/:id",
        component: VolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-volumes",
        component: RastreamentoVolumeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-volumes/new",
        component: RastreamentoVolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-volumes/edit/:id",
        component: RastreamentoVolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-volumes/view/:id",
        component: RastreamentoVolumeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos",
        component: DocumentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos/new",
        component: DocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos/edit/:id",
        component: DocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos/view/:id",
        component: DocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-documentos",
        component: RastreamentoDocumentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-documentos/new",
        component: RastreamentoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-documentos/edit/:id",
        component: RastreamentoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "rastreamento-documentos/view/:id",
        component: RastreamentoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "versoes-documento",
        component: VersaoDocumentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "versoes-documento/new",
        component: VersaoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "versoes-documento/edit/:id",
        component: VersaoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "versoes-documento/view/:id",
        component: VersaoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "campos-documento",
        component: CampoDocumentoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "campos-documento/new",
        component: CampoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "campos-documento/edit/:id",
        component: CampoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "campos-documento/view/:id",
        component: CampoDocumentoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais",
        component: DocumentoDigitalListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais/new",
        component: DocumentoDigitalEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais/edit/:id",
        component: DocumentoDigitalEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais/view/:id",
        component: DocumentoDigitalEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais-campos",
        component: DocumentoDigitalCampoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais-campos/new",
        component: DocumentoDigitalCampoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais-campos/edit/:id",
        component: DocumentoDigitalCampoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "documentos-digitais-campos/view/:id",
        component: DocumentoDigitalCampoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades",
        component: UnidadeListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades/new",
        component: UnidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades/edit/:id",
        component: UnidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "unidades/view/:id",
        component: UnidadeEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "plantas",
        component: PlantaListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "plantas/new",
        component: PlantaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "plantas/edit/:id",
        component: PlantaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "plantas/view/:id",
        component: PlantaEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "posicoes",
        component: PosicaoListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "posicoes/new",
        component: PosicaoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "posicoes/edit/:id",
        component: PosicaoEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "posicoes/view/:id",
        component: PosicaoEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset/:id",
    component: ResetPasswordComponent,
  },
  {
    path: "not-authorized",
    component: NotAuthorizedComponent
  },

  { path: "**", redirectTo: "/login" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
