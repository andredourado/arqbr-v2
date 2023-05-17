import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCliente1669034273003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clientes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nome_fantasia',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'razao_social',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'inscricao_estadual',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'endereco',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'numero',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complemento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estado_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cidade_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'desabilitado',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKEstadoCliente',
            referencedTableName: 'estados',
            referencedColumnNames: ['id'],
            columnNames: ['estado_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCidadeCliente',
            referencedTableName: 'cidades',
            referencedColumnNames: ['id'],
            columnNames: ['cidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clientes')
  }
}
