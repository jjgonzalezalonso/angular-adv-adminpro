import { Component, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import {take,map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {
  // pulso control + pto para implementar ondestroy
  intervalSubs: Subscription;

  constructor() {
      this.intervalSubs=this.retornaIntervalo().subscribe((valor) => console.log(valor));
   }
  ngOnDestroy(): void {
      this.intervalSubs.unsubscribe(); 
      //En el momento en que cambio de componente
  }

  retornaIntervalo():Observable<number>{
      return interval(500).pipe(
                             map(valor => valor + 1), 
                             filter(valor => (valor % 2 === 0) ? true: false),
                            //  take(10)
                              );
  }



   retornaObservable():Observable<number>{
    // emite numeros
    let i=0;
    const obs$= new Observable<number>(observer => {
      const intervalo=setInterval(()=>{
        i++;
        observer.next(i); // voy a emitir i
        if (i===3){
          clearInterval(intervalo);
          observer.complete();
        }
        if (i===2){
          observer.error('i llego al valor de 2');
        }
      },1000)

    });
    return obs$;
  }
}
      // this.retornaObservable().subscribe({
      //   next: value => console.log('Subs:', value), 
      //   error: err => console.warn('Error', err),
      //   complete: () => console.info('Obs terminado') 
      // });