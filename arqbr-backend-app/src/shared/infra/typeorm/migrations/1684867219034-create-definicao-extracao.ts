import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDefinicaoExtracao1684867219034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'definicoes_extracao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cliente_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'departamento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tipo_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'pdf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'texto_quebra',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nome_campo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estrategia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'texto',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linha',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'comprimento',
            type: 'int',
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
            name: 'FKClienteDefinicaoExtracaoClienteId',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoDefinicaoExtracaoDepartamentoId',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTipoDocumentoDefinicaoExtracaoTipoDocumentoId',
            referencedTableName: 'tipos_documento',
            referencedColumnNames: ['id'],
            columnNames: ['tipo_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('definicoes_extracao')
  }
}
