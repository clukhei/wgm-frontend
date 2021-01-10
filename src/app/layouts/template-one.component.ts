import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {

  @Input() mainTitle: string 
  @Input() sideTitle: string 
  constructor() { }

  ngOnInit(): void {
  }

}
