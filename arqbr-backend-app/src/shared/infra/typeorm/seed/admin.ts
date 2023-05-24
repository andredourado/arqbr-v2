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
			('57fa5c72-c218-49c2-b1d7-7b86c0073a6b', 'Tabelas', 'now()', 'now()'),
			('d2261faa-788b-4258-9dca-f07f8d7c0848', 'Clientes', 'now()', 'now()'),
			('f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', 'Pessoas', 'now()', 'now()'),
			('04dd2234-560f-4c50-9c9f-cae1675281a6', 'Coleta', 'now()', 'now()'),
			('9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', 'Digitalização', 'now()', 'now()'),
			('b47dccea-2d1b-419b-b9bb-d17695ad43bf', 'Armazenamento', 'now()', 'now()')`
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
			('7392b72b-b506-4657-a2b2-cfa82a8fa52e', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002', 'Tabelas', '', 'fa-solid fa-table-list', 'comum', 'now()', 'now()'),
			('9b4256a4-7bb8-4349-ac0f-9a2ea52ce282', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002001', 'Países', '/paises', 'List', 'comum-paises', 'now()', 'now()'),
			('b94f2c4a-6ed0-4c9d-a65f-531c8bebefab', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002002', 'Estados', '/estados', 'List', 'comum-estados', 'now()', 'now()'),
			('5e8fa27b-e3bc-4d82-af8f-5ec6f1e7a82a', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002003', 'Cidades', '/cidades', 'List', 'comum-cidades', 'now()', 'now()'),
			('fee6297e-ad27-4f5c-be90-37f81cf88bfc', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002004', 'CEPs', '/ceps', 'List', 'comum-ceps', 'now()', 'now()'),
			('ddeb0fc0-8867-458c-8d03-7df4b366464a', '57fa5c72-c218-49c2-b1d7-7b86c0073a6b', '002006', 'Tipos de Afastamento', '/tipos-afastamento', 'List', 'comum-tipos-afastamento', 'now()', 'now()'),
			('04898a92-82ee-4623-b436-63da40faa5ce', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003', 'Clientes', '', 'fa-solid fa-people-roof', 'clientes', 'now()', 'now()'),
			('a879746d-095b-4ed8-ad3f-c89a50ac604d', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003001', 'Clientes', '/clientes', 'List', 'clientes-clientes', 'now()', 'now()'),
			('a7b32ee3-865e-4be6-ac80-5405788d355a', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003002', 'Centros de Custo', '/departamentos', 'List', 'clientes-departamentos', 'now()', 'now()'),
			('1b67101d-386d-45a9-85a8-033a683cfce2', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003003', 'Solicitantes', '/solicitantes', 'List', 'clientes-solicitantes', 'now()', 'now()'),
			('88db3490-b83b-4a01-a085-34ba5b07924a', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003004', 'Pontos de Coleta', '/pontos-coleta', 'List', 'clientes-pontos-coleta', 'now()', 'now()'),
			('3b9f6025-6379-4615-b290-437b9b178e2c', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003005', 'Frequencia de Coletas', '/frequencia-coletas', 'List', 'clientes-frequencia-coletas', 'now()', 'now()'),
			('961f6093-a1e6-4460-b3dd-589c7ebd2d37', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003006', 'Serviços Contratados', '/servicos-contratados', 'List', 'clientes-servicos-contratados', 'now()', 'now()'),
			('d2f4470e-580a-4915-9a68-8e80c69f7648', 'd2261faa-788b-4258-9dca-f07f8d7c0848', '003007', 'Sugestões', '/sugestoes', 'List', 'clientes-sugestoes', 'now()', 'now()'),
			('10824c13-0ba8-4e9a-9171-c4d06543d987', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004', 'Pessoas', '', 'fa-solid fa-users', 'pessoas', 'now()', 'now()'),
			('2c50f8d8-071b-4109-a0e9-58869595184f', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004001', 'Funções', '/funcoes', 'List', 'pessoas-funcoes', 'now()', 'now()'),
			('80c0a2cf-3f56-46d9-94c2-ab885dc649e8', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004002', 'Pessoas', '/pessoas', 'List', 'pessoas-pessoas', 'now()', 'now()'),
			('f6bd15a4-bbd9-4421-a910-eec30c50d17c', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004003', 'Jornadas', '/jornadas', 'List', 'pessoas-jornadas', 'now()', 'now()'),
			('d8778fd0-eafe-4653-be76-67c5ed43fd17', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004004', 'Escalas', '/escalas', 'List', 'pessoas-escalas', 'now()', 'now()'),
			('da18345a-2f41-4562-be41-d682f4445fc6', 'f08e3870-2e3f-4a3a-a219-6ea6b3cc578d', '004005', 'Afastamentos', '/afastamentos', 'List', 'pessoas-afastamentos', 'now()', 'now()'),
			('361ad0f3-da01-47ec-b9d5-5862ff78cfe5', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005', 'Coleta', '', 'fa-solid fa-truck', 'coleta', 'now()', 'now()'),
			('3a6cc815-6bb5-4533-a033-b6452a1a1ae8', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005001', 'Veículos', '/veiculos', 'List', 'coleta-veiculos', 'now()', 'now()'),
			('e29eb9c8-69d0-4d02-83bd-964a6ceebbf6', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005002', 'Entregadores', '/entregadores', 'List', 'coleta-entregadores', 'now()', 'now()'),
			('e3e5149c-b67a-4fbe-b78e-b7d063098627', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005003', 'Coletas', '/coletas', 'List', 'coleta-coletas', 'now()', 'now()'),
			('e4b74209-47d1-4bd4-94d7-cd711635182d', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005004', 'Times de Coleta', '/times-coleta', 'List', 'coleta-times-coleta', 'now()', 'now()'),
			('15aed948-a39a-4766-bcd0-3f9e6bbc23bf', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005005', 'Volumes', '/volumes', 'List', 'coleta-volumes', 'now()', 'now()'),
			('c5760b4f-d2fb-4926-b81b-7bacaa8ee0a6', '04dd2234-560f-4c50-9c9f-cae1675281a6', '005006', 'Rastreamento de Volumes', '/rastreamento-volumes', '', 'coleta-rastreamento-volumes', 'now()', 'now()'),
			('264ac86c-1d28-4e97-bfdd-b0168271b76b', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006', 'Digitalização', '', 'fa-solid fa-print', 'digitalizacao', 'now()', 'now()'),
			('cff0569d-c9c7-4d6e-a558-6ee9ca8cfdb2', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006001', 'Tipos de Documentos', '/tipos-documento', 'List', 'digitalizacao-tipos-documento', 'now()', 'now()'),
			('4abbbb0b-5475-46df-b991-2b99c75de959', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006002', 'Campos de Documento', '/campos-documento', 'List', 'digitalizacao-campos-documento', 'now()', 'now()'),
      ('947f18e3-a042-4066-b355-4b80f2392286', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006003', 'Quebras de Caixa', '/quebras-caixa', 'List', 'digitalizacao-quebras-caixa', 'now()', 'now()'),			
      ('55655f2b-693c-4efb-a465-afedb938a507', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006004', 'Documentos Digitais', '/documentos-digitais', 'List', 'digitalizacao-documentos-digitais', 'now()', 'now()'),
			('14d5bff1-8ca9-4802-8fb0-cf8c71ea79e8', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006005', 'Campos dos Documentos Digitais', '/documentos-digitais-campos', 'List', 'digitalizacao-documentos-digitais-campos', 'now()', 'now()'),
			('47e0b4bb-3feb-4f13-a2e9-7b30ba590ba7', '9a3835cb-1e2d-4370-80b7-3dcbcbd20b51', '006006', 'Ajuste Manual', '/ajuste-manual', 'List', 'ajuste-manual', 'now()', 'now()'),
			('edbc6472-72ed-403c-a323-af84a34b0335', 'b47dccea-2d1b-419b-b9bb-d17695ad43bf', '007', 'Armazenamento', '', 'fa-solid fa-boxes-stacked', 'armazenamento', 'now()', 'now()'),
			('2a68d42a-3ba1-4b40-b70c-db0ba3e5e20e', 'b47dccea-2d1b-419b-b9bb-d17695ad43bf', '007001', 'Unidades', '/unidades', 'List', 'armazenamento-unidades', 'now()', 'now()'),
			('0609f32d-09ed-4095-99a8-4f6398439291', 'b47dccea-2d1b-419b-b9bb-d17695ad43bf', '007002', 'Plantas', '/plantas', 'List', 'armazenamento-plantas', 'now()', 'now()'),
			('007481a2-d90e-4852-9080-864551cd3c4c', 'b47dccea-2d1b-419b-b9bb-d17695ad43bf', '007003', 'Posições', '/posicoes', 'List', 'armazenamento-posicoes', 'now()', 'now()')`
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
			('9ef1f0dd-98b9-4612-ad71-3e8b963f12fa', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum', true, 'now()', 'now()'),
			('77b5428a-94aa-4b5a-ab40-6acf2bac0a71', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-paises', true, 'now()', 'now()'),
			('2a1bd9ad-aecd-4d1f-b857-dfef745d3199', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-estados', true, 'now()', 'now()'),
			('cb245716-4b8c-4b4b-a816-b1e7daf3662f', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-cidades', true, 'now()', 'now()'),
			('4139473c-8a75-439d-8594-49926d9c81ff', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-ceps', true, 'now()', 'now()'),
			('230e7486-cd18-4f44-ab98-6a3fa758ffc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-tipos-afastamento', true, 'now()', 'now()'),
			('c080ba8b-9112-4b49-9468-d29bfc307ac2', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes', true, 'now()', 'now()'),
			('2a8cf39a-a913-4535-81f4-8443937a9a99', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-clientes', true, 'now()', 'now()'),
			('ee0f72cc-b8b9-4b14-9531-a3038798ebae', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-departamentos', true, 'now()', 'now()'),
			('af7cdae1-21bf-46d0-9ba1-3ba94c0fe61f', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-solicitantes', true, 'now()', 'now()'),
			('02c3838f-5111-43c2-990f-bd800b1dd17c', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-pontos-coleta', true, 'now()', 'now()'),
			('6c31a0de-49f4-4201-ad1e-2262de45f925', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-frequencia-coletas', true, 'now()', 'now()'),
			('16bbadbe-dc9a-4397-8b14-a58dec18bca5', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-servicos-contratados', true, 'now()', 'now()'),
			('04b71d60-9bb3-4282-abd8-fb6c76091be0', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-sugestoes', true, 'now()', 'now()'),
			('0293bcbc-03bb-48e8-a91a-3b5239e84a65', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas', true, 'now()', 'now()'),
			('7a2b3465-79e6-4a15-b6e7-d663652644a2', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-funcoes', true, 'now()', 'now()'),
			('6166a80c-9ad0-438d-a62e-f96c1ca6146c', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-pessoas', true, 'now()', 'now()'),
			('aaaabc16-5c0f-4b8f-baa4-01a416130352', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-jornadas', true, 'now()', 'now()'),
			('3d021963-b78f-4a5a-9597-09b434a0df60', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-escalas', true, 'now()', 'now()'),
			('2ff5f2a9-fc10-4576-a748-bf178bfb2b93', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-afastamentos', true, 'now()', 'now()'),
			('7ddc357c-8365-4a01-af16-3db66435ac0a', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta', true, 'now()', 'now()'),
			('7438dee8-4bbf-40c4-b030-ad246b977adb', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-veiculos', true, 'now()', 'now()'),
			('3b656d17-2cc1-4519-bd35-69cda8128bd2', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-entregadores', true, 'now()', 'now()'),
			('b7f2b72e-036d-4583-ad1e-a0b21c6b8ce3', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-coletas', true, 'now()', 'now()'),
			('979922ed-4a46-4518-8136-5a652197209f', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-times-coleta', true, 'now()', 'now()'),
			('3aee13c4-93d4-4133-af2b-4395e7fdaafb', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-volumes', true, 'now()', 'now()'),
			('8e2fef16-4f83-481b-b512-cac9fe099ec9', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-rastreamento-volumes', true, 'now()', 'now()'),
			('509dfb8a-d256-4d0c-aebb-dd1efdc8d09d', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao', true, 'now()', 'now()'),
			('3ce813a8-7fdf-4c44-bdc8-400f7e76ef7e', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-tipos-documento', true, 'now()', 'now()'),
			('e384e91b-62d0-4be2-a25e-63bfa26856bd', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-campos-documento', true, 'now()', 'now()'),
      ('d72ffaae-29f1-47cb-93fb-19f2199dc4ac', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-quebras-caixa', true, 'now()', 'now()'),
			('cf880d26-19ba-46b7-9839-e93ebeb6fd98', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais', true, 'now()', 'now()'),
			('2dfb07ea-befa-4705-baa9-4112aa3c2c9d', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais-campos', true, 'now()', 'now()'),
			('ccd7ba3a-7917-41a1-8208-016db22ce359', '3c99decf-f975-4b16-b552-0747afd397a3', 'ajuste-manual', true, 'now()', 'now()'),
			('4f6dc916-4176-425e-8b06-8682cda4f3be', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento', true, 'now()', 'now()'),
			('aadd8a7e-a459-4d45-b0cf-3340d89b6145', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-unidades', true, 'now()', 'now()'),
			('0e3ea04c-1c85-4c3d-9580-26bc844b8f61', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-plantas', true, 'now()', 'now()'),
			('fa59c66c-ad14-40ad-9dc4-d769e4f83582', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-posicoes', true, 'now()', 'now()')`
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
