import { LightningElement, track,api,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import TODO_OBJECT from "@salesforce/schema/Todo_List__c";
import NAME_FIELD from "@salesforce/schema/Todo_List__c.name";
import ACCOUNTID_FIELD from "@salesforce/schema/Todo_List__c.Account__c";
import getTask from "@salesforce/apex/getToDoRecord.getTask";
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class ToDoApp extends LightningElement {

    task;
    @track listOfTasks = [];
    @track selectedTasks = [];
    values;
    index;
    @api recordId;
    taskExists;

    error;
    todoRecords;
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Todo_List__r',
        fields: ['Todo_List__c.Id','Todo_List__c.Name']
        
        
    })listInfo({ error, data }) {
        if (data) {
            this.todoRecords = data.records;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.todoRecords = undefined;
        }
        console.log(`Wire invoked with error ${JSON.stringify(this.error)} and records ${JSON.stringify(this.todoRecords)}`);
    }

    onChangeHandler(event) {

        this.task = event.target.value;

    }

    addTasksHandler() {
        getTask({accountId:this.recordId,task:this.task})
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

        });

        if (this.task != null && !this.listOfTasks.includes(this.task))
            this.listOfTasks.push(this.task);
        this.template.querySelector('lightning-input[data-name="task"]').value = null;
        this.task = null;
        console.log(this.listOfTasks);
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
        console.log("fields:" + JSON.stringify(fields));
        const recordInput = {apiName: TODO_OBJECT.objectApiName,fields};
        createRecord(recordInput).then(result=>{
            console.log('Record Inserted');
        }).catch(error=>{
            console.log('Error inserting record:'+JSON.stringify(error));
        })
    

    }
    resetTasksHandler() {
        this.listOfTasks = [];
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
        console.log('Selected Task:'+ this.selectedTasks + 'List of task:' + this.listOfTasks);
        this.listOfTasks = this.listOfTasks.filter((item) => !this.selectedTasks.includes(item));
        
        console.log(this.listOfTasks);
    }


}