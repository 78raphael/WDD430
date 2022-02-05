import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {  }

  ngOnInit() {
    console.log("inside ngOnInit", this.documentService);
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;

        console.log('Document: ', document);
        console.log('selectedDocument: ', this.selectedDocument);
      }
    );
  }

}
