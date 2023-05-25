import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocumentoDigital1684867219017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documentos_digitais',
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
            name: 'nome_arquivo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nome_arquivo_origem',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conteudo_em_texto',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'numero_paginas',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'solicitacao_fisico',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'data_solicitacao',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'solicitante_id',
            type: 'uuid',
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
            name: 'FKClienteDocumentoDigitalClienteId',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoDocumentoDigitalDepartamentoId',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTipoDocumentoDocumentoDigitalTipoDocumentoId',
            referencedTableName: 'tipos_documento',
            referencedColumnNames: ['id'],
            columnNames: ['tipo_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKSolicitanteDocumentoDigitalSolicitanteId',
            referencedTableName: 'solicitantes',
            referencedColumnNames: ['id'],
            columnNames: ['solicitante_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documentos_digitais')
  }
}
