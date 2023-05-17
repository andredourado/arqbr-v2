import { getRepository, Repository } from 'typeorm'
import { IUserDTO } from '@modules/security/dtos/i-user-dto'
import { IUserRepository } from '@modules/security/repositories/i-user-repository'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }


  // create
  async create ({
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    avatar,
    disabled
  }: IUserDTO): Promise<HttpResponse> {
    const user = this.repository.create({
      userGroupId,
      name,
      login,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      avatar,
      isDisabled: disabled
    })

    const result = await this.repository.save(user)
      .then(userResult => {
        return ok(userResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "userGroupName",
      "name",
      "login"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let users = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
          'us1.id as "userGroupId"',
          'us1.name as "userGroupName"',
          'use.name as "name"',
          'use.login as "login"',
        ])
        .leftJoin('use.userGroupId', 'us1')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .orWhere('use.name ilike :search', { search: `%${search}%` })
        .orWhere('use.login ilike :search', { search: `%${search}%` })
        .addOrderBy('us1.name', columnOrder[0])
        .addOrderBy('use.name', columnOrder[1])
        .addOrderBy('use.login', columnOrder[2])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (users.length > rowsPerPage) {
        users = users.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(users)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const users = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "value"',
          'use.name as "label"',
        ])
        .where('use.name ilike :filter', { filter: `${filter}%` })
        .addOrderBy('use.name')
        .getRawMany()

      return ok(users)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const user = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "value"',
          'use.name as "label"',
        ])
        .where('use.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(user)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const users = await this.repository.createQueryBuilder('use')
        .select([
          'use.id as "id"',
        ])
        .leftJoin('use.userGroupId', 'us1')
        .where('us1.name ilike :search', { search: `%${search}%` })
        .orWhere('use.name ilike :search', { search: `%${search}%` })
        .orWhere('use.login ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: users.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const user = await this.repository.findOne(id)

      if (typeof user === 'undefined') {
        return noContent()
      }

      return ok(user)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    avatar,
    disabled
  }: IUserDTO): Promise<HttpResponse> {
    const user = await this.repository.findOne(id)

    if (!user) {
      return notFound()
    }

    const newuser = this.repository.create({
      id,
      userGroupId,
      name,
      login,
      password,
      isAdmin,
      isSuperUser,
      isBlocked,
      blockReasonId,
      mustChangePasswordNextLogon,
      avatar,
      isDisabled: disabled
    })

    try {
      await this.repository.save(newuser)

      return ok(newuser)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      ids.map(async(id) => await this.repository.delete(id))

      return noContent()
    } catch (err) {
      return serverError(err)
    }
  }
}

export { UserRepository }
