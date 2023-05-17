import { paisesFields } from './fields/es/comum/paises'
import { estadosFields } from './fields/es/comum/estados'
import { cidadesFields } from './fields/es/comum/cidades'
import { cepsFields } from './fields/es/comum/ceps'
import { tiposAfastamentoFields } from './fields/es/comum/tipos-afastamento'
import { clientesFields } from './fields/es/clientes/clientes'
import { departamentosFields } from './fields/es/clientes/departamentos'
import { solicitantesFields } from './fields/es/clientes/solicitantes'
import { pontosColetaFields } from './fields/es/clientes/pontos-coleta'
import { frequenciaColetasFields } from './fields/es/clientes/frequencia-coletas'
import { servicosContratadosFields } from './fields/es/clientes/servicos-contratados'
import { sugestoesFields } from './fields/es/clientes/sugestoes'
import { funcoesFields } from './fields/es/pessoas/funcoes'
import { pessoasFields } from './fields/es/pessoas/pessoas'
import { jornadasFields } from './fields/es/pessoas/jornadas'
import { escalasFields } from './fields/es/pessoas/escalas'
import { afastamentosFields } from './fields/es/pessoas/afastamentos'
import { veiculosFields } from './fields/es/coleta/veiculos'
import { entregadoresFields } from './fields/es/coleta/entregadores'
import { coletasFields } from './fields/es/coleta/coletas'
import { timesColetaFields } from './fields/es/coleta/times-coleta'
import { volumesFields } from './fields/es/coleta/volumes'
import { rastreamentoVolumesFields } from './fields/es/coleta/rastreamento-volumes'
import { tiposDocumentoFields } from './fields/es/digitalizacao/tipos-documento'
import { camposDocumentoFields } from './fields/es/digitalizacao/campos-documento'
import { documentosDigitaisFields } from './fields/es/digitalizacao/documentos-digitais'
import { documentosDigitaisCamposFields } from './fields/es/digitalizacao/documentos-digitais-campos'
import { unidadesFields } from './fields/es/armazenamento/unidades'
import { plantasFields } from './fields/es/armazenamento/plantas'
import { posicoesFields } from './fields/es/armazenamento/posicoes'

export const generalEs = {
  list: {
    new: "Nuevo",
    edit: "Editar",
    copy: "Copiar",
    view: "Visualizar",
    delete: "Borrar",
    refresh: "Actualizar",
    search: "Buscar",
    otherActions: "Otras acciones",
    loadingData: "Cargando datos",
    noData: "Sin datos",
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
    save: "Save",
    saveAndNew: "Save and new",
    cancel: "Cancel",
    return: "Volver",
    saveSuccess: "Registro guardado con éxito!",
    formError: "Campos incorrectos."
  },
  menu: {
    home: 'Home',
    profile: 'Perfil',
    signOut: 'Salir',
    'Segurança': 'Seguridad',
    'Motivos de Bloqueio': 'Razones de Bloqueo',
    'Grupos de Usuários': 'Grupo de Usuario',
    'Usuários': 'Usuarios',
    'Módulos': 'Módulos',
    'Opções de Menu': 'Opciones de Menú',
    'Perfis': 'Perfiles',
    'Usuários x Perfis': 'Usuarios x Perfiles',
    'Navegação': 'Navegación',
  },
  security_blockReason: {
    title: 'Razones de Bloqueo',
    fields: {
      id: '',
      code: 'Código',
      description: 'Descripción',
      instructionsToSolve: 'Instrucciones de Solución',
      isSolvedByPasswordReset: 'Soluciona restableciendo la contraseña',
      disabled: 'Desactivado'
    }
  },
  security_userGroup: {
    title: 'Grupos de Usuario',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_user: {
    title: 'Usuarios',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      userGroupId: 'Grupo de Usuario',
      name: 'Nombre',
      login: 'E-Mail',
      password: 'Contraseña',
      disabled: 'Inactivo',
      mustChangePasswordNextLogon: 'Debe cambiar la contraseña el próximo inicio de sesión',
      mustActiveTwoFactorAuthentication: 'Debe activar la autenticación de dos factores',
      isBlocked: 'Bloqueado',
      blockReasonId: 'Motivo de bloqueo',
      disableTwoFactorAuthentication: 'Deshabilitar la autenticación de dos factores',
      isAdmin: 'Admin',
      isSuperUser: 'Super Usuario',
      general: 'General',
      security: 'Seguridad',
      twoFactorAuthentication: 'Autenticación de Dos Factores',
      properties: 'Propiedades'
    }
  },
  security_module: {
    title: 'Módulos',
    fields: {
      id: '',
      name: 'Nombre',
      disabled: 'Desactivado'
    }
  },
  security_menuOption: {
    title: 'Opciones de Menú',
    fields: {
      id: '',
      moduleName: 'Módulo',
      moduleId: 'Módulo',
      sequence: 'Secuencia',
      label: 'Etiqueta',
      route: 'Ruta',
      icon: 'Icono',
      key: 'Key',
      disabled: 'Desactivado'
    }
  },
  security_profile: {
    title: 'Perfiles',
    fields: {
      id: '',
      userGroupName: 'Grupo de Usuario',
      name: 'Nombre',
      disabled: 'Desactivado',
      module: 'Módulo',
      menuOption: 'Opción de Menú',
      all: 'Todo',
      create: 'Crear',
      view: 'Vista',
      update: 'Actualizar',
      remove: 'Eliminar',
    }
  },
  security_userProfile: {
    title: 'Usuario x Perfil',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      profileName: 'Perfil',
      profileId: 'Perfil',
    }
  },
  security_navigation: {
    title: 'Navegación',
    fields: {
      id: '',
      userName: 'Usuario',
      userId: 'Usuario',
      navigationDate: 'Fecha',
      route: 'Ruta',
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
