import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments()  {
   
    try {
      return this.http
        .get<Document[]>('https://wdd430-angular-cms-default-rtdb.firebaseio.com/documents.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Documents' })
          }
        )
        .subscribe({
          next:
          (documents: Document[]) => {
            this.documents = documents;
            this.maxDocumentId = this.getMaxId();
            this.documents.sort((a, b) => {
              if(a < b) return -1;
              if(a > b) return 1;
              return 0;
            });

            let documentsListClone = this.documents.slice();
            this.documentChangedEvent.next(documentsListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });
    } catch(error)  {
      console.error('Error (getDocuments): ', error);
    }
  }

  storeDocuments()  {
    try {
      let stringDocs = JSON.stringify(this.documents);

      this.http.put('https://wdd430-angular-cms-default-rtdb.firebaseio.com/documents.json',
        stringDocs,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        })
        .subscribe({
          next:
          () => {
            let documentsListClone = this.documents.slice();
            this.documentChangedEvent.next(documentsListClone);
          },
          error:
          (error: any) => {
            console.log("Error: ", error);
          }
        });


    } catch(error)  {
      console.log('Error (storeDocuments): ', error);
    }
  }

  getDocument(id: string) {
    for(let i = 0; i < this.documents.length; i++) {
      let d = this.documents[i];

      if (d.id == id)
        return d;
    }
    return null;
  }

  deleteDocument(document: Document) {
    if(!document) return;

    const pos = this.documents.indexOf( document );

    if(pos < 0) return;
    this.documents.splice(pos, 1);

    this.storeDocuments();
  }

  addDocument(newDocument: Document) {
    if(!newDocument) return;
    this.maxDocumentId++;

    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document)  {
    if(!originalDocument || !newDocument) return;

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  getMaxId(): number  {
    let maxId = 0;

    for(let i=0; i < this.documents.length; i++) {
      let d = this.documents[i];
      let currentId = parseInt(d.id);

      if(currentId > maxId)  {
        maxId = currentId;
      }
    }
     return maxId;
  }
}
