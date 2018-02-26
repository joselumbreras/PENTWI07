import { Component } from '@angular/core';

import { FormComponent } from './form.component';
import { TableComponent } from './table.component';

@Component({
  selector: 'notes',
  providers: [FormComponent, TableComponent],
  templateUrl: './notes.component.html'
})
export class NotesComponent {
  
    constructor() {
      
    }

}
