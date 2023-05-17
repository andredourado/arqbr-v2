import { Component, OnInit } from "@angular/core"
import {
  PoModalPasswordRecoveryType,
  PoPageLoginRecovery,
} from "@po-ui/ng-templates"
import { PoDialogService } from '@po-ui/ng-components'
import { AuthService } from "src/app/services/auth.service"
import { environment } from "src/environments/environment"

interface Props {
  login: string
  password: string
  rememberUser: boolean
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public url: string

  passwordRecovery: PoPageLoginRecovery = {
    url: `${environment.baseUrl}/passwords/forgot`,
    type: PoModalPasswordRecoveryType.Email,
  }

  constructor(private authService: AuthService, public poDialogService: PoDialogService) {}

  ngOnInit(): void {}

  login(event: Props) {
    event.password = btoa(event.password)

    this.authService.signIn(event)

    if (this.authService.userValue.user.isBlocked) {
      this.poDialogService.alert({
        title: 'Usuário Bloqueado',
        message: `
          <p>
            <b>Motivo de bloqueio:</b> ${this.authService.userValue.user.blockReasonId.description}
          </p>
          <p>
            <b>Instruções de Reset:</b> ${this.authService.userValue.user.blockReasonId.instructionsToSolve || 'Contate um administrador.'}
          </p>`
      })
    }
  }
}
