import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public BASE_URL = "https://api-corona-virus.herokuapp.com/";

  constructor(private http: HttpClient, private storage: StorageService) { }

  getAllData() {
    return new Promise(resolve => {
      this.getBrazil()
        .finally(() => {
          this.getWorld()
            .finally(() => {
              resolve(true)
            })
        })
    })
  }

  getBrazil() {
    return new Promise(resolve => {
      this.http.get(this.BASE_URL + "api/data/brazil")
        .subscribe(
          (data: any) => {

            let organizate = []
            let state = []

            let brasilcasosconfirmados = 0
            let brasilcasosdescartados = 0
            let brasilcasossuspeitos = 0
            let brasilobitos = 0            

            data.forEach(e => {
              if (e.properties.local == "-") {
                state.sort(function (a, b) {
                  if (a.properties.estado_geo < b.properties.estado_geo) { return -1 }
                  if (a.properties.estado_geo > b.properties.estado_geo) { return 1 }
                })                

                //correçao de calculo da api para casos confirmados por regiao
                let casosconfirmados = 0
                let casosdescartados = 0
                let casossuspeitos = 0
                let obitos = 0
                let flip:boolean = false

                state.forEach(s => {
                  casosconfirmados += s.properties.casosconfirmados
                  casosdescartados += s.properties.casosdescartados
                  casossuspeitos += s.properties.casossuspeitos
                  obitos += s.properties.obitos

                  brasilcasosconfirmados += s.properties.casosconfirmados
                  brasilcasosdescartados += s.properties.casosdescartados
                  brasilcasossuspeitos += s.properties.casossuspeitos
                  brasilobitos += s.properties.obitos
                  
                  flip = (flip) ? false:true;
                  s.properties.flip = flip

                })

                //aplicando a Correcao
                e.properties.casosconfirmados = casosconfirmados
                e.properties.casosdescartados = casosdescartados
                e.properties.casossuspeitos = casossuspeitos
                e.properties.obitos = obitos                

                //digo que essa regiao tem esses estados
                e.estados = state
    
                if(e.properties.estado_geo != "Brasil")
                  organizate.push(e)

                state = []
              } else {
                state.push(e)
              }
            });

            let response = {
              geral: {
                casosconfirmados:brasilcasosconfirmados,
                casosdescartados:brasilcasosdescartados,
                casossuspeitos:brasilcasossuspeitos,
                obitos:brasilobitos
              },
              regiao: organizate
            }
            console.log(response)
            resolve(this.storage.set("brazil", response))
          },
          (err) => {
            resolve(false)
          }
        )
    })
  }

  getWorld() {
    return new Promise(resolve => {
      this.http.get(this.BASE_URL + "api/data/world")
        .subscribe(
          (data: any) => {


            data.forEach(e => {
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Afghanistan").toLowerCase()) > -1) e.attributes.Country_Initials = 'AF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Albania").toLowerCase()) > -1) e.attributes.Country_Initials = 'AL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Algeria").toLowerCase()) > -1) e.attributes.Country_Initials = 'DZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("American Samoa").toLowerCase()) > -1) e.attributes.Country_Initials = 'AS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Andorra").toLowerCase()) > -1) e.attributes.Country_Initials = 'AD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Angola").toLowerCase()) > -1) e.attributes.Country_Initials = 'AO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Anguilla").toLowerCase()) > -1) e.attributes.Country_Initials = 'AI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Antarctica").toLowerCase()) > -1) e.attributes.Country_Initials = 'AQ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Antigua and Barbuda").toLowerCase()) > -1) e.attributes.Country_Initials = 'AG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Argentina").toLowerCase()) > -1) e.attributes.Country_Initials = 'AR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Armenia").toLowerCase()) > -1) e.attributes.Country_Initials = 'AM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Aruba").toLowerCase()) > -1) e.attributes.Country_Initials = 'AW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Australia").toLowerCase()) > -1) e.attributes.Country_Initials = 'AU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Austria").toLowerCase()) > -1) e.attributes.Country_Initials = 'AT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Azerbaijan").toLowerCase()) > -1) e.attributes.Country_Initials = 'AZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bahamas").toLowerCase()) > -1) e.attributes.Country_Initials = 'BS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bahrain").toLowerCase()) > -1) e.attributes.Country_Initials = 'BH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bangladesh").toLowerCase()) > -1) e.attributes.Country_Initials = 'BD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Barbados").toLowerCase()) > -1) e.attributes.Country_Initials = 'BB'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Belarus").toLowerCase()) > -1) e.attributes.Country_Initials = 'BY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Belgium").toLowerCase()) > -1) e.attributes.Country_Initials = 'BE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Belize").toLowerCase()) > -1) e.attributes.Country_Initials = 'BZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Benin").toLowerCase()) > -1) e.attributes.Country_Initials = 'BJ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bermuda").toLowerCase()) > -1) e.attributes.Country_Initials = 'BM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bhutan").toLowerCase()) > -1) e.attributes.Country_Initials = 'BT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bolivia").toLowerCase()) > -1) e.attributes.Country_Initials = 'BO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bonaire").toLowerCase()) > -1) e.attributes.Country_Initials = 'BQ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bosnia and Herzegovina").toLowerCase()) > -1) e.attributes.Country_Initials = 'BA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Botswana").toLowerCase()) > -1) e.attributes.Country_Initials = 'BW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bouvet Island").toLowerCase()) > -1) e.attributes.Country_Initials = 'BV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Brazil").toLowerCase()) > -1) e.attributes.Country_Initials = 'BR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("British Indian Ocean Territory").toLowerCase()) > -1) e.attributes.Country_Initials = 'IO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Brunei").toLowerCase()) > -1) e.attributes.Country_Initials = 'BN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Bulgaria").toLowerCase()) > -1) e.attributes.Country_Initials = 'BG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Burkina Faso").toLowerCase()) > -1) e.attributes.Country_Initials = 'BF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Burundi").toLowerCase()) > -1) e.attributes.Country_Initials = 'BI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cambodia").toLowerCase()) > -1) e.attributes.Country_Initials = 'KH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cameroon").toLowerCase()) > -1) e.attributes.Country_Initials = 'CM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Canada").toLowerCase()) > -1) e.attributes.Country_Initials = 'CA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cabo Verde").toLowerCase()) > -1) e.attributes.Country_Initials = 'CV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cayman Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'KY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Central African Republic").toLowerCase()) > -1) e.attributes.Country_Initials = 'CF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Chad").toLowerCase()) > -1) e.attributes.Country_Initials = 'TD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Chile").toLowerCase()) > -1) e.attributes.Country_Initials = 'CL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("China").toLowerCase()) > -1) e.attributes.Country_Initials = 'CN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Christmas Island").toLowerCase()) > -1) e.attributes.Country_Initials = 'CX'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cocos (Keeling) Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'CC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Colombia").toLowerCase()) > -1) e.attributes.Country_Initials = 'CO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Comoros").toLowerCase()) > -1) e.attributes.Country_Initials = 'KM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Congo").toLowerCase()) > -1) e.attributes.Country_Initials = 'CG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Democratic Republic of the Congo").toLowerCase()) > -1) e.attributes.Country_Initials = 'CD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cook Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'CK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Costa Rica").toLowerCase()) > -1) e.attributes.Country_Initials = 'CR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Croatia").toLowerCase()) > -1) e.attributes.Country_Initials = 'HR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cuba").toLowerCase()) > -1) e.attributes.Country_Initials = 'CU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Curacao").toLowerCase()) > -1) e.attributes.Country_Initials = 'CW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cyprus").toLowerCase()) > -1) e.attributes.Country_Initials = 'CY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Czechia").toLowerCase()) > -1) e.attributes.Country_Initials = 'CZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Cote d'Ivoire").toLowerCase()) > -1) e.attributes.Country_Initials = 'CI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Denmark").toLowerCase()) > -1) e.attributes.Country_Initials = 'DK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Djibouti").toLowerCase()) > -1) e.attributes.Country_Initials = 'DJ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Dominica").toLowerCase()) > -1) e.attributes.Country_Initials = 'DM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Dominican Republic").toLowerCase()) > -1) e.attributes.Country_Initials = 'DO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Ecuador").toLowerCase()) > -1) e.attributes.Country_Initials = 'EC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Egypt").toLowerCase()) > -1) e.attributes.Country_Initials = 'EG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("El Salvador").toLowerCase()) > -1) e.attributes.Country_Initials = 'SV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Equatorial Guinea").toLowerCase()) > -1) e.attributes.Country_Initials = 'GQ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Eritrea").toLowerCase()) > -1) e.attributes.Country_Initials = 'ER'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Estonia").toLowerCase()) > -1) e.attributes.Country_Initials = 'EE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Ethiopia").toLowerCase()) > -1) e.attributes.Country_Initials = 'ET'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Falkland Islands (Malvinas)").toLowerCase()) > -1) e.attributes.Country_Initials = 'FK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Faroe Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'FO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Fiji").toLowerCase()) > -1) e.attributes.Country_Initials = 'FJ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Finland").toLowerCase()) > -1) e.attributes.Country_Initials = 'FI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("France").toLowerCase()) > -1) e.attributes.Country_Initials = 'FR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("French Guiana").toLowerCase()) > -1) e.attributes.Country_Initials = 'GF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("French Polynesia").toLowerCase()) > -1) e.attributes.Country_Initials = 'PF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("French Southern Territories").toLowerCase()) > -1) e.attributes.Country_Initials = 'TF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Gabon").toLowerCase()) > -1) e.attributes.Country_Initials = 'GA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Gambia").toLowerCase()) > -1) e.attributes.Country_Initials = 'GM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Georgia").toLowerCase()) > -1) e.attributes.Country_Initials = 'GE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Germany").toLowerCase()) > -1) e.attributes.Country_Initials = 'DE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Ghana").toLowerCase()) > -1) e.attributes.Country_Initials = 'GH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Gibraltar").toLowerCase()) > -1) e.attributes.Country_Initials = 'GI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Greece").toLowerCase()) > -1) e.attributes.Country_Initials = 'GR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Greenland").toLowerCase()) > -1) e.attributes.Country_Initials = 'GL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Grenada").toLowerCase()) > -1) e.attributes.Country_Initials = 'GD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guadeloupe").toLowerCase()) > -1) e.attributes.Country_Initials = 'GP'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guam").toLowerCase()) > -1) e.attributes.Country_Initials = 'GU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guatemala").toLowerCase()) > -1) e.attributes.Country_Initials = 'GT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guernsey").toLowerCase()) > -1) e.attributes.Country_Initials = 'GG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guinea").toLowerCase()) > -1) e.attributes.Country_Initials = 'GN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guinea-Bissau").toLowerCase()) > -1) e.attributes.Country_Initials = 'GW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Guyana").toLowerCase()) > -1) e.attributes.Country_Initials = 'GY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Haiti").toLowerCase()) > -1) e.attributes.Country_Initials = 'HT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Heard Island and McDonald Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'HM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Holy See").toLowerCase()) > -1) e.attributes.Country_Initials = 'VA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Honduras").toLowerCase()) > -1) e.attributes.Country_Initials = 'HN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Hong Kong").toLowerCase()) > -1) e.attributes.Country_Initials = 'HK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Hungary").toLowerCase()) > -1) e.attributes.Country_Initials = 'HU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Iceland").toLowerCase()) > -1) e.attributes.Country_Initials = 'IS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("India").toLowerCase()) > -1) e.attributes.Country_Initials = 'IN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Indonesia").toLowerCase()) > -1) e.attributes.Country_Initials = 'ID'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Iran").toLowerCase()) > -1) e.attributes.Country_Initials = 'IR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Iraq").toLowerCase()) > -1) e.attributes.Country_Initials = 'IQ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Ireland").toLowerCase()) > -1) e.attributes.Country_Initials = 'IE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Isle of Man").toLowerCase()) > -1) e.attributes.Country_Initials = 'IM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Israel").toLowerCase()) > -1) e.attributes.Country_Initials = 'IL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Italy").toLowerCase()) > -1) e.attributes.Country_Initials = 'IT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Jamaica").toLowerCase()) > -1) e.attributes.Country_Initials = 'JM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Japan").toLowerCase()) > -1) e.attributes.Country_Initials = 'JP'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Jersey").toLowerCase()) > -1) e.attributes.Country_Initials = 'JE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Jordan").toLowerCase()) > -1) e.attributes.Country_Initials = 'JO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Kazakhstan").toLowerCase()) > -1) e.attributes.Country_Initials = 'KZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Kenya").toLowerCase()) > -1) e.attributes.Country_Initials = 'KE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Kiribati").toLowerCase()) > -1) e.attributes.Country_Initials = 'KI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Korea, North").toLowerCase()) > -1) e.attributes.Country_Initials = 'KP'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Korea, South").toLowerCase()) > -1) e.attributes.Country_Initials = 'KR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Kuwait").toLowerCase()) > -1) e.attributes.Country_Initials = 'KW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Kyrgyzstan").toLowerCase()) > -1) e.attributes.Country_Initials = 'KG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Lao People's Democratic Republic").toLowerCase()) > -1) e.attributes.Country_Initials = 'LA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Latvia").toLowerCase()) > -1) e.attributes.Country_Initials = 'LV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Lebanon").toLowerCase()) > -1) e.attributes.Country_Initials = 'LB'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Lesotho").toLowerCase()) > -1) e.attributes.Country_Initials = 'LS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Liberia").toLowerCase()) > -1) e.attributes.Country_Initials = 'LR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Libya").toLowerCase()) > -1) e.attributes.Country_Initials = 'LY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Liechtenstein").toLowerCase()) > -1) e.attributes.Country_Initials = 'LI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Lithuania").toLowerCase()) > -1) e.attributes.Country_Initials = 'LT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Luxembourg").toLowerCase()) > -1) e.attributes.Country_Initials = 'LU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Macao").toLowerCase()) > -1) e.attributes.Country_Initials = 'MO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Macedonia").toLowerCase()) > -1) e.attributes.Country_Initials = 'MK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Madagascar").toLowerCase()) > -1) e.attributes.Country_Initials = 'MG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Malawi").toLowerCase()) > -1) e.attributes.Country_Initials = 'MW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Malaysia").toLowerCase()) > -1) e.attributes.Country_Initials = 'MY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Maldives").toLowerCase()) > -1) e.attributes.Country_Initials = 'MV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mali").toLowerCase()) > -1) e.attributes.Country_Initials = 'ML'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Malta").toLowerCase()) > -1) e.attributes.Country_Initials = 'MT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Marshall Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'MH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Martinique").toLowerCase()) > -1) e.attributes.Country_Initials = 'MQ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mauritania").toLowerCase()) > -1) e.attributes.Country_Initials = 'MR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mauritius").toLowerCase()) > -1) e.attributes.Country_Initials = 'MU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mayotte").toLowerCase()) > -1) e.attributes.Country_Initials = 'YT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mexico").toLowerCase()) > -1) e.attributes.Country_Initials = 'MX'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Micronesia, Federated States of").toLowerCase()) > -1) e.attributes.Country_Initials = 'FM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Moldova").toLowerCase()) > -1) e.attributes.Country_Initials = 'MD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Monaco").toLowerCase()) > -1) e.attributes.Country_Initials = 'MC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mongolia").toLowerCase()) > -1) e.attributes.Country_Initials = 'MN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Montenegro").toLowerCase()) > -1) e.attributes.Country_Initials = 'ME'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Montserrat").toLowerCase()) > -1) e.attributes.Country_Initials = 'MS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Morocco").toLowerCase()) > -1) e.attributes.Country_Initials = 'MA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Mozambique").toLowerCase()) > -1) e.attributes.Country_Initials = 'MZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Myanmar").toLowerCase()) > -1) e.attributes.Country_Initials = 'MM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Namibia").toLowerCase()) > -1) e.attributes.Country_Initials = 'NA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Nauru").toLowerCase()) > -1) e.attributes.Country_Initials = 'NR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Nepal").toLowerCase()) > -1) e.attributes.Country_Initials = 'NP'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Netherlands").toLowerCase()) > -1) e.attributes.Country_Initials = 'NL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("New Caledonia").toLowerCase()) > -1) e.attributes.Country_Initials = 'NC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("New Zealand").toLowerCase()) > -1) e.attributes.Country_Initials = 'NZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Nicaragua").toLowerCase()) > -1) e.attributes.Country_Initials = 'NI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Niger").toLowerCase()) > -1) e.attributes.Country_Initials = 'NE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Nigeria").toLowerCase()) > -1) e.attributes.Country_Initials = 'NG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Niue").toLowerCase()) > -1) e.attributes.Country_Initials = 'NU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Norfolk Island").toLowerCase()) > -1) e.attributes.Country_Initials = 'NF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Northern Mariana Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'MP'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Norway").toLowerCase()) > -1) e.attributes.Country_Initials = 'NO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Oman").toLowerCase()) > -1) e.attributes.Country_Initials = 'OM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Pakistan").toLowerCase()) > -1) e.attributes.Country_Initials = 'PK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Palau").toLowerCase()) > -1) e.attributes.Country_Initials = 'PW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Palestine, State of").toLowerCase()) > -1) e.attributes.Country_Initials = 'PS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Panama").toLowerCase()) > -1) e.attributes.Country_Initials = 'PA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Papua New Guinea").toLowerCase()) > -1) e.attributes.Country_Initials = 'PG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Paraguay").toLowerCase()) > -1) e.attributes.Country_Initials = 'PY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Peru").toLowerCase()) > -1) e.attributes.Country_Initials = 'PE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Philippines").toLowerCase()) > -1) e.attributes.Country_Initials = 'PH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Pitcairn").toLowerCase()) > -1) e.attributes.Country_Initials = 'PN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Poland").toLowerCase()) > -1) e.attributes.Country_Initials = 'PL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Portugal").toLowerCase()) > -1) e.attributes.Country_Initials = 'PT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Puerto Rico").toLowerCase()) > -1) e.attributes.Country_Initials = 'PR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Qatar").toLowerCase()) > -1) e.attributes.Country_Initials = 'QA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Romania").toLowerCase()) > -1) e.attributes.Country_Initials = 'RO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Russia").toLowerCase()) > -1) e.attributes.Country_Initials = 'RU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Rwanda").toLowerCase()) > -1) e.attributes.Country_Initials = 'RW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Reunion").toLowerCase()) > -1) e.attributes.Country_Initials = 'RE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Barthelemy").toLowerCase()) > -1) e.attributes.Country_Initials = 'BL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Helena").toLowerCase()) > -1) e.attributes.Country_Initials = 'SH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Kitts and Nevis").toLowerCase()) > -1) e.attributes.Country_Initials = 'KN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Lucia").toLowerCase()) > -1) e.attributes.Country_Initials = 'LC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Martin (French part)").toLowerCase()) > -1) e.attributes.Country_Initials = 'MF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Pierre and Miquelon").toLowerCase()) > -1) e.attributes.Country_Initials = 'PM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saint Vincent and the Grenadines").toLowerCase()) > -1) e.attributes.Country_Initials = 'VC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Samoa").toLowerCase()) > -1) e.attributes.Country_Initials = 'WS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("San Marino").toLowerCase()) > -1) e.attributes.Country_Initials = 'SM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sao Tome and Principe").toLowerCase()) > -1) e.attributes.Country_Initials = 'ST'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Saudi Arabia").toLowerCase()) > -1) e.attributes.Country_Initials = 'SA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Senegal").toLowerCase()) > -1) e.attributes.Country_Initials = 'SN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Serbia").toLowerCase()) > -1) e.attributes.Country_Initials = 'RS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Seychelles").toLowerCase()) > -1) e.attributes.Country_Initials = 'SC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sierra Leone").toLowerCase()) > -1) e.attributes.Country_Initials = 'SL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Singapore").toLowerCase()) > -1) e.attributes.Country_Initials = 'SG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sint Maarten (Dutch part)").toLowerCase()) > -1) e.attributes.Country_Initials = 'SX'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Slovakia").toLowerCase()) > -1) e.attributes.Country_Initials = 'SK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Slovenia").toLowerCase()) > -1) e.attributes.Country_Initials = 'SI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Solomon Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'SB'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Somalia").toLowerCase()) > -1) e.attributes.Country_Initials = 'SO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("South Africa").toLowerCase()) > -1) e.attributes.Country_Initials = 'ZA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("South Georgia and the South Sandwich Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'GS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("South Sudan").toLowerCase()) > -1) e.attributes.Country_Initials = 'SS'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Spain").toLowerCase()) > -1) e.attributes.Country_Initials = 'ES'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sri Lanka").toLowerCase()) > -1) e.attributes.Country_Initials = 'LK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sudan").toLowerCase()) > -1) e.attributes.Country_Initials = 'SD'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Suriname").toLowerCase()) > -1) e.attributes.Country_Initials = 'SR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Svalbard and Jan Mayen").toLowerCase()) > -1) e.attributes.Country_Initials = 'SJ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Eswatini").toLowerCase()) > -1) e.attributes.Country_Initials = 'SZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Sweden").toLowerCase()) > -1) e.attributes.Country_Initials = 'SE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Switzerland").toLowerCase()) > -1) e.attributes.Country_Initials = 'CH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Syrian Arab Republic").toLowerCase()) > -1) e.attributes.Country_Initials = 'SY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Taiwan").toLowerCase()) > -1) e.attributes.Country_Initials = 'TW'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tajikistan").toLowerCase()) > -1) e.attributes.Country_Initials = 'TJ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tanzania").toLowerCase()) > -1) e.attributes.Country_Initials = 'TZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Thailand").toLowerCase()) > -1) e.attributes.Country_Initials = 'TH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("East Timor").toLowerCase()) > -1) e.attributes.Country_Initials = 'TL'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Togo").toLowerCase()) > -1) e.attributes.Country_Initials = 'TG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tokelau").toLowerCase()) > -1) e.attributes.Country_Initials = 'TK'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tonga").toLowerCase()) > -1) e.attributes.Country_Initials = 'TO'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Trinidad and Tobago").toLowerCase()) > -1) e.attributes.Country_Initials = 'TT'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tunisia").toLowerCase()) > -1) e.attributes.Country_Initials = 'TN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Turkey").toLowerCase()) > -1) e.attributes.Country_Initials = 'TR'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Turkmenistan").toLowerCase()) > -1) e.attributes.Country_Initials = 'TM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Turks and Caicos Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'TC'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Tuvalu").toLowerCase()) > -1) e.attributes.Country_Initials = 'TV'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Uganda").toLowerCase()) > -1) e.attributes.Country_Initials = 'UG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Ukraine").toLowerCase()) > -1) e.attributes.Country_Initials = 'UA'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("United Arab Emirates").toLowerCase()) > -1) e.attributes.Country_Initials = 'AE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("United Kingdom").toLowerCase()) > -1) e.attributes.Country_Initials = 'GB'.toLowerCase()
              if(e.attributes.Country_Region == "US") e.attributes.Country_Initials = 'US'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("United States Minor Outlying Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'UM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Uruguay").toLowerCase()) > -1) e.attributes.Country_Initials = 'UY'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Uzbekistan").toLowerCase()) > -1) e.attributes.Country_Initials = 'UZ'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Vanuatu").toLowerCase()) > -1) e.attributes.Country_Initials = 'VU'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Venezuela").toLowerCase()) > -1) e.attributes.Country_Initials = 'VE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Vietnam").toLowerCase()) > -1) e.attributes.Country_Initials = 'VN'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("British Virgin Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'VG'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("US Virgin Islands").toLowerCase()) > -1) e.attributes.Country_Initials = 'VI'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Wallis and Futuna").toLowerCase()) > -1) e.attributes.Country_Initials = 'WF'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Western Sahara").toLowerCase()) > -1) e.attributes.Country_Initials = 'EH'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Yemen").toLowerCase()) > -1) e.attributes.Country_Initials = 'YE'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Zambia").toLowerCase()) > -1) e.attributes.Country_Initials = 'ZM'.toLowerCase()
              if(e.attributes.Country_Region.toLowerCase().indexOf(("Zimbabwe").toLowerCase()) > -1) e.attributes.Country_Initials = 'ZW'.toLowerCase()
              
            });

            data.sort(function (a, b) {
              if (a.attributes.Country_Region < b.attributes.Country_Region) { return -1 }
              if (a.attributes.Country_Region > b.attributes.Country_Region) { return 1 }
            })
            resolve(this.storage.set("world", data))
          },
          (err: any) => {
            resolve(false)
          }
        )
    })
  }

}