public with sharing class carSearchFormController {
    @AuraEnabled(cacheable=true)
    public static list<car_type__c> getCarTypes(){
        return [SELECT id,name from car_type__c];
    }
}
