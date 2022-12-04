import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => console.log(usuarios));
  }
  getUsuarios(){
      const promesa= new Promise(resolve=> {
        fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
      });
      return promesa;
    };

  





  // ngOnInit(): void {
  //   const promesa= new Promise((resolve,reject)=> {
  //     if (false){
  //       resolve('Hola Mundo');
  //     } else {
  //       reject('Algo salio mal');
  //     }
  //   });
  //   promesa.then(mensaje=> {console.log(mensaje); })
  //          .catch(error => console.log('Error:', error));
  //   console.log('Fin del Init');
  // }
}
