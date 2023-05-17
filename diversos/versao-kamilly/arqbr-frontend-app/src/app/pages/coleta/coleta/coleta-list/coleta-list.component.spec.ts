import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ColetaListComponent } from "./coleta-list.component"

describe("ColetaListComponent", () => {
  let component: ColetaListComponent
  let fixture: ComponentFixture<ColetaListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColetaListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ColetaListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
