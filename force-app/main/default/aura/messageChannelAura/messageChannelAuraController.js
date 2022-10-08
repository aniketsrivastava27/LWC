({
    init : function(cmp, event, helper) {
//var navService = cmp.find("navService");
        // Sets the route to /lightning/o/Account/home
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home'
            }
        };
        cmp.set("v.pageReference", pageReference);
        console.log(`Page reference :: ${cmp.get("v.pageReference")}`);
    },
    handleChanged: function(cmp, message, helper) {
        // Read the message argument to get the values in the message payload
    if (message != null && message.getParam("message") != null) {
        //cmp.set("v.recordValue", message.getParam("message"));
        var navService = cmp.find("navService");
        // Uses the pageReference definition in the init handler
        var pageReference = cmp.get("v.pageReference");
        message.preventDefault();
        navService.navigate(pageReference);
    }
    },
    handleClick: function(cmp, event, helper) {
        var navService = cmp.find("navService");
        // Uses the pageReference definition in the init handler
        var pageReference = cmp.get("v.pageReference");
        event.preventDefault();
        navService.navigate(pageReference);
    }
})
