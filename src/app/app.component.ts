import { Component } from '@angular/core';
import { CallerService } from './caller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  urlApi = 'https://hackatonapi-production.up.railway.app/input?word='
  urlApiPost= 'https://hackatonapi-production.up.railway.app/control'
  variable = 'output'
  frase?:string = undefined
  validacion?:string = undefined
  displayedColumns: string[] = ['calledNro', 'word','urlApi', 'valorCodif', 'accion'];
  dataSource = ELEMENT_DATA;
  constructor(private service : CallerService){

    for  (const iterator of this.dataSource) {
      this.ejecutar(iterator)    
    }
  }
  count=0;
  ejecutar(item: Element){
    
    item.urlApi = this.urlApi+item.word
    this.service.get(this.urlApi+item.word).subscribe(
        ok=>{
          item.valorCodif=ok[this.variable];
          this.count++;
          if(this.count==10){
            this.verificar();
          }
        },
        error=>{}
    );
  }
  

  verificar(){
    this.frase="..."
    this.resultado =0
    this.validacion = '...'
    var base64Completa=""
    for (const iterator of this.dataSource) {
      base64Completa+=iterator.valorCodif
    }
    //this.frase = atob( base64Completa ) //Problemas de las Ñ
    this.frase = decodeURIComponent(escape(window.atob( base64Completa )))
    
    console.log(this.frase.length)
    this.resultado = this.frase.replace(/\s/g, '').length + this.frase.length
    console.log(this.frase.replace(/\s/g, '') + this.frase.length)
    console.log(this.resultado)
    
    this.service.post(this.urlApiPost,{resultado:this.resultado}).subscribe(
      ok=>{
        this.validacion=this.resultado+"="+ok.output
      },
      error=>{}
    )
    


  }
  resultado:number=0



  changedWord(item: Element,word:string){
    item.word = word
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }


}
const ELEMENT_DATA: Element[] = [
  {calledNro:1,word:'lan',urlApi:'',valorCodif:'',valor:''},
  {calledNro:2,word:'derivada',urlApi:'',valorCodif:'',valor:''},
  {calledNro:3,word:'semaforo',urlApi:'',valorCodif:'',valor:''},
  {calledNro:4,word:'algoritmo',urlApi:'',valorCodif:'',valor:''},
  {calledNro:5,word:'variable',urlApi:'',valorCodif:'',valor:''},
  {calledNro:6,word:'osi',urlApi:'',valorCodif:'',valor:''},
  {calledNro:7,word:'uml',urlApi:'',valorCodif:'',valor:''},
  {calledNro:8,word:'docker',urlApi:'',valorCodif:'',valor:''},
  {calledNro:9,word:'red',urlApi:'',valorCodif:'',valor:''},
  {calledNro:10,word:'resistencia',urlApi:'',valorCodif:'',valor:''}

];
export interface Element {
  calledNro: number;
  word:string;
  urlApi: string;
  valorCodif: string;
  valor: string;
}