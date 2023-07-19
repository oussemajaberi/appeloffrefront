import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  standalone!: true
  constructor() { }

  ngOnInit(): void {
    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: '#37cab9'
    })

    writer
      .type('Le meilleur')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(8)
      .type('talentueux')
      .rest(500)
      .remove(10)
      .type('ponctuel')
      .rest(500)
      .remove(8)
      .changeOps({ deleteSpeed: 80 })
      .start()


  }

}
