import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Homework 1', 'Assignment 1 for class', 'http://www.homework.com/assignment/1', []),
    new Document(2, 'Homework 2', 'Assignment 2 for class', 'http://www.homework.com/assignment/2', []),
    new Document(3, 'Homework 3', 'Assignment 3 for class', 'http://www.homework.com/assignment/3', []),
    new Document(4, 'Homework 4', 'Assignment 4 for class', 'http://www.homework.com/assignment/4', []),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document)  {
    this.selectedDocumentEvent.emit(document);
    console.log('onSelectedDocument', document);
  }

}
