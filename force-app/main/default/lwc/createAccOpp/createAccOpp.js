import { LightningElement,api,wire } from 'lwc';
import createOpp from '@salesforce/apex/createAccOpty.createOpp';
import fetchopty from '@salesforce/apex/getOpty.getOpp';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class CreateAccOpp extends NavigationMixin(LightningElement) {
    @api recordId;
    day = new Date(2018, 11, 24);
    createOpp(){
        console.log("Inside opty creation");
        var fields = {'Name' : 'Aniket1', 
                    'CloseDate':this.day,
                    'StageName':'Develop',
                    'AccountId':this.recordId};
        var objRecordInput = {'apiName' : 'Opportunity', fields};
        createRecord(objRecordInput).then(response=>{
            console.log('Opty created with id:'+response.id);
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: response.id,
                    actionName: 'view',
                },
            }).then((url) => {
                const event = new ShowToastEvent({
                    title: 'Hurrayyyy!!',
                    variant : 'success',
                    message: 'A new opportunity has been created. {1} to navigate',
                    messageData: [
                        'Salesforce',
                        {
                            url,
                            label: 'Click here',
                        },
                    ],
                });
                this.dispatchEvent(event);
            });
        }).catch(error=>{
            console.log('Error: ' +JSON.stringify(error));
        })


    }
    

}