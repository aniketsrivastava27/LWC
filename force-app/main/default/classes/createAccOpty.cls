public with sharing class createAccOpty {
    @AuraEnabled(cacheable=true)
    
      public static void createOpp(){
   
              Opportunity opp = new Opportunity();
              opp.name = 'Test Opty1';
              opp.CloseDate = Date.newInstance(2023, 12, 9);
              opp.StageName = 'Develop';
              //opp.AccountId = accId;
              insert opp;
              
          
      }
      
  }