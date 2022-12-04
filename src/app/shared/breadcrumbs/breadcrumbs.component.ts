import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy  {
  public titulo!:string;
  public tituloSubs$:Subscription; //$ para indicar que es un observable

  constructor(private router: Router) { 
    this.tituloSubs$=this.getArgumentosRuta()
                            .subscribe(data => {
                            console.log(data);
                            this.titulo=data ["titulo"];
                            document.title="AdminPro-" + data ["titulo"];
                             });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(  
      filter( (event:any) => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data) 
    );
  }
}
