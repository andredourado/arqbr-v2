import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTipoDocumento1669034273011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tipos_documento',
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
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'composicao_lote_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'numero_paginas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'mascara_nome_arquivo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'prazo_descarte_anos',
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
            name: 'FKClienteTipoDocumento',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoTipoDocumento',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoTipoDocumento',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKComposicaoLoteTipoDocumento',
            referencedTableName: 'composicao_lotes',
            referencedColumnNames: ['id'],
            columnNames: ['composicao_lote_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipos_documento')
  }
}
