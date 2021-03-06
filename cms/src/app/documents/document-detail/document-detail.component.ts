import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService, 
    private router: Router, 
    private route: ActivatedRoute,
    private WindRefService: WindRefService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // console.log('params: ', params, ' ::: params.id: ', params.id);
        this.document = this.documentService.getDocument(params.id);
        console.log('this.document: ', this.document);
      }
    );

    this.nativeWindow = this.WindRefService.getNativeWindow();
  }

  onView()  {
    if(this.document.url)  {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete()  {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

}
