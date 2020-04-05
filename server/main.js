import '../imports/api/tasks.js';
import { DDPRateLimiter }   from 'meteor/ddp-rate-limiter';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
});

if(Meteor.isServer) {    
    var allowLogIn= {
        type: 'method',
        name: 'login'
    }
    arrayrule = []
    Meteor.methods({ 
    //Once the default rate limit is removed, it can not be restored 
    // A new rule is added in it's place
       removeDDP: function () {
        //remove default
        Accounts.removeDefaultRateLimit();
        //remove any new rules
        for (var i =0 ; i < arrayrule.length;i++){
            console.log('Removed DDP')
            console.log(DDPRateLimiter.removeRule(arrayrule[i]))
            DDPRateLimiter.removeRule(arrayrule[i])
        }
        arrayrule = []
        
       },
       resetDDP: function () {
        //Id is produced when calling the addRule function
        newrule = DDPRateLimiter.addRule(allowLogIn, 1, 6000);
        arrayrule.push(newrule)
        console.log('Reset DDP' + '')
       }
    });
 }
 
