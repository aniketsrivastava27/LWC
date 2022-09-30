public with sharing class getToDoRecord {
    @AuraEnabled(cacheable=true)
    public static boolean getTask(Id accountId,String task){
        List<Todo_List__c> inProgressTask;
            inProgressTask = [SELECT id,name from Todo_List__c where Account__c = :accountId AND Status__c = 'In Progress' AND name = :task];
            if(inProgressTask!=null && inProgressTask.size()>0){
                return true;
            }
            else {
                return false;
            }
    }
    
}
