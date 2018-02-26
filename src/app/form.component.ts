import { Component } from '@angular/core';

import { PersistenceService } from './persistence.service';

@Component({
    selector: 'notes-form',
    templateUrl: './form.component.html'
})
export class FormComponent {

    title: string;
    author: string;
    tags: string;
    text: string;

    constructor(public persistenceService: PersistenceService) {

    }

    saveNote() {
        try {
            var properties = {
                title: this.title,
                author: this.author,
                tags: this.tags,
                text: this.text
            };

            var note = this.persistenceService.createNote(properties);

            this.persistenceService.saveNote(note);
            
            this.clearFields();
        } catch (error) {
            alert(error);
        }
    }

    clearFields() {
        this.title = '';
        this.author = '';
        this.tags = '';
        this.text = '';
    }

}