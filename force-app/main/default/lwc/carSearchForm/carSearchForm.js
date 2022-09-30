import { LightningElement ,wire} from 'lwc';
import getCarTypes from '@salesforce/apex/carSearchFormController.getCarTypes';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
    carTypes;
    @wire(getCarTypes)
    wiredCarType({data,error}){
        if(data){
            this.carTypes = [{value:'',label:'All Types'}];
            data.forEach(element =>{
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            })
            console.log("cartypes::" + this.carTypes);
            
        }else if(error){
            this.showToast('ERROR',error.body.message,'error');
        }

    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    createNewCarType(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName : 'Car_Type__c',
                actionName : 'new'
            }
        });
    }

    handlerCarTypeChange(event){
        const carTypeId = event.detail.value;

        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail : carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }



}