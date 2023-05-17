import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, Observable } from "rxjs"

import { User } from "./../interfaces/dtos/user"
import { RestService } from "./rest.service"

interface LoginRequestProps {
  login: string
  password: string
  rememberUser: boolean
}

interface ResponseProps {
  token: string
  refreshToken: string
  user: {
    name: string
    email: string
    mustChangePassword?: boolean
    isBlocked?: boolean
    blockReasonId?: string
  }
}

interface ResetPasswordRequestProps {
  id: string
  newPassword: string
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject: BehaviorSubject<User>
  public user: Observable<User>
  public response: ResponseProps

  constructor(private restService: RestService, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("@arqbr:user"))
    )
    this.user = this.userSubject.asObservable()
  }

  public get userValue(): User {
    const user = JSON.parse(localStorage.getItem("@arqbr:user"))
    return user
  }

  signIn(event: LoginRequestProps) {
    this.restService.post("/sessions", event).subscribe({
      next: (response: ResponseProps) => {
        localStorage.setItem("@arqbr:user", JSON.stringify(response))
        this.response = response
        
        if (this.response.user.mustChangePassword) {
          this.router.navigate([`reset/${this.response.user.mustChangePassword}`])
        }
        
        if (!this.response.user.mustChangePassword && !this.response.user.isBlocked) {
          this.router.navigate(["home"])
        }
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  signOut() {
    localStorage.removeItem("@arqbr:user")
    localStorage.removeItem("@arqbr:temp")
    this.router.navigate(["login"])
  }

  resetPassword(event: ResetPasswordRequestProps) {
    const payload = {
      password: event.newPassword
    }

    this.restService
      .post(`/passwords/reset?token=${event.id}`, payload)
      .subscribe({
        next: () => {
          if (this.response.user.mustChangePassword) {
            this.router.navigate(["home"])
          } else {
            this.router.navigate(["login"])
          }
        },
        error: (error) => {
          console.log(error)
        },
      })
  }
}
