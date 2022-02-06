import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] =  [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments()  {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for(let i = 0; i < this.documents.length; i++) {
      let d = this.documents[i];

      if (d.id == id)
        return d;
    }
    return null;
  }
}
