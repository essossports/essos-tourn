import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() forName!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
