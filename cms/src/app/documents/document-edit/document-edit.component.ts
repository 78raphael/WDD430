import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: Params) => {
        let id = params.params.id;
        if(!id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if(!this.originalDocument) return;

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onCancel()  {
    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm)  {
    let value = form.value;
    let newDocument = new Document("0", value.name, value.description, value.url, []);

    if(!this.editMode) {
      this.documentService.addDocument(newDocument);
    } else {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }

    this.router.navigate(['/documents'], {relativeTo: this.route});
  }

}
