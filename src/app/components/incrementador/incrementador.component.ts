import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent  {

  //@Input() progreso: number=50; 
  // puede recibir un propiedad desde el padre llamada progreso
  @Input('valor') progreso: number=50; 
  // podemos renombrar a la propiedad progreso.
  @Input() btnClass: string = 'btn btn-primary';

  // EMITE UN EVENTO NUMERICO
  @Output() valorSalida: EventEmitter<number> = new EventEmitter(); 

  get getPorcentaje(){
    return `${this.progreso}%`;
  }
  cambiarValor(valor:number){
    if (this.progreso >=100 && valor>=0){
      this.valorSalida.emit(100);
      this.progreso=100;
      return; // me salgo
    }
    if (this.progreso <=0 && valor<0){
      this.valorSalida.emit(0);
      this.progreso=0;
      return; // me salgo
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  MiOnChange(valor:number){
    if(valor >=100){
      this.progreso = 100;
    } else if ( valor <=0){
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
