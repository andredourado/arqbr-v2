import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PosicaoEditComponent } from "./posicao-edit.component"

describe("PosicaoEditComponent", () => {
  let component: PosicaoEditComponent
  let fixture: ComponentFixture<PosicaoEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosicaoEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicaoEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
