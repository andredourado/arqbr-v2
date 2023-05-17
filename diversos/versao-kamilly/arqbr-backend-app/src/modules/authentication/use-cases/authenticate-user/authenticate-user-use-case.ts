import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { AppError } from '@shared/errors/app-error'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/date-provider/i-date-provider'

interface IRequest {
  login: string
  password: string
}

interface IResponse {
  user: {
    name: string
    login: string
    mustChangePassword?: boolean
    isBlocked?: boolean
    blockReasonId?: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(login)
    const {
      expires_in_token,
      secret_refreshToken,
      secret_token,
      expires_in_refreshToken,
      expires_refreshToken_days,
    } = auth

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refreshToken = sign({ login }, secret_refreshToken, {
      subject: user.id,
      expiresIn: expires_in_refreshToken,
    })

    const refreshToken_expiresDate = this.dateProvider.addDays(
      expires_refreshToken_days
    )

    await this.userTokenRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshToken_expiresDate,
    })

    let mustChangePassword = undefined
    if (user.mustChangePasswordNextLogon) {
      const token = uuidV4()

      const expiresDate = this.dateProvider.addHours(3)

      await this.userTokenRepository.create({
        refreshToken: token,
        userId: user.id,
        expiresDate,
      })

      mustChangePassword = token
    }

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        login: user.login,
        mustChangePassword,
        isBlocked: user.isBlocked || undefined,
        blockReasonId: user.blockReasonId || undefined
      },
      refreshToken,
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
