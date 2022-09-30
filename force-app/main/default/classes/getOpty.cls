public with sharing class getOpty {
    @AuraEnabled(cacheable=true)
    
    public static list<opportunity> getOpp() {
        return [SELECT id,name from opportunity];

    }
}
