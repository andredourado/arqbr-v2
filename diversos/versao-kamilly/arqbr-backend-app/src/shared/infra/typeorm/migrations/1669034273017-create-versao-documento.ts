import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVersaoDocumento1669034273017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'versoes_documento',
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
            name: 'descricao_versao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'qrcode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'squares',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'file',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'page_quantity',
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
            name: 'FKClienteVersaoDocumento',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoVersaoDocumento',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoVersaoDocumento',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTipoDocumentoVersaoDocumento',
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
    await queryRunner.dropTable('versoes_documento')
  }
}
