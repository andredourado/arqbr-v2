import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO estados (
      id,
      uf,
      nome,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'RO', 'Rondônia', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', 'AC', 'Acre', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', 'AM', 'Amazonas', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', 'RR', 'Roraima', 'now()', 'now()'), 
      ('f62c8c93-0312-4025-a880-65a4a5462a7f', 'PA', 'Pará', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', 'AP', 'Amapá', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', 'TO', 'Tocantins', 'now()', 'now()'), 
      ('de900160-67fa-4a52-a0c7-9e78bdfe14ee', 'MA', 'Maranhão', 'now()', 'now()'), 
      ('f42cf1e6-37da-4136-8432-fd7e4e54bcd5', 'PI', 'Piauí', 'now()', 'now()'), 
      ('d34b159f-ea06-47ca-9bc5-020f48d32ada', 'CE', 'Ceará', 'now()', 'now()'), 
      ('8084bb79-00d0-40a3-9198-71c7e58f93fd', 'RN', 'Rio Grande do Norte', 'now()', 'now()'), 
      ('8b3b3750-05fb-49d2-92eb-fabdd51f6d5a', 'PB', 'Paraíba', 'now()', 'now()'), 
      ('570a3147-ebc0-467a-aabf-3d26006f8b76', 'PE', 'Pernambuco', 'now()', 'now()'), 
      ('6cf1a796-414b-4c60-84b9-54e36e4b359c', 'AL', 'Alagoas', 'now()', 'now()'), 
      ('c85462df-94c5-4b8a-a2c5-3149531aa447', 'SE', 'Sergipe', 'now()', 'now()'), 
      ('76734bfd-1f16-4e37-9a56-25ff7950119b', 'BA', 'Bahia', 'now()', 'now()'), 
      ('cd4ab834-8c93-471d-8fe2-bc180d2577f6', 'MG', 'Minas Gerais', 'now()', 'now()'), 
      ('22967a97-1232-455a-9256-2c0952071ae1', 'ES', 'Espírito Santo', 'now()', 'now()'), 
      ('8e4ebe12-5679-4e15-bd57-03b9208ca39d', 'RJ', 'Rio de Janeiro', 'now()', 'now()'), 
      ('7d4aaf16-d19e-4da0-8c89-6528288d8d91', 'SP', 'São Paulo', 'now()', 'now()'), 
      ('0d920726-7d04-4611-a3c0-479f937f10cb', 'PR', 'Paraná', 'now()', 'now()'), 
      ('5330f10b-1b81-4747-a1e5-187b58baec72', 'SC', 'Santa Catarina', 'now()', 'now()'), 
      ('f23fa5cc-e69a-4df2-bc7d-4d4c41f4ceeb', 'RS', 'Rio Grande do Sul', 'now()', 'now()'), 
      ('ec6b58f2-f29e-4713-aa28-ed55dd9f92f3', 'MS', 'Mato Grosso do Sul', 'now()', 'now()'), 
      ('c221ac4a-1409-41c6-b985-a3abe45a4dc5', 'MT', 'Mato Grosso', 'now()', 'now()'), 
      ('191d6597-750e-4b45-be2a-889d773ad7f5', 'GO', 'Goiás', 'now()', 'now()'), 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'DF', 'Distrito Federal', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Tabela de estados criada!'))
