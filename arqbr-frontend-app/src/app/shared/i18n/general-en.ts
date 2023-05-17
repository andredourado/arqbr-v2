import { paisesFields } from './fields/en/comum/paises'
import { estadosFields } from './fields/en/comum/estados'
import { cidadesFields } from './fields/en/comum/cidades'
import { cepsFields } from './fields/en/comum/ceps'
import { tiposAfastamentoFields } from './fields/en/comum/tipos-afastamento'
import { clientesFields } from './fields/en/clientes/clientes'
import { departamentosFields } from './fields/en/clientes/departamentos'
import { solicitantesFields } from './fields/en/clientes/solicitantes'
import { pontosColetaFields } from './fields/en/clientes/pontos-coleta'
import { frequenciaColetasFields } from './fields/en/clientes/frequencia-coletas'
import { servicosContratadosFields } from './fields/en/clientes/servicos-contratados'
import { sugestoesFields } from './fields/en/clientes/sugestoes'
import { funcoesFields } from './fields/en/pessoas/funcoes'
import { pessoasFields } from './fields/en/pessoas/pessoas'
import { jornadasFields } from './fields/en/pessoas/jornadas'
import { escalasFields } from './fields/en/pessoas/escalas'
import { afastamentosFields } from './fields/en/pessoas/afastamentos'
import { veiculosFields } from './fields/en/coleta/veiculos'
import { entregadoresFields } from './fields/en/coleta/entregadores'
import { coletasFields } from './fields/en/coleta/coletas'
import { timesColetaFields } from './fields/en/coleta/times-coleta'
import { volumesFields } from './fields/en/coleta/volumes'
import { rastreamentoVolumesFields } from './fields/en/coleta/rastreamento-volumes'
import { tiposDocumentoFields } from './fields/en/digitalizacao/tipos-documento'
import { camposDocumentoFields } from './fields/en/digitalizacao/campos-documento'
import { documentosDigitaisFields } from './fields/en/digitalizacao/documentos-digitais'
import { documentosDigitaisCamposFields } from './fields/en/digitalizacao/documentos-digitais-campos'
import { unidadesFields } from './fields/en/armazenamento/unidades'
import { plantasFields } from './fields/en/armazenamento/plantas'
import { posicoesFields } from './fields/en/armazenamento/posicoes'

export const generalEn = {
  list: {
    new: "New",
    edit: "Edit",
    copy: "Copy",
    view: "View",
    delete: "Delete",
    refresh: "Refresh",
    search: "Search",
    otherActions: "Other actions",
    loadingData: "Loading data",
    noData: "No data",
    confirmExcludeTitle: "Confirm exclude",
    confirmExcludeMessage: "Are you sure that you want to exclude this item? You can't undo this action.",
    confirmMultiExcludeTitle: "Confirm multi item delete",
    confirmMultiExcludeMessage: "Are you sure that you want to exclude these items? You can't undo this action.",
    excludeSuccess: "Item excluded with success.",
    multiExcludeSuccess: "Items excluded with success!",
    advancedFilterApplied: "Customized filter",
    filterCloseModal: "Close",
    filterApplyModal: "Apply Filter",
    filterField: "Field",
    filterOperator: "Operator",
    filterValue: "Value",
    filterOr: "OR",
    filterAnd: "AND",
    filterClear: "Clear",
    filterAdd: "Add",
    filterExpression: "Expression",
    filterSavedFilters: "Saved Filters",
    filterExcludeSavedFilter: "Delete",
    filterSaveFilterName: "Name",
    filterSaveNew: "Save new",
    filterApply: "Apply"
  },
  edit: {
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Return",
    saveSuccess: "Register saved successfully!",
    formError: "Form incorrect."
  },
  menu: {
    home: 'Home',
    profile: 'Profile',
    signOut: 'Sign out',
    'Segurança': 'Security',
    'Motivos de Bloqueio': 'Block Reasons',
    'Grupos de Usuários': 'Users Group',
    'Usuários': 'Users',
    'Módulos': 'Modules',
    'Opções de Menu': 'Menu Options',
    'Perfis': 'Profiles',
    'Usuários x Perfis': 'Users x Profiles',
    'Navegação': 'Navigation',
  },
  security_blockReason: {
    title: 'Block Reasons',
    fields: {
      id: '',
      code: 'Code',
      description: 'Description',
      instructionsToSolve: 'Instructions to Solve',
      isSolvedByPasswordReset: 'Is solved by password reset',
      disabled: 'Disabled'
    }
  },
  security_userGroup: {
    title: 'User Groups',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_user: {
    title: 'Users',
    fields: {
      id: '',
      userGroupName: 'User Group',
      userGroupId: 'User Group',
      name: 'Name',
      login: 'E-Mail',
      password: 'Password',
      disabled: 'Disabled',
      mustChangePasswordNextLogon: 'Must change password next logon',
      mustActiveTwoFactorAuthentication: 'Must active two factor authentication',
      isBlocked: 'Blocked',
      blockReasonId: 'Blocked Reason',
      disableTwoFactorAuthentication: 'Disable Two Factor Authentication',
      isAdmin: 'Admin',
      isSuperUser: 'Super User',
      general: 'General',
      security: 'Security',
      twoFactorAuthentication: 'Two Factor Authentication',
      properties: 'Properties'
    }
  },
  security_module: {
    title: 'Modules',
    fields: {
      id: '',
      name: 'Name',
      disabled: 'Disabled'
    }
  },
  security_menuOption: {
    title: 'Menu Options',
    fields: {
      id: '',
      moduleName: 'Module',
      moduleId: 'Module',
      sequence: 'Sequence',
      label: 'Label',
      route: 'Route',
      icon: 'Icon',
      key: 'Key',
      disabled: 'Disabled'
    }
  },
  security_profile: {
    title: 'Profiles',
    fields: {
      id: '',
      userGroupName: 'User Group',
      name: 'Name',
      disabled: 'Disabled',
      module: 'Module',
      menuOption: 'Menu Option',
      all: 'All',
      create: 'Create',
      view: 'View',
      update: 'Update',
      remove: 'Delete',
    }
  },
  security_userProfile: {
    title: 'User x Profile',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      profileName: 'Profile',
      profileId: 'Profile',
    }
  },
  security_navigation: {
    title: 'Navigation',
    fields: {
      id: '',
      userName: 'User',
      userId: 'User',
      navigationDate: 'Date',
      route: 'Route',
    }
  },
  comum_pais: {
    title: 'Países',
    fields: paisesFields
  },
  comum_estado: {
    title: 'Estados',
    fields: estadosFields
  },
  comum_cidade: {
    title: 'Cidades',
    fields: cidadesFields
  },
  comum_cep: {
    title: 'CEPs',
    fields: cepsFields
  },
  comum_tipoAfastamento: {
    title: 'Tipos de Afastamento',
    fields: tiposAfastamentoFields
  },
  clientes_cliente: {
    title: 'Clientes',
    fields: clientesFields
  },
  clientes_departamento: {
    title: 'Centros de Custo',
    fields: departamentosFields
  },
  clientes_solicitante: {
    title: 'Solicitantes',
    fields: solicitantesFields
  },
  clientes_pontoColeta: {
    title: 'Pontos de Coleta',
    fields: pontosColetaFields
  },
  clientes_frequenciaColeta: {
    title: 'Frequencia de Coletas',
    fields: frequenciaColetasFields
  },
  clientes_servicoContratado: {
    title: 'Serviços Contratados',
    fields: servicosContratadosFields
  },
  clientes_sugestao: {
    title: 'Sugestões',
    fields: sugestoesFields
  },
  pessoas_funcao: {
    title: 'Funções',
    fields: funcoesFields
  },
  pessoas_pessoa: {
    title: 'Pessoas',
    fields: pessoasFields
  },
  pessoas_jornada: {
    title: 'Jornadas',
    fields: jornadasFields
  },
  pessoas_escala: {
    title: 'Escalas',
    fields: escalasFields
  },
  pessoas_afastamento: {
    title: 'Afastamentos',
    fields: afastamentosFields
  },
  coleta_veiculo: {
    title: 'Veículos',
    fields: veiculosFields
  },
  coleta_entregador: {
    title: 'Entregadores',
    fields: entregadoresFields
  },
  coleta_coleta: {
    title: 'Coletas',
    fields: coletasFields
  },
  coleta_timeColeta: {
    title: 'Times de Coleta',
    fields: timesColetaFields
  },
  coleta_volume: {
    title: 'Volumes',
    fields: volumesFields
  },
  coleta_rastreamentoVolume: {
    title: 'Rastreamento de Volumes',
    fields: rastreamentoVolumesFields
  },
  digitalizacao_tipoDocumento: {
    title: 'Tipos de Documentos',
    fields: tiposDocumentoFields
  },
  digitalizacao_campoDocumento: {
    title: 'Campos de Documento',
    fields: camposDocumentoFields
  },
  digitalizacao_documentoDigital: {
    title: 'Documentos Digitais',
    fields: documentosDigitaisFields
  },
  digitalizacao_documentoDigitalCampo: {
    title: 'Campos dos Documentos Digitais',
    fields: documentosDigitaisCamposFields
  },
  armazenamento_unidade: {
    title: 'Unidades',
    fields: unidadesFields
  },
  armazenamento_planta: {
    title: 'Plantas',
    fields: plantasFields
  },
  armazenamento_posicao: {
    title: 'Posições',
    fields: posicoesFields
  },
}
