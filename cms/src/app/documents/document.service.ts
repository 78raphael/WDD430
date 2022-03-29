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
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments()  {
    try {
      console.log("inside getDocuments");
      return this.http
        .get<Document[]>('http://localhost:3000/documents',
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        )
        .subscribe({
          next:
          (documents: Document[]) => {
            this.documents = documents['documents'];
            // console.log("subscribe Documents: ", documents);
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

  getDocument(id: string) {
    for(let i = 0; i < this.documents.length; i++) {
      let d = this.documents[i];
      console.log('d.id: ', d.id , ' ::: id: ', id);

      if (d.id == id)
        return d;
    }
    return null;
  }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          // this.sortAndSend();
        }
      );
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          // this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          // this.sortAndSend();
        }
      );
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
