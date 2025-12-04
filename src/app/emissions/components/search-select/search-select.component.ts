import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'emissions-search-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-select.component.html',
})
export class SearchSelectComponent {
  private _values: string[] = [];

  @Input()
  set values(val: string[]) {
    this._values = [...(val ?? [])].sort((a, b) => a.localeCompare(b));
  }

  get values(): string[] {
    return this._values;
  }

  @Input() selectName: string = 'country';

  @Output() valueChange = new EventEmitter<string>();

  selectedValue: string = '';

  onChange() {
    this.valueChange.emit(this.selectedValue);
  }
}
