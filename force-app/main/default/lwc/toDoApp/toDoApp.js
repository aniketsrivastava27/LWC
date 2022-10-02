import { LightningElement, track,api,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import TODO_OBJECT from "@salesforce/schema/Todo_List__c";
import NAME_FIELD from "@salesforce/schema/Todo_List__c.name";
import ACCOUNTID_FIELD from "@salesforce/schema/Todo_List__c.Account__c";
import getTask from "@salesforce/apex/getToDoRecord.getTask";
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import deleteRecords from "@salesforce/apex/deleteAllRecords.deleteRecords";
import deleteSelectedRecords from "@salesforce/apex/deleteSelectedItems.deleteSelectedRecords";

export default class ToDoApp extends LightningElement {

    task;
    @track listOfTasks = [];
    @track selectedTasks = [];
    values;
    index;
    @api recordId;
    taskExists;
    testArray = [];

    error;
    @track todoRecords = [];
    @track clonedToRecords = [];
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Todo_List__r',
        fields: ['Todo_List__c.Id','Todo_List__c.Name','Todo_List__c.isCompleted__c']
        
        
    })listInfo({ error, data }) {
        if (data) {
            this.todoRecords = data.records;
            this.error = undefined;
            this.clonedToRecords = JSON.parse(JSON.stringify(this.todoRecords));// This has to be done as getRelatedListRecords returns immutable list of arrays and notyhing can be pushed further to it
            console.log(`Wire invoked with records ${JSON.stringify(this.clonedToRecords)}`);
            //console.log(`Typeof data : ${typeof(data)} and typeof records: ${typeof(data.records)}`);
        } else if (error) {
            this.error = error;
            this.todoRecords = undefined;
        }
        //console.log(`Wire invoked with error ${JSON.stringify(this.error)} and records ${JSON.stringify(this.todoRecords[0])}`);
        
    }

    onChangeHandler(event) {

        this.task = event.target.value;

    }

    addTasksHandler() {
        /*getTask({accountId:this.recordId,task:this.task})
        .then(result=>{
            if(result == true){
                console.log('Task already exist');
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant : 'error',
                    message: 'An inprogress task already exists with this name',
                    
                });
                this.dispatchEvent(event);
                return;
            }

        })
        .catch(error=>{

        });*/

        if (this.task != null && !this.listOfTasks.includes(this.task))
            this.listOfTasks.push(this.task);
        this.template.querySelector('lightning-input[data-name="task"]').value = null;
        this.task = null;
       // console.log(this.listOfTasks);
       /* const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.listOfTasks[this.listOfTasks.length-1];
        fields[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
        console.log("fields:" + JSON.stringify(fields));*/
        /*var fields = {'Name' : this.listOfTasks[this.listOfTasks.length-1], 
                      'Account__c':this.recordId};
        //let recordInput = {apiName: TODO_OBJECT.objectApiName,fields};
        let recordInput = {'apiName': 'Todo_List__c',fields};*/
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.listOfTasks[this.listOfTasks.length-1];
        fields[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
        //console.log("fields:" + JSON.stringify(fields));
        const recordInput = {apiName: TODO_OBJECT.objectApiName,fields};
        createRecord(recordInput).then(result=>{

        const obj = {
            /* "apiName": "Todo_List__c",
            "childRelationships": {
              
            }, */
            "fields": {
              "Id": {
                "displayValue": null,
                "value": "a035i000004ZD1yAAG"
              },
              "Name": {
                "displayValue": null,
                "value": this.listOfTasks[this.listOfTasks.length-1]
              },
              "isCompleted__c": {
                "displayValue": null,
                "value": false
              }
            },
           /*  "id": "a035i000004ZD1yAAG",
            "lastModifiedById": "0055i000005Rr7wAAC",
            "lastModifiedDate": "2022-10-01T12:12:03.000Z",
            "recordTypeId": "012000000000000AAA",
            "recordTypeInfo": null,
            "systemModstamp": "2022-10-01T12:12:03.000Z" */
          };
          
          console.log(`Custom object :: ${JSON.stringify(obj)}`);
          //this.testArray.push(obj);
          //console.log(`Object Pushed to array ${JSON.stringify(this.testArray)} having typeof as ${typeof(this.testArray)}`);
          //console.log(`Todo Records : ${JSON.stringify(this.todoRecords)}`);
          try{
          this.clonedToRecords.push(obj);
          }
          catch(error){
            console.log(`Error while pushing ${error.message}`);
          }
          console.log(`Object Pushed to array ${JSON.stringify(this.clonedToRecords)} having typeof as ${typeof(this.clonedToRecords)}`);
        
            
            
            //this.todoRecords.fields.name.value = this.listOfTasks[this.listOfTasks.length-1];
            //this.todoRecords.fields.isCompleted__c.value = false;
            //console.log("TodoRecord::" + this.todoRecords.fields.name.value);
            console.log(`Rercord created with id ${result.id}`);
            //this.todoRecords.push(obj);
            //console.log(`Todo Records : ${JSON.stringify(this.todoRecords)} and task : ${this.listOfTasks} typeof: ${typeof(this.todoRecords)}`);
            
            //window.location.reload();
        }).catch(error=>{
            console.log('Error inserting record:'+JSON.stringify(error));
        })
    

    }
    resetTasksHandler() {
        this.clonedToRecords = [];
        deleteRecords({accId:this.recordId})
        .then((result) => {
            console.log("Records Deleted Successfully");
        })
        .catch((error) => {
            console.log("Error deleting record");
        });
        
    }

    addSelectedHandler(event) {
        this.Values =  event.target.value;
        if (event.target.checked) {
            this.selectedTasks.push(event.target.value);
            
        }
        else{
            this.index = this.selectedTasks.indexOf(this.Values);
            this.selectedTasks.splice(this.index, 1);

        }
        //console.log(this.selectedTasks);


    }
    deleteTasksHandler(){
        console.log('Selected Task:'+ this.selectedTasks);
        console.log(`Records before deleting ::  ${JSON.stringify(this.clonedToRecords)}`);
       // this.listOfTasks = this.listOfTasks.filter((item) => !this.selectedTasks.includes(item));
       try{ 
       this.clonedToRecords = this.clonedToRecords.filter((item) => !this.selectedTasks.includes(item.fields.Name.value) );
       }
       catch(error){
        console.log(`Error while deleting ::  ${error.message}`);
      }
        
        console.log(`Remaining records ::  ${JSON.stringify(this.clonedToRecords)}`);
        deleteSelectedRecords({todoNames:this.selectedTasks})
        .then((result) => {
            console.log("Records Deleted Successfully");
        })
        .catch((error) => {
            console.log("Error deleting record");
        });
    }


}