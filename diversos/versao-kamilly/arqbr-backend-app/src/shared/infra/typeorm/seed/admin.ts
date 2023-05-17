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
			('1eb4f72a-266d-43db-825f-6202b0233a36', 'Tabelas', 'now()', 'now()'),
			('9dc28423-e669-4f9a-af83-f5ddd50b5b31', 'Clientes', 'now()', 'now()'),
			('4949b2f6-14eb-40b3-b9f3-b48ccf22c775', 'Pessoas', 'now()', 'now()'),
			('22066dbc-fc73-4a22-92d3-b9b4c4d42164', 'Coleta', 'now()', 'now()'),
			('7ebe378a-012c-4e7b-8ea5-fa2eb9fab178', 'Classificação', 'now()', 'now()'),
			('8423b099-843e-4752-9b78-8a895211d6de', 'Digitalização', 'now()', 'now()'),
			('4e781e9c-78c7-436d-8838-de45c1d433ae', 'Armazenamento', 'now()', 'now()')`
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
			('2fd59ac1-b5ea-4afd-adf9-3e441f4083e0', '1eb4f72a-266d-43db-825f-6202b0233a36', '002', 'Tabelas', '', 'fa-solid fa-table-list', 'comum', 'now()', 'now()'),
			('357151ae-a729-4778-b83f-b79dd17731b0', '1eb4f72a-266d-43db-825f-6202b0233a36', '002001', 'Estados', '/estados', 'List', 'comum-estados', 'now()', 'now()'),
			('9266de1e-9332-42f2-89a2-e393de09854d', '1eb4f72a-266d-43db-825f-6202b0233a36', '002002', 'Cidades', '/cidades', 'List', 'comum-cidades', 'now()', 'now()'),
			('a24fd829-d635-42a8-aad8-2ea01648110b', '1eb4f72a-266d-43db-825f-6202b0233a36', '002003', 'Serviços', '/servicos', 'List', 'comum-servicos', 'now()', 'now()'),
			('2a218be7-e5dd-472b-935d-c34698131f6b', '1eb4f72a-266d-43db-825f-6202b0233a36', '002004', 'Status', '/statuses', 'List', 'comum-statuses', 'now()', 'now()'),
			('0cfbef16-e105-4dd6-82eb-6311d381b7a5', '1eb4f72a-266d-43db-825f-6202b0233a36', '002005', 'Tipos de Afastamento', '/tipos-afastamento', 'List', 'comum-tipos-afastamento', 'now()', 'now()'),
			('141bd3e1-f1d1-4b30-b1c0-c0b3b89210fe', '1eb4f72a-266d-43db-825f-6202b0233a36', '002006', 'Composição dos Lotes', '/composicao-lotes', 'List', 'comum-composicao-lotes', 'now()', 'now()'),
			('a4065580-9832-441f-80f7-30a8ed5520e9', '1eb4f72a-266d-43db-825f-6202b0233a36', '002007', 'Frequências', '/frequencias', 'List', 'comum-frequencias', 'now()', 'now()'),
			('418012cb-f69d-436e-a8d7-96b971b4cfc9', '1eb4f72a-266d-43db-825f-6202b0233a36', '002008', 'Unidades de SLA', '/unidades-sla', 'List', 'comum-unidades-sla', 'now()', 'now()'),
			('35131bf8-ae36-423b-b93e-78bd7899679f', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003', 'Clientes', '', 'fa-solid fa-people-roof', 'clientes', 'now()', 'now()'),
			('eeb044d3-13e6-4b91-9413-0399108bd5b5', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003001', 'Clientes', '/clientes', 'List', 'clientes-clientes', 'now()', 'now()'),
			('1242e542-7a23-4fcb-925f-14822acc35ca', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003002', 'Departamentos', '/departamentos', 'List', 'clientes-departamentos', 'now()', 'now()'),
			('0e146291-e65d-4e15-b990-ef376977e7eb', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003003', 'Solicitantes', '/solicitantes', 'List', 'clientes-solicitantes', 'now()', 'now()'),
			('e19db144-17d2-4002-a400-ec57fb596171', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003004', 'Contratos', '/contratos', 'List', 'clientes-contratos', 'now()', 'now()'),
			('c3882ef0-7067-46c7-ba5f-8a6b4a4146d7', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003005', 'Tipos de Documentos', '/tipos-documento', 'List', 'clientes-tipos-documento', 'now()', 'now()'),
			('ceb4a01b-a2fe-4969-891c-65073e482f55', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003006', 'Pontos de Coleta', '/pontos-coleta', 'List', 'clientes-pontos-coleta', 'now()', 'now()'),
			('437585d9-bfd9-4a1f-b526-20cf5aca1063', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003007', 'Frequencia de Coletas', '/frequencia-coletas', 'List', 'clientes-frequencia-coletas', 'now()', 'now()'),
			('d2e6a2da-baa7-48a6-a4c8-3ef592902f6d', '9dc28423-e669-4f9a-af83-f5ddd50b5b31', '003008', 'Serviços Contratados', '/servicos-contratados', 'List', 'clientes-servicos-contratados', 'now()', 'now()'),
			('4fd65658-e2e4-402d-aaff-92b4470199e9', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004', 'Pessoas', '', 'fa-solid fa-users', 'pessoas', 'now()', 'now()'),
			('b124fdaf-068e-452b-9466-c25c2b5c1c23', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004001', 'Funções', '/funcoes', 'List', 'pessoas-funcoes', 'now()', 'now()'),
			('5782a359-0356-4a88-a60c-f81adf7a5b57', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004002', 'Pessoas', '/pessoas', 'List', 'pessoas-pessoas', 'now()', 'now()'),
			('236d7a53-3413-4a4b-956c-dd6781cc4d60', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004003', 'Jornadas', '/jornadas', 'List', 'pessoas-jornadas', 'now()', 'now()'),
			('8c95ebbe-4c7e-4929-a709-5f9b469393db', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004004', 'Escalas', '/escalas', 'List', 'pessoas-escalas', 'now()', 'now()'),
			('7eecba00-026a-4b99-8432-5c86953e8ab6', '4949b2f6-14eb-40b3-b9f3-b48ccf22c775', '004005', 'Afastamentos', '/afastamentos', 'List', 'pessoas-afastamentos', 'now()', 'now()'),
			('be50e7bf-3cb5-469a-a5b2-6dda0cfb054e', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005', 'Coleta', '', 'fa-solid fa-truck', 'coleta', 'now()', 'now()'),
			('1b30cff3-4cf5-40e1-bca9-72863c1b1b76', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005001', 'Veículos', '/veiculos', 'List', 'coleta-veiculos', 'now()', 'now()'),
			('f2bdb0e4-4e5a-4c54-a412-3f3a99525139', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005002', 'Entregadores', '/entregadores', 'List', 'coleta-entregadores', 'now()', 'now()'),
			('307941a0-7439-455c-b9f0-bf1406817a39', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005003', 'Coletas', '/coletas', 'List', 'coleta-coletas', 'now()', 'now()'),
			('7580b7d3-389c-4b95-917e-efc49de3e6df', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005004', 'Times de Coleta', '/times-coleta', 'List', 'coleta-times-coleta', 'now()', 'now()'),
			('a14c62d6-42f0-4bf2-b329-474d84313821', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005005', 'Volumes', '/volumes', 'List', 'coleta-volumes', 'now()', 'now()'),
			('aa4dd434-98e2-49a1-876c-536385cda601', '22066dbc-fc73-4a22-92d3-b9b4c4d42164', '005006', 'Rastreamento de Volumes', '/rastreamento-volumes', '', 'coleta-rastreamento-volumes', 'now()', 'now()'),
			('a67d39d8-4e9b-4dfa-8e49-5fb383e85861', '7ebe378a-012c-4e7b-8ea5-fa2eb9fab178', '006', 'Classificação', '', 'fa-solid fa-box-open', 'classificacao', 'now()', 'now()'),
			('33dfc3fc-81cc-4989-9d1a-9b32cc20a262', '7ebe378a-012c-4e7b-8ea5-fa2eb9fab178', '006001', 'Documentos', '/documentos', 'List', 'classificacao-documentos', 'now()', 'now()'),
			('fc8885cf-d9fc-4836-a70c-1c218adf6e4a', '7ebe378a-012c-4e7b-8ea5-fa2eb9fab178', '006002', 'Rastreamento de Documentos', '/rastreamento-documentos', '', 'classificacao-rastreamento-documentos', 'now()', 'now()'),
			('7b23271a-61b0-4865-8f36-c7436b26b770', '8423b099-843e-4752-9b78-8a895211d6de', '007', 'Digitalização', '', 'fa-solid fa-print', 'digitalizacao', 'now()', 'now()'),
			('572eb18e-3d4f-4150-a3fe-79f5a4011b45', '8423b099-843e-4752-9b78-8a895211d6de', '007001', 'Versões de Documento', '/versoes-documento', 'List', 'digitalizacao-versoes-documento', 'now()', 'now()'),
			('cde55925-8277-4cad-858d-266ac19720ba', '8423b099-843e-4752-9b78-8a895211d6de', '007002', 'Campos de Documento', '/campos-documento', 'List', 'digitalizacao-campos-documento', 'now()', 'now()'),
			('fbbe6804-8aab-4c8b-8cf5-3c6711625ad3', '8423b099-843e-4752-9b78-8a895211d6de', '007003', 'Documentos Digitais', '/documentos-digitais', 'List', 'digitalizacao-documentos-digitais', 'now()', 'now()'),
			('597e5ea3-91af-46c8-95ba-0408874a0317', '8423b099-843e-4752-9b78-8a895211d6de', '007004', 'Campos dos Documentos Digitais', '/documentos-digitais-campos', 'List', 'digitalizacao-documentos-digitais-campos', 'now()', 'now()'),
			('64447493-e352-4c05-90b4-9c6c4c26e68a', '4e781e9c-78c7-436d-8838-de45c1d433ae', '008', 'Armazenamento', '', 'fa-solid fa-boxes-stacked', 'armazenamento', 'now()', 'now()'),
			('16f59d77-2d40-4eb9-9fb9-8783c23d3747', '4e781e9c-78c7-436d-8838-de45c1d433ae', '008001', 'Unidades', '/unidades', 'List', 'armazenamento-unidades', 'now()', 'now()'),
			('1d333874-ee4f-47f2-992c-93232ce2963e', '4e781e9c-78c7-436d-8838-de45c1d433ae', '008002', 'Plantas', '/plantas', 'List', 'armazenamento-plantas', 'now()', 'now()'),
			('2da3c0cb-94bb-4ed2-9e27-f44b6d6e9d7d', '4e781e9c-78c7-436d-8838-de45c1d433ae', '008003', 'Posições', '/posicoes', 'List', 'armazenamento-posicoes', 'now()', 'now()')`
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
			('c5654561-b786-4ce2-82e5-e8c9a68b234b', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum', true, 'now()', 'now()'),
			('29e163c7-c8e6-4137-b4e2-3f61f6bd4a93', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-estados', true, 'now()', 'now()'),
			('2e55d6fb-437a-45f4-9f0e-ad93c849cf5d', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-cidades', true, 'now()', 'now()'),
			('11e1c330-992d-48b4-981c-48be3dae2012', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-servicos', true, 'now()', 'now()'),
			('5c13fd5c-ff53-45f5-a0d0-918b69641385', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-statuses', true, 'now()', 'now()'),
			('27449522-03e8-46f7-8184-99558757b834', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-tipos-afastamento', true, 'now()', 'now()'),
			('f38cfcd4-0739-4bc4-9a15-a8ad6a7deadd', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-composicao-lotes', true, 'now()', 'now()'),
			('db603cd1-2956-4d66-9557-bb5430b4cdf6', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-frequencias', true, 'now()', 'now()'),
			('5a5e83b6-9401-406a-a5f2-271a8a7622d7', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-unidades-sla', true, 'now()', 'now()'),
			('7be3ddfa-0cda-47c8-873d-ee2d534ac789', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes', true, 'now()', 'now()'),
			('2ae6cc75-40ce-4770-ac63-e4175cd37e56', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-clientes', true, 'now()', 'now()'),
			('941e2732-6b9c-44c3-bf39-50d16715078d', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-departamentos', true, 'now()', 'now()'),
			('36cd14ba-dffd-4440-b597-8dbf662d1e09', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-solicitantes', true, 'now()', 'now()'),
			('001aa6a8-2a98-4ab4-aa31-6a7c447aec17', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-contratos', true, 'now()', 'now()'),
			('235c2737-dea7-4713-98aa-dcd1427439d4', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-tipos-documento', true, 'now()', 'now()'),
			('81688ed8-dcf6-422f-85ef-1d8d98b63e82', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-pontos-coleta', true, 'now()', 'now()'),
			('ec2dbd63-62db-4cd1-8205-033f1d7ae9d1', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-frequencia-coletas', true, 'now()', 'now()'),
			('4d7852da-9afe-4ad7-a243-c0695cc5b783', '3c99decf-f975-4b16-b552-0747afd397a3', 'clientes-servicos-contratados', true, 'now()', 'now()'),
			('1ffb1775-bb93-4773-9cb8-ac0047757ced', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas', true, 'now()', 'now()'),
			('e5fc40ac-7a2e-4b16-be0f-8b34f09520f5', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-funcoes', true, 'now()', 'now()'),
			('6fa874dd-e640-48f7-a698-ae866d5fcebd', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-pessoas', true, 'now()', 'now()'),
			('9bd9b08f-ebb0-4b8a-b96d-bd96eea4f016', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-jornadas', true, 'now()', 'now()'),
			('caea4677-b979-43a5-90c1-c1d28b5adf55', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-escalas', true, 'now()', 'now()'),
			('00c8b618-d6bc-4ecf-b074-4bb078928aa6', '3c99decf-f975-4b16-b552-0747afd397a3', 'pessoas-afastamentos', true, 'now()', 'now()'),
			('7be4490e-79ad-4898-b1bd-bfee4aff09c9', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta', true, 'now()', 'now()'),
			('e437c1a0-2c32-4149-ad7a-0c941d4bed69', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-veiculos', true, 'now()', 'now()'),
			('f2b861e8-4c41-45e5-ada3-2c4084f95320', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-entregadores', true, 'now()', 'now()'),
			('081f4b7c-a280-422a-ad53-3901b436c3da', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-coletas', true, 'now()', 'now()'),
			('be88d11f-ec8a-4bc3-bf67-248fcd0338b3', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-times-coleta', true, 'now()', 'now()'),
			('d6c2d177-7766-46f4-b8a4-5c0d097f6be2', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-volumes', true, 'now()', 'now()'),
			('6c32ad23-9478-4bee-b46e-111ec0bebc07', '3c99decf-f975-4b16-b552-0747afd397a3', 'coleta-rastreamento-volumes', true, 'now()', 'now()'),
			('f5bdd33e-a3a2-4ce8-9fba-f5e8128851fc', '3c99decf-f975-4b16-b552-0747afd397a3', 'classificacao', true, 'now()', 'now()'),
			('0ef3eb05-c9bc-4c67-8883-bb11bee20b8f', '3c99decf-f975-4b16-b552-0747afd397a3', 'classificacao-documentos', true, 'now()', 'now()'),
			('187d56e5-4014-4c90-b102-dc31a111fefd', '3c99decf-f975-4b16-b552-0747afd397a3', 'classificacao-rastreamento-documentos', true, 'now()', 'now()'),
			('e465e738-bbbd-4482-bf5f-2541a36cbf12', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao', true, 'now()', 'now()'),
			('b0f7f63f-f100-4c01-9cf7-dec04e717f05', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-versoes-documento', true, 'now()', 'now()'),
			('0de882f1-3bf1-4f46-9c02-fbfd867709de', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-campos-documento', true, 'now()', 'now()'),
			('80c6f2ec-5fd5-40ad-b8cb-fe413758c558', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais', true, 'now()', 'now()'),
			('6c8f9b4a-10f4-4078-8313-9543fb48f961', '3c99decf-f975-4b16-b552-0747afd397a3', 'digitalizacao-documentos-digitais-campos', true, 'now()', 'now()'),
			('78fa02b5-b6ac-4e59-b261-cde78c5a6799', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento', true, 'now()', 'now()'),
			('7b56213c-59a5-4210-87ec-44f7875e50f4', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-unidades', true, 'now()', 'now()'),
			('753ac0b1-cb31-4c85-bf90-5e92ecac6ebb', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-plantas', true, 'now()', 'now()'),
			('cecadece-3d29-4efc-953f-7b499bdbc8cc', '3c99decf-f975-4b16-b552-0747afd397a3', 'armazenamento-posicoes', true, 'now()', 'now()')`
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

  await connection.close()
}

create().then(() => console.log('Admin and Security tables created!'))
