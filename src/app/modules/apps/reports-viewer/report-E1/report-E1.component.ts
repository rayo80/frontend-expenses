import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-filtros-e1',
  templateUrl: './report-E1.component.html'
})
export class FiltrosReporteE1 {
  @Output() filtroSubmit = new EventEmitter<any>();
  form = this.fb.group({
    start: [null],
    end: [null]
  });

  onSubmit() {
    this.filtroSubmit.emit(this.form.value);
  }
  constructor(private fb: FormBuilder) {}
}
