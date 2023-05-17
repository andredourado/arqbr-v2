import { ComponentFixture, TestBed } from "@angular/core/testing"

import { EntregadorListComponent } from "./entregador-list.component"

describe("EntregadorListComponent", () => {
  let component: EntregadorListComponent
  let fixture: ComponentFixture<EntregadorListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregadorListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregadorListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
