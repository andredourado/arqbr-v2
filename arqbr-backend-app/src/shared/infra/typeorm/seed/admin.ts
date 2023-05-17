import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'arqbr', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash(btoa('admin'), 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      login, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@arquivobras.com.br', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

  await connection.query(
    `INSERT INTO modules (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('3cae705f-0f15-43bc-ad08-98cec3b80e15', 'Tabelas', 'now()', 'now()'),
			('f7c2f176-dbed-4b90-96d7-d64319681b9d', 'Clientes', 'now()', 'now()'),
			('f4897039-3406-4fcf-bbe4-54bec48c563c', 'Pessoas', 'now()', 'now()'),
			('b6073e8d-69c4-45c6-9a9b-61953efbe183', 'Coleta', 'now()', 'now()'),
			('ec08f560-2a33-4e6d-b1b2-150cc0debb81', 'Digitalização', 'now()', 'now()'),
			('fa64c20d-e396-4b65-8ded-7d9cb61aedf0', 'Armazenamento', 'now()', 'now()')`
  )


  // menu options

  await connection.query(
    `INSERT INTO menu_options (
      id,
      module_id,
      sequence,
      label,
      route,
      icon,
      key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'fa-solid fa-lock', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('72ef36dd-7a84-4769-86c7-3a232a73fadd', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002', 'Tabelas', '', 'fa-solid fa-table-list', 'comum', 'now()', 'now()'),
			('ebf21a7b-ac7d-4fc3-97df-d7f18eafd583', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002001', 'Países', '/paises', 'List', 'comum-paises', 'now()', 'now()'),
			('cce7cd94-0780-4381-aca6-210a5b46d884', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002002', 'Estados', '/estados', 'List', 'comum-estados', 'now()', 'now()'),
			('dc118920-569d-484f-9064-9c4ebd6f1213', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002003', 'Cidades', '/cidades', 'List', 'comum-cidades', 'now()', 'now()'),
			('31ce4e23-8663-490a-934b-004725b3318b', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002004', 'CEPs', '/ceps', 'List', 'comum-ceps', 'now()', 'now()'),
			('5583c2c5-4d5f-4adb-9c34-21a187548c5f', '3cae705f-0f15-43bc-ad08-98cec3b80e15', '002006', 'Tipos de Afastamento', '/tipos-afastamento', 'List', 'comum-tipos-afastamento', 'now()', 'now()'),
			('250ba8e5-0350-437e-ab16-7851663039f0', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003', 'Clientes', '', 'fa-solid fa-people-roof', 'clientes', 'now()', 'now()'),
			('53eaef31-385e-437a-915c-6b459b56d4d6', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003001', 'Clientes', '/clientes', 'List', 'clientes-clientes', 'now()', 'now()'),
			('9439a3b3-f896-40e5-8929-9b5636d1ec78', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003002', 'Centros de Custo', '/departamentos', 'List', 'clientes-departamentos', 'now()', 'now()'),
			('423c3383-b313-4dae-ad9d-c75914d0e344', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003003', 'Solicitantes', '/solicitantes', 'List', 'clientes-solicitantes', 'now()', 'now()'),
			('f6bb748b-6d39-4bbf-8936-4f740e513567', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003004', 'Pontos de Coleta', '/pontos-coleta', 'List', 'clientes-pontos-coleta', 'now()', 'now()'),
			('3bec44d9-16d4-47e0-94a1-ac2bee479a65', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003005', 'Frequencia de Coletas', '/frequencia-coletas', 'List', 'clientes-frequencia-coletas', 'now()', 'now()'),
			('8c742336-a0c0-4aa8-8115-b27fc28929fb', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003006', 'Serviços Contratados', '/servicos-contratados', 'List', 'clientes-servicos-contratados', 'now()', 'now()'),
			('b68e0ff1-dc2a-4909-b9d9-86ce1a9b06f5', 'f7c2f176-dbed-4b90-96d7-d64319681b9d', '003007', 'Sugestões', '/sugestoes', 'List', 'clientes-sugestoes', 'now()', 'now()'),
			('ffb7c7c6-65d7-4f4a-ac5e-3680650471b0', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004', 'Pessoas', '', 'fa-solid fa-users', 'pessoas', 'now()', 'now()'),
			('a4f43a39-b6e6-4df3-bc36-646148abc103', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004001', 'Funções', '/funcoes', 'List', 'pessoas-funcoes', 'now()', 'now()'),
			('50eeeeac-db6a-4f23-8698-9933cc76ad57', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004002', 'Pessoas', '/pessoas', 'List', 'pessoas-pessoas', 'now()', 'now()'),
			('538dc753-f3cd-4838-8571-dfb5eb958f1d', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004003', 'Jornadas', '/jornadas', 'List', 'pessoas-jornadas', 'now()', 'now()'),
			('16595b3f-94b9-432e-b849-23496f6d7fa4', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004004', 'Escalas', '/escalas', 'List', 'pessoas-escalas', 'now()', 'now()'),
			('18ec8c75-8a96-4150-9d10-4c5a3c02fa07', 'f4897039-3406-4fcf-bbe4-54bec48c563c', '004005', 'Afastamentos', '/afastamentos', 'List', 'pessoas-afastamentos', 'now()', 'now()'),
			('6fb1a6cf-35cf-4340-ad4a-e1f585292342', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005', 'Coleta', '', 'fa-solid fa-truck', 'coleta', 'now()', 'now()'),
			('83bff4bd-105d-4e2f-8e72-d040b0d028f8', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005001', 'Veículos', '/veiculos', 'List', 'coleta-veiculos', 'now()', 'now()'),
			('c25ac0c0-e3c6-47e6-820b-9b90431fb7f6', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005002', 'Entregadores', '/entregadores', 'List', 'coleta-entregadores', 'now()', 'now()'),
			('5fee4df3-02f4-4355-a809-19f3221bdab4', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005003', 'Coletas', '/coletas', 'List', 'coleta-coletas', 'now()', 'now()'),
			('3bb6cdac-ce62-41bc-a421-750f9d17b351', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005004', 'Times de Coleta', '/times-coleta', 'List', 'coleta-times-coleta', 'now()', 'now()'),
			('92f014c5-7d47-4717-9c59-2f5634f7609d', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005005', 'Volumes', '/volumes', 'List', 'coleta-volumes', 'now()', 'now()'),
			('fc1562b2-fd7a-4392-a029-5e3007d72c61', 'b6073e8d-69c4-45c6-9a9b-61953efbe183', '005006', 'Rastreamento de Volumes', '/rastreamento-volumes', '', 'coleta-rastreamento-volumes', 'now()', 'now()'),
			('4477ac70-a991-48e6-b978-c445f5aa3663', 'ec08f560-2a33-4e6d-b1b2-150cc0debb81', '006', 'Digitalização', '', 'fa-solid fa-print', 'digitalizacao', 'now()', 'now()'),
			('a6592da2-1098-41df-abeb-73573e6c9b72', 'ec08f560-2a33-4e6d-b1b2-150cc0debb81', '006001', 'Tipos de Documentos', '/tipos-documento', 'List', 'digitalizacao-tipos-documento', 'now()', 'now()'),
			('00a1c2f7-f434-463a-9127-42376cb93825', 'ec08f560-2a33-4e6d-b1b2-150cc0debb81', '006002', 'Campos de Documento', '/campos-documento', 'List', 'digitalizacao-campos-documento', 'now()', 'now()'),
			('1b60b300-a9a0-4de8-8b6a-80154b66a87d', 'ec08f560-2a33-4e6d-b1b2-150cc0debb81', '006003', 'Documentos Digitais', '/documentos-digitais', 'List', 'digitalizacao-documentos-digitais', 'now()', 'now()'),
			('03282893-7f7f-47f7-a384-2c01999bc5ac', 'ec08f560-2a33-4e6d-b1b2-150cc0debb81', '006004', 'Campos dos Documentos Digitais', '/documentos-digitais-campos', 'List', 'digitalizacao-documentos-digitais-campos', 'now()', 'now()'),
			('1c0b515f-7f6e-45f1-968d-0c95aec53bbc', 'fa64c20d-e396-4b65-8ded-7d9cb61aedf0', '007', 'Armazenamento', '', 'fa-solid fa-boxes-stacked', 'armazenamento', 'now()', 'now()'),
			('97eaf028-954b-4218-bdfb-7e055c118c01', 'fa64c20d-e396-4b65-8ded-7d9cb61aedf0', '007001', 'Unidades', '/unidades', 'List', 'armazenamento-unidades', 'now()', 'now()'),
			('b2ab933b-5152-4fe7-aad0-dbb7f06dfd13', 'fa64c20d-e396-4b65-8ded-7d9cb61aedf0', '007002', 'Plantas', '/plantas', 'List', 'armazenamento-plantas', 'now()', 'now()'),
			('f3251b91-c870-485b-9be5-0c47ded324aa', 'fa64c20d-e396-4b65-8ded-7d9cb61aedf0', '007003', 'Posições', '/posicoes', 'List', 'armazenamento-posicoes', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('336af714-8eba-41a9-b9e9-4415e2417081', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum', true, 'now()', 'now()'),
			('59730b6e-40cd-4500-a17e-089f413ca70e', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-paises', true, 'now()', 'now()'),
			('09d9cc5d-ee68-4958-8e1e-273ea5fe930e', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-estados', true, 'now()', 'now()'),
			('e1347f80-3b2c-4af8-ab08-d310d3fec7d2', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-cidades', true, 'now()', 'now()'),
			('b63fe899-2fb9-4e9b-a600-d8be165bd547', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-ceps', true, 'now()', 'now()'),
			('10b1304e-17eb-4ec9-9dd1-28f7718c05a9', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-tipos-afastamento', true, 'now()', 'now()'),
			('0cacf512-885d-497c-9474-7ea68b3fac5f', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes', true, 'now()', 'now()'),
			('99ee002b-05da-457e-919f-d4baecae8aa3', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-clientes', true, 'now()', 'now()'),
			('67e40716-ad77-4e77-a5b5-326958d5c387', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-departamentos', true, 'now()', 'now()'),
			('32a8552a-610a-41a9-b588-a3ff8ed735cb', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-solicitantes', true, 'now()', 'now()'),
			('53c6f7ab-c010-4f24-bd02-e7250e5d2134', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-pontos-coleta', true, 'now()', 'now()'),
			('bcc60a9e-615e-455d-a753-581294ca2437', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-frequencia-coletas', true, 'now()', 'now()'),
			('e1c8bfdd-cb10-4f12-9e9e-eb77b3639054', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-servicos-contratados', true, 'now()', 'now()'),
			('314a9195-94f0-42c3-a1b7-d892f096d6e3', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-sugestoes', true, 'now()', 'now()'),
			('f7f6fcfd-077d-4451-9913-765e7bedb6b1', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas', true, 'now()', 'now()'),
			('eba02dc5-0288-4a92-a3c4-2e43c87e65da', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-funcoes', true, 'now()', 'now()'),
			('aefae8b1-9be2-44c2-98d6-ae95a6eee030', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-pessoas', true, 'now()', 'now()'),
			('43af41d3-5d25-4652-8d1c-61829ee22078', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-jornadas', true, 'now()', 'now()'),
			('eb5d288f-5994-4793-aff2-cfcf261f89b0', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-escalas', true, 'now()', 'now()'),
			('df714904-ca92-4b79-8980-21e44b12be2f', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-afastamentos', true, 'now()', 'now()'),
			('dbad59f6-20af-4ca7-8c74-c3c2b0f27801', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta', true, 'now()', 'now()'),
			('1d79a42b-b16f-4432-b069-317ce4c62afe', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-veiculos', true, 'now()', 'now()'),
			('c568dd67-3dfd-4794-bbc0-45e37a193fa6', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-entregadores', true, 'now()', 'now()'),
			('c649e81d-60e0-4d88-bfb8-e3145fa7e6ab', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-coletas', true, 'now()', 'now()'),
			('04238f05-4f37-4020-8e4d-a9642afe633c', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-times-coleta', true, 'now()', 'now()'),
			('27c405f5-b6f3-4b8f-9ee0-9d1edd1fcd28', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-volumes', true, 'now()', 'now()'),
			('b7b94580-16b5-4a7c-b6eb-e39d4db4494e', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-rastreamento-volumes', true, 'now()', 'now()'),
			('ea8737fa-6779-4fae-a01f-bdb6e96fce1d', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao', true, 'now()', 'now()'),
			('0f28ee26-ddc2-49a0-8640-69a0f6b724b7', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-tipos-documento', true, 'now()', 'now()'),
			('917a1fb2-ffc0-4816-80af-543577dd2485', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-campos-documento', true, 'now()', 'now()'),
			('938c796c-7376-4e2f-b54e-78207338665c', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais', true, 'now()', 'now()'),
			('461ec3b9-bb8b-4274-b31a-beb452c89782', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais-campos', true, 'now()', 'now()'),
			('2d1ff3bf-6b82-4ce5-bc35-899be7dc0181', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento', true, 'now()', 'now()'),
			('300720a3-fdd2-4768-84be-573f2ec3e811', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-unidades', true, 'now()', 'now()'),
			('a31be280-71d6-4da6-9a2b-fcff01328bfb', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-plantas', true, 'now()', 'now()'),
			('db4e892d-aee6-406c-976e-c56555ae6ece', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-posicoes', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  
  // configs

  await connection.query(
    `INSERT INTO configs (
      id,
      title,
      description,
      created_at,
      updated_at
    ) values 
      ('62e4bde6-56f0-4dae-b06a-c3ffcbd58047', 'email', '{"service":"gmail","smtpHost":"smtp.gmail.com","smtpPort":587,"smtpUser":"desenvweb@vamilly.com.br","smtpPass":"NCjEr<N39AUb3bC<"}', 'now()', 'now()')`
  )

  await connection.close()
}

export async function admin() {
  await create().then(() => console.log('Admin and Security tables created!'))
}
