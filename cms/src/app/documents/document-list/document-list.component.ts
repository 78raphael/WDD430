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
    new Document(1, 'Amazing Spider-Man #361', 'First appearance of Carnage', 'https://www.marvel.com/comics/issue/6773/the_amazing_spider-man_1963_361', []),
    new Document(2, 'X-Men #1', 'New X-Men series, cover by Jim Lee', 'https://www.marvel.com/comics/issue/14281/x-men_1991_1', []),
    new Document(3, 'Infinity Gauntlet #1', 'First in a 6 issue series', 'https://www.marvel.com/comics/issue/9286/infinity_gauntlet_1991_1', []),
    new Document(4, 'Fantastic Four #49', 'Arrival of Galactus and the Silver Surfer', 'https://www.marvel.com/comics/issue/13254/fantastic_four_1961_49', []),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document)  {
    this.selectedDocumentEvent.emit(document);
    console.log('onSelectedDocument', document);
  }

}
