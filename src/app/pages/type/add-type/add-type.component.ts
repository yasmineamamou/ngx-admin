import { Component, EventEmitter, Output   } from '@angular/core';
import { TypeService } from "./../../../services/type.service";
@Component({
  selector: 'ngx-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent {
  type_nom: any;
  newTypeName: string;

  constructor(private typeService: TypeService){}
  @Output() onClose = new EventEmitter<void>();

  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getTypes();
  }
  async getTypes() {
    await this.typeService.getTypes().then(res => {
        this.type_nom = res.data;
      })
      .catch(err => {
        console.log(err);
    });
  }
  async addType() {
    console.log(this.newTypeName);
    let typeData = { type: this.newTypeName};
    await this.typeService.addType(typeData).then(res => {
      console.log("new typ "+res.data);
        this.getTypes();
        this.newTypeName = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
  }
}