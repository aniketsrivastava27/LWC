import { LightningElement,api,track } from 'lwc';

export default class ToDoChild extends LightningElement {
    @api listOfTasks;
    values;
    index;
    @track selectedTasks=[];


    addSelectedHandler(event) {
        this.Values =  event.target.value;
        if (event.target.checked) {
            this.selectedTasks.push(event.target.value);
            
        }
        else{
            this.index = this.selectedTasks.indexOf(this.Values);
            this.selectedTasks.splice(this.index, 1);

        }
        console.log(this.selectedTasks);
        
        const newEvt = new CustomEvent('selected',{detail:this.selectedTasks});
        //const newEvt = new CustomEvent('selected',{detail:{value:this.Values,checked:event.target.checked}});
        this.dispatchEvent(newEvt);
        console.log('newEvt:'+newEvt);


    }
}