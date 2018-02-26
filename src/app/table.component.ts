import { Component } from '@angular/core';

import { PersistenceService } from './persistence.service';

@Component({
    selector: 'notes-table',
    templateUrl: './table.component.html'
})
export class TableComponent {

    notes: object[];

    constructor(public persistenceService: PersistenceService) {
        persistenceService.onNoteAdded$.subscribe(note => {
            this.notes = persistenceService.getNotes();
        });
        persistenceService.onNoteRemoved$.subscribe(note => {
            this.notes = persistenceService.getNotes();
        });
    }

    removeNote(note) {
        this.persistenceService.removeNote(note);
    }

    update(note) {
        this.notes = this.persistenceService.getNotes();
    }

}