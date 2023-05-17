import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocumento1669034273030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documentos',
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
            name: 'contrato_id',
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
            name: 'nip',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'caixa_arqbr',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conteudo_qr_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
            isNullable: false,
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
            name: 'FKClienteDocumento',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoDocumento',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoDocumento',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTipoDocumentoDocumento',
            referencedTableName: 'tipos_documento',
            referencedColumnNames: ['id'],
            columnNames: ['tipo_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKStatusDocumento',
            referencedTableName: 'status',
            referencedColumnNames: ['id'],
            columnNames: ['status_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPessoaDocumento',
            referencedTableName: 'pessoas',
            referencedColumnNames: ['id'],
            columnNames: ['pessoa_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documentos')
  }
}
