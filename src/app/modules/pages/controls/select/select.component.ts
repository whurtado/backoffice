import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() datasource: any = [];

  constructor() {
    console.log('datasource__: ', this.datasource);
  }

  ngOnInit(): void {
    console.log('datasource: ', this.datasource);
  }

}


