import { LightningElement,track } from 'lwc';

export default class ToDoParent extends LightningElement {
    task;
    @track listOfTasks = [];
    @track selectedTasks = [];
    
    onChangeHandler(event) {

        this.task = event.target.value;

    }
    addTasksHandler() {
        if (this.task != null && !this.listOfTasks.includes(this.task))
            this.listOfTasks.push(this.task);
        this.template.querySelector('lightning-input[data-name="task"]').value = null;
        this.task = null;
        //console.log(this.listOfTasks);
    }
    resetTasksHandler() {
        this.listOfTasks = [];
    }

    /*selectTaskHandler(event){
        console.log("selected tasks passed to parent::" + event.detail.value+"::"+event.detail.checked);
        console.log("typeof1:"+typeof event.detail.value+"typeof2:"+event.detail.checked);
        console.log("leaving parent");
        if(event.detail.checked){
            this.selectedTasks.push(event.detail.value);
        }
        else{
            this.selectedTasks.splice(this.selectedTasks.indexOf(event.detail.value),1);
        }
        //selectedTasks = [...event.detail];
        console.log("selected tasks copied to parent::" + this.selectedTasks);

    }*/

    selectTaskHandler(event){
        
        this.selectedTasks = [...event.detail];
        console.log("selected tasks copied to parent::" + this.selectedTasks);

    }

    deleteTasksHandler(){
        console.log('Selected Task:'+ this.selectedTasks + 'List of task:' + this.listOfTasks);
        this.listOfTasks = this.listOfTasks.filter((item) => !this.selectedTasks.includes(item));
        
        console.log(this.listOfTasks);
    }
}