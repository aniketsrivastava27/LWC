import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    carTypeId;
    
    carTypeSelectHandler(event){
        this.carTypeId = event.detail;
    }
}