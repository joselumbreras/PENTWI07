import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PersistenceService {

    private notes: Note[];
    private counter: number;

    private onNoteAddedSource = new Subject<Note>();
    private onNoteRemovedSource = new Subject<Note>();

    onNoteAdded$ = this.onNoteAddedSource.asObservable();
    onNoteRemoved$ = this.onNoteRemovedSource.asObservable();

    constructor() {
        this.notes = [];
        this.counter = 0;
    }

    createNote(properties) {
        var note = new Note(properties);
        note.id = ++this.counter;
        return note;
    }

    saveNote(note: Note) {
        this.notes.push(note);
        this.onNoteAddedSource.next(note);
    }

    removeNote(note: Note) {
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].id === note.id) {
                this.notes.splice(i, 1);
                this.onNoteRemovedSource.next(note);
                break;
            }
        }
    }

    getNotes() {
        return this.notes;
    }

}

const TAGS_REGEX = /".*?"|[^,]*/g;

class Note {

    id: number;
    title: string;
    author: string;
    tags: string;
    text: string;

    constructor(properties) {
        if (!properties.title || (properties.title = properties.title.trim()).length == 0) {
            throw 'Debe ingresar un título para la nota';
        }

        if (!properties.author || (properties.author = properties.author.trim()).length == 0) {
            throw 'Debe ingresar un autor para la nota';
        }

        if (!properties.tags || !TAGS_REGEX.test(properties.tags)) {
            throw 'Debe ingresar al menos una etiqueta (separadas por coma)';
        }

        if (!properties.text || (properties.text = properties.text.trim()).length == 0) {
            throw 'Debe ingresar contenido a la nota';
        }

        this.title = properties.title;
        this.author = properties.author;
        this.tags = properties.tags;
        this.text = properties.text;
    }

    getTagList() {
        return this.tags.match(TAGS_REGEX).join(', ');
    }

}