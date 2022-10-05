public with sharing class checkConstructorError {
    @InvocableMethod(label='Create Lead' description = 'Create Lead in External system')
    public static void createLead() {
        partnerSoapSforceCom.Soap soapObj = new partnerSoapSforceCom.Soap();
        partnerSoapSforceCom.LoginResult loginRes = soapObj.login('aniketsfdcintegration@gmail.com','Telstra@2vATIjIl7WmeteU1WDqezuZAVP');
        system.debug('loginRes::' + loginRes.sessionId);
        SoapLeadManager.SessionHeader_element sessionObj = new SoapLeadManager.SessionHeader_element();
        sessionObj.sessionId = loginRes.sessionId;
        SoapLeadManager.LeadManager lmService = new SoapLeadManager.LeadManager();
        lmService.SessionHeader = sessionObj;
        String response = lmService.createNewLead('Aniket123456','Srivastava1233','Telstra12323','aniketsrivastava27122@gmail.com','8737876765');
        system.debug('response::'+ response);

    }
}
