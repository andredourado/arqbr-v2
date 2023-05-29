import { ComponentFixture, TestBed } from "@angular/core/testing"

import { DefinicaoExtracaoEditComponent } from "./definicao-extracao-edit.component"

describe("quebraManualEditComponent", () => {
  let component: DefinicaoExtracaoEditComponent
  let fixture: ComponentFixture<DefinicaoExtracaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinicaoExtracaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinicaoExtracaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
