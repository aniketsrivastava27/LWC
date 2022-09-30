import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SampleCounter extends LightningElement {
    value =0;
    incHandler(){
        this.value++;
    }
    decHandler(){
        //alert(this.value);
        if(this.value==0){
            this.showNotification();
            this.value = 0;
            return;
        }
        this.value--;
    }
    resetHandler(){
        this.value = 0;
    }

    showNotification() {
        const evt = new ShowToastEvent({
            title: "Error",
            message: "Counter cannot be less than 0",
            variant: "error",
        });
        this.dispatchEvent(evt);
    }
}