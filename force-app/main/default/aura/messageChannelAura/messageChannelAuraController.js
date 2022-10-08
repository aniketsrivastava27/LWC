({
    handleChanged: function(cmp, message, helper) {
        // Read the message argument to get the values in the message payload
    if (message != null && message.getParam("message") != null) {
        cmp.set("v.recordValue", message.getParam("message"));
    }
    }
})
