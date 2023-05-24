import { ComponentFixture, TestBed } from "@angular/core/testing"

import { CaixaQuebraListComponent } from "./caixa-quebra-list.component"

describe("CaixaQuebraListComponent", () => {
  let component: CaixaQuebraListComponent
  let fixture: ComponentFixture<CaixaQuebraListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaixaQuebraListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaQuebraListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
