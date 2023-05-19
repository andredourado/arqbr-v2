import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { PoPageModule, PoI18nModule, PoModule } from "@po-ui/ng-components"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DefaultComponent } from "./_layouts/default/default.component"
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { NoDataComponent } from './components/no-data/no-data.component'
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { SavedFilterComponent } from './components/filter-modal/saved-filter/saved-filter.component'
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
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
import { PaisEditComponent } from "./pages/comum/pais/pais-edit/pais-edit.component"
import { PaisListComponent } from "./pages/comum/pais/pais-list/pais-list.component"
import { EstadoEditComponent } from "./pages/comum/estado/estado-edit/estado-edit.component"
import { EstadoListComponent } from "./pages/comum/estado/estado-list/estado-list.component"
import { CidadeEditComponent } from "./pages/comum/cidade/cidade-edit/cidade-edit.component"
import { CidadeListComponent } from "./pages/comum/cidade/cidade-list/cidade-list.component"
import { CepEditComponent } from "./pages/comum/cep/cep-edit/cep-edit.component"
import { CepListComponent } from "./pages/comum/cep/cep-list/cep-list.component"
import { TipoAfastamentoEditComponent } from "./pages/comum/tipo-afastamento/tipo-afastamento-edit/tipo-afastamento-edit.component"
import { TipoAfastamentoListComponent } from "./pages/comum/tipo-afastamento/tipo-afastamento-list/tipo-afastamento-list.component"
import { ClienteEditComponent } from "./pages/clientes/cliente/cliente-edit/cliente-edit.component"
import { ClienteListComponent } from "./pages/clientes/cliente/cliente-list/cliente-list.component"
import { DepartamentoEditComponent } from "./pages/clientes/departamento/departamento-edit/departamento-edit.component"
import { DepartamentoListComponent } from "./pages/clientes/departamento/departamento-list/departamento-list.component"
import { SolicitanteEditComponent } from "./pages/clientes/solicitante/solicitante-edit/solicitante-edit.component"
import { SolicitanteListComponent } from "./pages/clientes/solicitante/solicitante-list/solicitante-list.component"
import { PontoColetaEditComponent } from "./pages/clientes/ponto-coleta/ponto-coleta-edit/ponto-coleta-edit.component"
import { PontoColetaListComponent } from "./pages/clientes/ponto-coleta/ponto-coleta-list/ponto-coleta-list.component"
import { FrequenciaColetaEditComponent } from "./pages/clientes/frequencia-coleta/frequencia-coleta-edit/frequencia-coleta-edit.component"
import { FrequenciaColetaListComponent } from "./pages/clientes/frequencia-coleta/frequencia-coleta-list/frequencia-coleta-list.component"
import { ServicoContratadoEditComponent } from "./pages/clientes/servico-contratado/servico-contratado-edit/servico-contratado-edit.component"
import { ServicoContratadoListComponent } from "./pages/clientes/servico-contratado/servico-contratado-list/servico-contratado-list.component"
import { SugestaoEditComponent } from "./pages/clientes/sugestao/sugestao-edit/sugestao-edit.component"
import { SugestaoListComponent } from "./pages/clientes/sugestao/sugestao-list/sugestao-list.component"
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
import { TipoDocumentoEditComponent } from "./pages/digitalizacao/tipo-documento/tipo-documento-edit/tipo-documento-edit.component"
import { TipoDocumentoListComponent } from "./pages/digitalizacao/tipo-documento/tipo-documento-list/tipo-documento-list.component"
import { CampoDocumentoEditComponent } from "./pages/digitalizacao/campo-documento/campo-documento-edit/campo-documento-edit.component"
import { CampoDocumentoListComponent } from "./pages/digitalizacao/campo-documento/campo-documento-list/campo-documento-list.component"
import { DocumentoDigitalEditComponent } from "./pages/digitalizacao/documento-digital/documento-digital-edit/documento-digital-edit.component"
import { DocumentoDigitalListComponent } from "./pages/digitalizacao/documento-digital/documento-digital-list/documento-digital-list.component"
import { DocumentoDigitalCampoEditComponent } from "./pages/digitalizacao/documento-digital-campo/documento-digital-campo-edit/documento-digital-campo-edit.component"
import { DocumentoDigitalCampoListComponent } from "./pages/digitalizacao/documento-digital-campo/documento-digital-campo-list/documento-digital-campo-list.component"
import { QuebraManualEditComponent } from "./pages/digitalizacao/quebra-manual/quebra-manual-edit/quebra-manual-edit.component"
import { QuebraManualListComponent } from "./pages/digitalizacao/quebra-manual/quebra-manual-list/quebra-manual-list.component"
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
import { i18nConfig } from './shared/i18n'

// PO-UI
@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    NoDataComponent,
    FilterModalComponent,
    SavedFilterComponent,
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
    PaisEditComponent,
    PaisListComponent,
    EstadoEditComponent,
    EstadoListComponent,
    CidadeEditComponent,
    CidadeListComponent,
    CepEditComponent,
    CepListComponent,
    TipoAfastamentoEditComponent,
    TipoAfastamentoListComponent,
    ClienteEditComponent,
    ClienteListComponent,
    DepartamentoEditComponent,
    DepartamentoListComponent,
    SolicitanteEditComponent,
    SolicitanteListComponent,
    PontoColetaEditComponent,
    PontoColetaListComponent,
    FrequenciaColetaEditComponent,
    FrequenciaColetaListComponent,
    ServicoContratadoEditComponent,
    ServicoContratadoListComponent,
    SugestaoEditComponent,
    SugestaoListComponent,
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
    TipoDocumentoEditComponent,
    TipoDocumentoListComponent,
    CampoDocumentoEditComponent,
    CampoDocumentoListComponent,
    DocumentoDigitalEditComponent,
    DocumentoDigitalListComponent,
    DocumentoDigitalCampoEditComponent,
    DocumentoDigitalCampoListComponent,
    QuebraManualEditComponent,
    QuebraManualListComponent,
    UnidadeEditComponent,
    UnidadeListComponent,
    PlantaEditComponent,
    PlantaListComponent,
    PosicaoEditComponent,
    PosicaoListComponent,
    DefaultComponent,
    HomeComponent,
    ProfileComponent,
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
    PoModule,
    PoI18nModule.config(i18nConfig)
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
