import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DefaultComponent } from "./_layouts/default/default.component"
import { HomeComponent } from "./pages/authentication/home/home.component"
import { ProfileComponent } from './pages/authentication/profile/profile.component'
import { LoginComponent } from "./pages/authentication/login/login.component"
import { ResetPasswordComponent } from "./pages/authentication/reset-password/reset-password.component"
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
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'block-reasons',
        loadChildren: () => import('./modules/security/block-reasons/block-reasons.module').then(m => m.BlockReasonsModule),
      },
      {
        path: 'user-groups',
        loadChildren: () => import('./modules/security/user-groups/user-groups.module').then(m => m.UserGroupsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/security/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'modules',
        loadChildren: () => import('./modules/security/modules/modules.module').then(m => m.ModulesModule),
      },
      {
        path: 'menu-options',
        loadChildren: () => import('./modules/security/menu-options/menu-options.module').then(m => m.MenuOptionsModule),
      },
      {
        path: 'profiles',
        loadChildren: () => import('./modules/security/profiles/profiles.module').then(m => m.ProfilesModule),
      },
      {
        path: 'profile-options',
        loadChildren: () => import('./modules/security/profile-options/profile-options.module').then(m => m.ProfileOptionsModule),
      },
      {
        path: 'users-profiles',
        loadChildren: () => import('./modules/security/users-profile/users-profile.module').then(m => m.UsersProfileModule),
      },
      {
        path: 'navigations',
        loadChildren: () => import('./modules/security/navigations/navigations.module').then(m => m.NavigationsModule),
      },
      {
        path: 'paises',
        loadChildren: () => import('./modules/comum/pais/pais.module').then(m => m.PaisModule),
      },
      {
        path: 'estados',
        loadChildren: () => import('./modules/comum/estado/estado.module').then(m => m.EstadoModule),
      },
      {
        path: 'cidades',
        loadChildren: () => import('./modules/comum/cidade/cidade.module').then(m => m.CidadeModule),
      },
      {
        path: 'ceps',
        loadChildren: () => import('./modules/comum/cep/cep.module').then(m => m.CepModule),
      },
      {
        path: 'tipos-afastamento',
        loadChildren: () => import('./modules/comum/tipo-afastamento/tipo-afastamento.module').then(m => m.TipoAfastamentoModule),
      },
      {
        path: 'clientes',
        loadChildren: () => import('./modules/clientes/cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'departamentos',
        loadChildren: () => import('./modules/clientes/departamento/departamento.module').then(m => m.DepartamentoModule),
      },
      {
        path: 'solicitantes',
        loadChildren: () => import('./modules/clientes/solicitante/solicitante.module').then(m => m.SolicitanteModule),
      },
      {
        path: 'pontos-coleta',
        loadChildren: () => import('./modules/clientes/ponto-coleta/ponto-coleta.module').then(m => m.PontoColetaModule),
      },
      {
        path: 'frequencia-coletas',
        loadChildren: () => import('./modules/clientes/frequencia-coleta/frequencia-coleta.module').then(m => m.FrequenciaColetaModule),
      },
      {
        path: 'servicos-contratados',
        loadChildren: () => import('./modules/clientes/servico-contratado/servico-contratado.module').then(m => m.ServicoContratadoModule),
      },
      {
        path: 'sugestoes',
        loadChildren: () => import('./modules/clientes/sugestao/sugestao.module').then(m => m.SugestaoModule),
      },
      {
        path: 'funcoes',
        loadChildren: () => import('./modules/pessoas/funcao/funcao.module').then(m => m.FuncaoModule),
      },
      {
        path: 'pessoas',
        loadChildren: () => import('./modules/pessoas/pessoa/pessoa.module').then(m => m.PessoaModule),
      },
      {
        path: 'jornadas',
        loadChildren: () => import('./modules/pessoas/jornada/jornada.module').then(m => m.JornadaModule),
      },
      {
        path: 'escalas',
        loadChildren: () => import('./modules/pessoas/escala/escala.module').then(m => m.EscalaModule),
      },
      {
        path: 'afastamentos',
        loadChildren: () => import('./modules/pessoas/afastamento/afastamento.module').then(m => m.AfastamentoModule),
      },
      {
        path: 'veiculos',
        loadChildren: () => import('./modules/coleta/veiculo/veiculo.module').then(m => m.VeiculoModule),
      },
      {
        path: 'entregadores',
        loadChildren: () => import('./modules/coleta/entregador/entregador.module').then(m => m.EntregadorModule),
      },
      {
        path: 'coletas',
        loadChildren: () => import('./modules/coleta/coleta/coleta.module').then(m => m.ColetaModule),
      },
      {
        path: 'times-coleta',
        loadChildren: () => import('./modules/coleta/time-coleta/time-coleta.module').then(m => m.TimeColetaModule),
      },
      {
        path: 'volumes',
        loadChildren: () => import('./modules/coleta/volume/volume.module').then(m => m.VolumeModule),
      },
      {
        path: 'rastreamento-volumes',
        loadChildren: () => import('./modules/coleta/rastreamento-volume/rastreamento-volume.module').then(m => m.RastreamentoVolumeModule),
      },
      {
        path: 'tipos-documento',
        loadChildren: () => import('./modules/digitalizacao/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule),
      },
      {
        path: 'campos-documento',
        loadChildren: () => import('./modules/digitalizacao/campo-documento/campo-documento.module').then(m => m.CampoDocumentoModule),
      },
      {
        path: 'caixas-quebras',
        loadChildren: () => import('./modules/digitalizacao/caixa-quebra/caixa-quebra.module').then(m => m.CaixaQuebraModule),
      },
      {
        path: 'documentos-digitais',
        loadChildren: () => import('./modules/digitalizacao/documento-digital/documento-digital.module').then(m => m.DocumentoDigitalModule),
      },
      {
        path: 'documentos-digitais-campos',
        loadChildren: () => import('./modules/digitalizacao/documento-digital-campo/documento-digital-campo.module').then(m => m.DocumentoDigitalCampoModule),
      },
      {
        path: 'ajuste-manual',
        loadChildren: () => import('./modules/digitalizacao/ajuste-manual/ajuste-manual.module').then(m => m.AjusteManualModule),
      },
      {
        path: 'definicao-extracao',
        loadChildren: () => import('./modules/digitalizacao/definicao-extracao/definicao-extracao.module').then(m => m.DefinicaoExtracaoModule),
      },
      {
        path: 'unidades',
        loadChildren: () => import('./modules/armazenamento/unidade/unidade.module').then(m => m.UnidadeModule),
      },
      {
        path: 'plantas',
        loadChildren: () => import('./modules/armazenamento/planta/planta.module').then(m => m.PlantaModule),
      },
      {
        path: 'posicoes',
        loadChildren: () => import('./modules/armazenamento/posicao/posicao.module').then(m => m.PosicaoModule),
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
