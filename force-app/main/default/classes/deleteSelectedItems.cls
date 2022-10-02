public with sharing class deleteSelectedItems {
    @AuraEnabled
    public static String deleteSelectedRecords(List<String> todoNames){
        try {

            delete [SELECT id from Todo_List__c where name IN :todoNames];
            return 'true';

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
