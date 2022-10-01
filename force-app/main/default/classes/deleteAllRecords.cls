public with sharing class deleteAllRecords {
    @AuraEnabled
    public static boolean deleteRecords(String accId){
 

        List<Todo_List__c> recordsToDelete = [SELECT Id from Todo_List__c where Account__c = :accId];
        delete recordsToDelete;
        return true;
      
    
}
    
}
