import { Component, OnInit, ViewChild  } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { ApiService } from "../services/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { LoadingController, AlertController, IonSelect } from '@ionic/angular';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})


export class Tab1Page implements OnInit {
  locates: any = null;
  locatesFiltred: any = null;

  interfaceOptions: any = {
    header: 'Ordenar por',
  };
  
  @ViewChild('selectOrdenar',null) select : IonSelect;

  constructor(
    private storage: StorageService,
    private api: ApiService,
    private router: Router,
    private alert: AlertController,
    private loading: LoadingController) { }
    
  
  doRefresh(event) {
    this.getInit()
    event.target.complete();
  }

  ngOnInit() {
    this.getInit()
  }

  getInit(){
    let load = this.loading.create({
      message: "Atualizando Dados..."
    })

    load.then((a) => a.present())

    this.api.getBrazil()
      .then((resp: any) => {
        resp.then(() => {
          this.getLocates()
          load.then((a) => a.dismiss())
        })
      })
      .catch(() => {
        this.getLocates()
        load.then((a) => a.dismiss())
      })
  }

  getLocates() {
    this.storage.get('brazil')
      .then((storage) => {
        if(storage != null){
          this.locates = storage
          this.locatesFiltred = storage.regiao
        }else{
          this.alert.create({
            header: "Atenção",
            message: "Verifique sua conexão com a Internet"
          }).then(a=> a.present())
        }
      })
  }

  clearLocates() {
    this.locatesFiltred = null;
    this.getLocates()
  }

  searchLocates(ev: any) {
    if (ev.target.value != '') {
      let locates = []
      this.locatesFiltred.forEach((locate) => {
        if (this.removeAcentos(locate.properties.estado_geo).toString().toLowerCase().indexOf(this.removeAcentos(ev.target.value).toString().toLowerCase()) > -1
          ||
          (
            locate.properties.hasOwnProperty('regiao') &&
            this.removeAcentos(locate.properties.regiao).toString().toLowerCase().indexOf(this.removeAcentos(ev.target.value).toString().toLowerCase()) > -1
          )) {
          locates.push(locate)
        }
      })

      if (locates.length > 0)
        this.locatesFiltred = locates
      else
        this.locatesFiltred = this.locates.regiao

    } else {
      this.locatesFiltred = this.locates.regiao
    }
  }

  removeAcentos(string) {
    var map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };
    return string.replace(/[\W\[\] ]/g, function (a) { return map[a] || a })
  }

  openDetails(locate) {
    let navigation: NavigationExtras = {
      state: {
        locate: locate
      }
    }
    this.router.navigateByUrl('detail/brazil', navigation)
  }

  openSelectOrdenar()
  {
    this.select.open();
  }  

  sortData(event: any)
  {
    const index = event.target.value.split("-")[0]
    const order = event.target.value.split("-")[1]

    this.locatesFiltred.sort(function(a,b) {
      if(order == "crescente"){
        if (a.properties[index] < b.properties[index]) { return -1 }
        if (a.properties[index] > b.properties[index]) { return 1 }
      }else{
        if (a.properties[index] < b.properties[index]) { return 1 }
        if (a.properties[index] > b.properties[index]) { return -1 }          
      }
    })

    this.locatesFiltred.forEach(regiao => {
      regiao.estados.sort((a,b)=> {
        if(order == "crescente"){
          if (a.properties[index] < b.properties[index]) { return -1 }
          if (a.properties[index] > b.properties[index]) { return 1 }
        }else{
          if (a.properties[index] < b.properties[index]) { return 1 }
          if (a.properties[index] > b.properties[index]) { return -1 }          
        }        
      })
    });
  }
}
