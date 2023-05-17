import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { PoPageModule } from "@po-ui/ng-components"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DefaultComponent } from "./_layouts/default/default.component"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
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
import { TokenInterceptorService } from "./services/token-interceptor.service"
import { ErrorInterceptorService } from "./services/error-interceptor.service"
import { NotAuthorizedComponent } from './pages/security/not-authorized/not-authorized.component'

import { SharedModule } from "./shared/shared.module"
import { PdfViewerModule } from "ng2-pdf-viewer"
import { PouiModule } from "./modules/poui.module"

// PO-UI
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    BlockReasonEditComponent,
    BlockReasonListComponent,
    UserGroupEditComponent,
    UserGroupListComponent,
    UserEditComponent,
    UserListComponent,
    ModuleEditComponent,
    ModuleListComponent,
    MenuOptionEditComponent,
    MenuOptionListComponent,
    ProfileEditComponent,
    ProfileListComponent,
    ProfileOptionEditComponent,
    ProfileOptionListComponent,
    UserProfileEditComponent,
    UserProfileListComponent,
    NavigationEditComponent,
    NavigationListComponent,
    EstadoEditComponent,
    EstadoListComponent,
    CidadeEditComponent,
    CidadeListComponent,
    ServicoEditComponent,
    ServicoListComponent,
    StatusEditComponent,
    StatusListComponent,
    TipoAfastamentoEditComponent,
    TipoAfastamentoListComponent,
    ComposicaoLoteEditComponent,
    ComposicaoLoteListComponent,
    FrequenciaEditComponent,
    FrequenciaListComponent,
    UnidadeSlaEditComponent,
    UnidadeSlaListComponent,
    ClienteEditComponent,
    ClienteListComponent,
    DepartamentoEditComponent,
    DepartamentoListComponent,
    SolicitanteEditComponent,
    SolicitanteListComponent,
    ContratoEditComponent,
    ContratoListComponent,
    TipoDocumentoEditComponent,
    TipoDocumentoListComponent,
    PontoColetaEditComponent,
    PontoColetaListComponent,
    FrequenciaColetaEditComponent,
    FrequenciaColetaListComponent,
    ServicoContratadoEditComponent,
    ServicoContratadoListComponent,
    FuncaoEditComponent,
    FuncaoListComponent,
    PessoaEditComponent,
    PessoaListComponent,
    JornadaEditComponent,
    JornadaListComponent,
    EscalaEditComponent,
    EscalaListComponent,
    AfastamentoEditComponent,
    AfastamentoListComponent,
    VeiculoEditComponent,
    VeiculoListComponent,
    EntregadorEditComponent,
    EntregadorListComponent,
    ColetaEditComponent,
    ColetaListComponent,
    TimeColetaEditComponent,
    TimeColetaListComponent,
    VolumeEditComponent,
    VolumeListComponent,
    RastreamentoVolumeEditComponent,
    RastreamentoVolumeListComponent,
    DocumentoEditComponent,
    DocumentoListComponent,
    RastreamentoDocumentoEditComponent,
    RastreamentoDocumentoListComponent,
    VersaoDocumentoEditComponent,
    VersaoDocumentoListComponent,
    CampoDocumentoEditComponent,
    CampoDocumentoListComponent,
    DocumentoDigitalEditComponent,
    DocumentoDigitalListComponent,
    DocumentoDigitalCampoEditComponent,
    DocumentoDigitalCampoListComponent,
    UnidadeEditComponent,
    UnidadeListComponent,
    PlantaEditComponent,
    PlantaListComponent,
    PosicaoEditComponent,
    PosicaoListComponent,
    DefaultComponent,
    HomeComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]),
    PoPageModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
