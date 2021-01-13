import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.css']
})
export class TemplateTwoComponent implements OnInit {
  @Input() body : ElementRef
  constructor() { }

  ngOnInit(): void {
  }

}
