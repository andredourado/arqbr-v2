import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { PoModalPasswordRecoveryComponent } from "@po-ui/ng-templates"
import { PoInputComponent, PoLanguage, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components'
import { AuthService } from "src/app/services/auth.service"
import { LanguagesService } from "src/app/services/languages.service"
import { environment } from "src/environments/environment"
import { Router } from '@angular/router'

interface Props {
  login: string
  password: string
  rememberUser: boolean
}

interface IQrCodeResponse {
  dataURL: string
}

interface SignInResponse {
  tfa: boolean
  mustActiveTwoFactorAuthentication: boolean
  value: object
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(PoModalPasswordRecoveryComponent, { static: true }) passwordRecoveryModal: PoModalPasswordRecoveryComponent
  @ViewChild('tfaModal', { static: true }) tfaModal: PoModalComponent
  @ViewChild('input0') input0: PoInputComponent
  @ViewChild('input1') input1: PoInputComponent
  @ViewChild('input2') input2: PoInputComponent
  @ViewChild('input3') input3: PoInputComponent
  @ViewChild('input4') input4: PoInputComponent
  @ViewChild('input5') input5: PoInputComponent
  public urlRecovery = `${environment.baseUrl}/passwords/forgot`
  public tfa: any
  public isLoading: boolean
  private value: any
  public entrar: PoModalAction = {
    label: 'Entrar',
    action: this.twoFactorAuthenticationVerify.bind(this)
  }
  public navigateAuthAppUrl: PoModalAction = {
    label: 'Autenticador',
    action: this.navigateToAppStore.bind(this)
  }
  public poLanguages: PoLanguage[]
  public poLiterals: any
  
  tfaForm = this.formBuilder.group({
    code0: '',
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: ''
  })

  subscriptions: Subscription = new Subscription()

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private poNotificationService: PoNotificationService,
    private router: Router,
    private languagesService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.poLanguages = this.languagesService.getLanguages
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  login(event: Props) {
    event.password = btoa(event.password)

    const loginResponse = this.authService.signIn(event)

    loginResponse.then((res: SignInResponse) => {
      if (res.mustActiveTwoFactorAuthentication) {
        this.value = res.value
        this.twoFactorAuthenticationSetup()
      }

      if (res.tfa && !res.mustActiveTwoFactorAuthentication) {
        this.value = res.value
        this.tfaModal.open()
      }
    })
  }

  passwordRecovery() {
    this.passwordRecoveryModal.open()
  }

  submitPasswordRecovery(event: string) {
    this.isLoading = true
    this.subscriptions.add(
      this.httpClient
        .post(this.urlRecovery, event)
        .subscribe({
          next: () => {
            this.poNotificationService.success({
              message: 'E-Mail de recuperação de senha enviado!',
              duration: environment.poNotificationDuration
            })
            this.isLoading = false
            this.passwordRecoveryModal.completed()
          },
          error: () => this.isLoading = false
        })
    )
  }

  modelChange(index: string) {
    if (this.tfaForm.value[`code${index}`].length === 0 && index !== '0') this[`input${Number(index) - 1}`].focus()
    if (this.tfaForm.value[`code${index}`].length === 1 && index !== '5') this[`input${Number(index) + 1}`].focus()
  }

  twoFactorModalOpen() {
    this.subscriptions.add(
      this.twoFactorAuthenticationSetup()
    )
  }

  twoFactorAuthenticationSetup() {
    this.httpClient.post(`${environment.baseUrl}/tfa/setup`, null)
      .subscribe({
        next: (response: IQrCodeResponse) => {
          this.tfa = response
          this.tfaModal.open()
        },
        error: (error) => console.log(error)
      })
  }

  twoFactorAuthenticationVerify() {
    if (this.tfaForm.valid) {
      const payload = {
        code: this.tfaForm.value.code0 + 
          this.tfaForm.value.code1 +
          this.tfaForm.value.code2 +
          this.tfaForm.value.code3 +
          this.tfaForm.value.code4 +
          this.tfaForm.value.code5,
        login: this.value.user.login
      }
  
      this.subscriptions.add(
        this.httpClient
          .post(`${environment.baseUrl}/tfa/verify`, payload)
          .subscribe({
            next: () => {
              this.value.user.tfa = true
              localStorage.setItem("@arqbr:user", JSON.stringify(this.value))
              this.router.navigate(['home'])
            },
            error: (error) => console.log(error)
          })
      )
    } 
  }

  navigateToAppStore() {
    window.open('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US')
  }

  changeLanguage(language: PoLanguage) {
    this.languagesService.switchLanguage(language)
  }
}
