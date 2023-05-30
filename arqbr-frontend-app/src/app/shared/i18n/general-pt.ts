import { paisesFields } from './fields/pt/comum/paises'
import { estadosFields } from './fields/pt/comum/estados'
import { cidadesFields } from './fields/pt/comum/cidades'
import { cepsFields } from './fields/pt/comum/ceps'
import { tiposAfastamentoFields } from './fields/pt/comum/tipos-afastamento'
import { clientesFields } from './fields/pt/clientes/clientes'
import { departamentosFields } from './fields/pt/clientes/departamentos'
import { solicitantesFields } from './fields/pt/clientes/solicitantes'
import { pontosColetaFields } from './fields/pt/clientes/pontos-coleta'
import { frequenciaColetasFields } from './fields/pt/clientes/frequencia-coletas'
import { servicosContratadosFields } from './fields/pt/clientes/servicos-contratados'
import { sugestoesFields } from './fields/pt/clientes/sugestoes'
import { funcoesFields } from './fields/pt/pessoas/funcoes'
import { pessoasFields } from './fields/pt/pessoas/pessoas'
import { jornadasFields } from './fields/pt/pessoas/jornadas'
import { escalasFields } from './fields/pt/pessoas/escalas'
import { afastamentosFields } from './fields/pt/pessoas/afastamentos'
import { veiculosFields } from './fields/pt/coleta/veiculos'
import { entregadoresFields } from './fields/pt/coleta/entregadores'
import { coletasFields } from './fields/pt/coleta/coletas'
import { timesColetaFields } from './fields/pt/coleta/times-coleta'
import { volumesFields } from './fields/pt/coleta/volumes'
import { rastreamentoVolumesFields } from './fields/pt/coleta/rastreamento-volumes'
import { tiposDocumentoFields } from './fields/pt/digitalizacao/tipos-documento'
import { camposDocumentoFields } from './fields/pt/digitalizacao/campos-documento'
import { caixasQuebrasFields } from './fields/pt/digitalizacao/caixas-quebras'
import { documentosDigitaisFields } from './fields/pt/digitalizacao/documentos-digitais'
import { documentosDigitaisCamposFields } from './fields/pt/digitalizacao/documentos-digitais-campos'
import { quebraManualFields } from './fields/pt/digitalizacao/quebra-manual'
import { ajusteManualFields } from './fields/pt/digitalizacao/ajuste-manual'
import { definicaoExtracaoFields } from './fields/pt/digitalizacao/definicao-extracao'
import { unidadesFields } from './fields/pt/armazenamento/unidades'
import { plantasFields } from './fields/pt/armazenamento/plantas'
import { posicoesFields } from './fields/pt/armazenamento/posicoes'

export const generalPt = {
  list: {
    new: "Novo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Excluir",
    refresh: "Atualizar",
    search: "Pesquisar",
    otherActions: "Outras ações",
    loadingData: "Carregando dados",
    noData: "Sem dados",
    confirmExcludeTitle: "Confirmar exclusão",
    confirmExcludeMessage: "Tem certeza de que deseja excluir esse registro? Você não poderá desfazer essa ação.",
    confirmMultiExcludeTitle: "Confirmar exclusão em lote",
    confirmMultiExcludeMessage: "Tem certeza de que deseja excluir todos esses registros? Você não poderá desfazer essa ação.",
    excludeSuccess: "Item excluído com sucesso.",
    multiExcludeSuccess: "Itens excluídos com sucesso.",
    advancedFilterApplied: "Filtro customizado",
    filterCloseModal: "Fechar",
    filterApplyModal: "Filtrar",
    filterField: "Campo",
    filterOperator: "Operador",
    filterValue: "Valor",
    filterOr: "OU",
    filterAnd: "E",
    filterClear: "Limpar",
    filterAdd: "Adicionar",
    filterExpression: "Expressão",
    filterSavedFilters: "Filtros Salvos",
    filterExcludeSavedFilter: "Excluir",
    filterSaveFilterName: "Nome",
    filterSaveNew: "Salvar novo",
    filterApply: "Aplicar"
  },
  edit: {
    save: "Salvar",
    saveAndNew: "Salvar e novo",
    cancel: "Cancelar",
    return: "Voltar",
    saveSuccess: "Registro salvo com sucesso!",
    formError: "Formulário precisa ser preenchido corretamente."
  },
  menu: {
    home: 'Início',
    profile: 'Perfil',
    signOut: 'Sair',
    'Segurança': 'Segurança',
    'Motivos de Bloqueio': 'Motivos de Bloqueio',
    'Grupos de Usuários': 'Grupos de Usuários',
    'Usuários': 'Usuários',
    'Módulos': 'Módulos',
    'Opções de Menu': 'Opções de Menu',
    'Perfis': 'Perfis',
    'Usuários x Perfis': 'Usuários x Perfis',
    'Navegação': 'Navegação',
  },
  security_blockReason: {
    title: 'Motivos de Bloqueio',
    fields: {
      id: '',
      code: 'Código',
      description: 'Descrição',
      instructionsToSolve: 'Instruções de Solução',
      isSolvedByPasswordReset: 'Resolve com reset de senha',
      disabled: 'Inativo'
    }
  },
  security_userGroup: {
    title: 'Grupos de Usuário',
    fields: {
      id: '',
      name: 'Nome',
      disabled: 'Inativo'
    }
  },
  security_user: {
    title: 'Usuários',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuário',
      userGroupId: 'Grupo de Usuário',
      name: 'Nome',
      login: 'E-Mail',
      password: 'Senha',
      disabled: 'Inativo',
      mustChangePasswordNextLogon: 'Deve trocar a senha no próximo logon',
      mustActiveTwoFactorAuthentication: 'Deve ativar a autenticação de dois fatores',
      isBlocked: 'Bloqueado',
      blockReasonId: 'Motivo de bloqueio',
      disableTwoFactorAuthentication: 'Desabilitar a autenticação de dois fatores',
      isAdmin: 'Admin',
      isSuperUser: 'Super Usuário',
      general: 'Geral',
      security: 'Segurança',
      twoFactorAuthentication: 'Autenticação de Dois Fatores',
      properties: 'Propiedades'
    }
  },
  security_module: {
    title: 'Módulos',
    fields: {
      id: '',
      name: 'Nome',
      disabled: 'Inativo'
    }
  },
  security_menuOption: {
    title: 'Opções de Menu',
    fields: {
      id: '',
      moduleName: 'Módulo',
      moduleId: 'Módulo',
      sequence: 'Sequência',
      label: 'Título',
      route: 'Rota',
      icon: 'Ícone',
      key: 'Key',
      disabled: 'Desativado'
    }
  },
  security_profile: {
    title: 'Perfis',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuário',
      name: 'Nome',
      disabled: 'Inativo',
      module: 'Módulo',
      menuOption: 'Opção de Menu',
      all: 'Todos',
      create: 'Incluir',
      view: 'Visualizar',
      update: 'Editar',
      remove: 'Deletar',
    }
  },
  security_userProfile: {
    title: 'Usuário x Perfil',
    fields: {
      id: '',
      userName: 'Usuário',
      userId: 'Usuário',
      profileName: 'Perfil',
      profileId: 'Perfil',
    }
  },
  security_navigation: {
    title: 'Navegação',
    fields: {
      id: '',
      userName: 'Usuário',
      userId: 'Usuário',
      navigationDate: 'Data',
      route: 'Rota',
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
  digitalizacao_caixaQuebra: {
    title: 'Quebras de Caixas',
    fields: caixasQuebrasFields
  },
  digitalizacao_documentoDigital: {
    title: 'Documentos Digitais',
    fields: documentosDigitaisFields
  },
  digitalizacao_documentoDigitalCampo: {
    title: 'Campos dos Documentos Digitais',
    fields: documentosDigitaisCamposFields
  },
  digitalizacao_quebraManual: {
    title: 'Quebra Manual',
    fields: quebraManualFields
  },
  digitalizacao_ajusteManual: {
    title: 'Ajuste Manual',
    fields: ajusteManualFields
  },
  digitalizacao_definicaoExtracao: {
    title: 'Definição de Extrações',
    fields: definicaoExtracaoFields
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
