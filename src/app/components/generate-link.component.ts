import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.css']
})
export class GenerateLinkComponent implements OnInit {

  form
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      repName: this.fb.control('', Validators.required),
      relationship: this.fb.control('', Validators.required)
    })
  }

  generate(){
    console.log("hi")
  }
}
