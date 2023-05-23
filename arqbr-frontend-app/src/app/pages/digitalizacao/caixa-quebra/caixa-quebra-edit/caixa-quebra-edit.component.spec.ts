import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CaixaQuebraEditComponent } from "./caixa-quebra-edit.component"

describe("CaixaQuebraEditComponent", () => {
  let component: CaixaQuebraEditComponent
  let fixture: ComponentFixture<CaixaQuebraEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaixaQuebraEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaQuebraEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
