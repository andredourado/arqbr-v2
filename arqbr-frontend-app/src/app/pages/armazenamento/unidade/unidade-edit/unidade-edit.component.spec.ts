import { ComponentFixture, TestBed } from "@angular/core/testing"

import { UnidadeEditComponent } from "./unidade-edit.component"

describe("UnidadeEditComponent", () => {
  let component: UnidadeEditComponent
  let fixture: ComponentFixture<UnidadeEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadeEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
