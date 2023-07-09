import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  userForm: FormGroup;
  professions: any[]=[];
  specialities: any[]=[];
  countries: any[]=[];
  states: any[]=[];
  locations: any[]=[];
  showSpeciality: boolean;
  showCedula: boolean;

  constructor(private formBuilder: FormBuilder
    , private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      patern: ['', Validators.required],
      matern: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profession: [''],
      speciality: [''],
      cedula: [''],
      country: [''],
      state: [''],
      location: ['']
    });

    this.showSpeciality = false;
    this.showCedula = false;
  }

  ngOnInit() {
    this.loadProfessions();
    this.loadCountries();
  }

  loadProfessions() {
    const url = 'https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getProfessions';

    this.http.get<any>(url).subscribe(data => {
      console.log("profesiones",data.getProfessionsResult)
      this.professions = data.getProfessionsResult
      ;
    });
  }

  loadSpecialities(professionId: number) {
    const url = `https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getSpecialities?professionId=${professionId}`;

    this.http.get<any>(url).subscribe(data => {
      console.log("especialistas",data.getSpecialitiesResult)
      this.specialities = data.getSpecialitiesResult;

      if (this.specialities.length > 1) {
        this.showSpeciality = true;
      } else {
        this.showSpeciality = false;
      }

      this.userForm.get('speciality')!.setValidators(this.showSpeciality ? Validators.required : null);
      this.userForm.get('speciality')!.updateValueAndValidity();
    });
  }

  loadCountries() {
    const url = 'https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getCountries';

    this.http.get<any>(url).subscribe(data => {
      console.log("countires",data.getCountriesResult)
      this.countries = data.getCountriesResult
      ;
    });
  }

  loadStates(countryId: number) {
    const url = `https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getStateByCountry?countryId=${countryId}`;

    this.http.get<any>(url).subscribe(data => {
      console.log("states",data.getStateByCountryResult)
      this.states = data.getStateByCountryResult;
    });
  }

  loadLocations(stateId: number) {
    const url = `https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getLocationsByState?stateId=${stateId}`;

    this.http.get<any>(url).subscribe(data => {
      console.log("locations",data.getLocationsByStateResult)
      this.locations = data.getLocationsByStateResult;
    });
  }

  onProfessionChange() {
    const professionId = this.userForm.get('profession')!.value;
   console.log("profesionID",Number(professionId))
    if (Number(professionId) === 7) {
      this.showCedula = true;
      this.userForm.get('cedula')!.setValidators(Validators.required);
      console.log("if")
    } else {
      this.showCedula = false;
      this.userForm.get('cedula')!.clearValidators();
      console.log("else")

    }

    this.userForm.get('cedula')!.updateValueAndValidity();

    this.loadSpecialities(professionId);
  }

  onCountryChange() {
    const countryId = this.userForm.get('country')!.value;
 console.log("idCountry",countryId)
    this.loadStates(countryId);
  }

  onStateChange() {
    const stateId = this.userForm.get('state')!.value;

    this.loadLocations(stateId);
  }

  submitForm() {
    if (this.userForm.valid) {
      console.log('Datos ingresados/seleccionados:', this.userForm.value);
    } else {
      console.log('Por favor, completa todos los campos obligatorios correctamente.');
    }
  }
}
