import { Component, OnInit } from '@angular/core';
import {dragula} from 'ng2-dragula'

@Component({
  selector: 'app-assigntable',
  templateUrl: './assigntable.component.html',
  styleUrls: ['./assigntable.component.css']
})
export class AssigntableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    dragula([
      document.getElementById("to-do"),
      document.getElementById("doing"),
      document.getElementById("done"),
      document.getElementById("trash")
    ])
  .on("drag", function(el) {
    el.className.replace("ex-moved", "");
  })
  .on("drop", function(el) {
    el.className += "ex-moved";
  })
  .on("over", function(el, container) {
    container.className += "ex-over";
  })
  .on("out", function(el, container) {
    container.className.replace("ex-over", "");
  });

    console.log(document.getElementById("test").textContent)
  }
  
}
