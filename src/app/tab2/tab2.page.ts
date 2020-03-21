import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { StorageService } from "../services/storage.service";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    locates: any = null;
    locatesFiltred: any = null;

    constructor(private storage: StorageService, private api: ApiService, private router: Router, private alert: AlertController) { }

    ngOnInit() {
        let atualizandoAlert = this.alert.create({
            backdropDismiss: false,
            message: "Atualizando Dados...",
            keyboardClose: false
        })

        atualizandoAlert.then((a) => a.present())

        this.api.getWorld()
        .finally(()=>{
            this.getLocates()
        })        

    }

    getLocates() {
        this.storage.get('world')
            .then((storage) => {
                this.locates = storage
                this.locatesFiltred = this.locates
                this.alert.dismiss()

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
                if (this.removeAcentos(locate.attributes.Country_Region).toString().toLowerCase().indexOf(this.removeAcentos(ev.target.value).toString().toLowerCase()) > -1
                    ||
                    (locate.attributes.Province_State != null && this.removeAcentos(locate.attributes.Province_State).toString().toLowerCase().indexOf(this.removeAcentos(ev.target.value).toString().toLowerCase()) > -1)
                ) {
                    locates.push(locate)
                }
            })

            if (locates.length > 0)
                this.locatesFiltred = locates
            else
                this.locatesFiltred = this.locates

        } else {
            this.locatesFiltred = this.locates
        }
    }

    removeAcentos(string) {
        var map = { "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C" };
        return string.replace(/[\W\[\] ]/g, function (a) { return map[a] || a })
    }

    openDetails(locate) {
        let navigation: NavigationExtras = {
            state: {
                locate: locate,
            }
        }
        this.router.navigateByUrl('detail/world', navigation)
    }
}
