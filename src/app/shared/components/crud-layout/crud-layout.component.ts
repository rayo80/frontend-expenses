import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss']
})
export class CrudLayoutComponent implements OnInit {

  @Input() main = true;
  @Input() entity: string;

  constructor() { }

  ngOnInit(): void {}

}
