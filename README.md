
# Installing User-Specific DDPRateLimiter Methods Within Meteor For Cypress Testing

## Background

Meteor has built in methods which limit the frequency of method and subscription calls. The built in functions are there to protetect the site framework from attacks as common as simple password-checking script.

The default rule which limit login attempts, new user creation, and password resetsto 5 attempts every 10 seconds per connection, 
can be removed and replaced. During an automated testing which includes multiple log ins or user creations, this function can 'freeze' the test or return the test as fail.

To explore and solve this issue, we create a simple meteor app with a cypressTest and test the DDPRateLimiter functions with the goal of allowing certain users to break the default limit for testing purposes while the rule remains intact for other users and connections.

## Design

The Meteor App is from Meteor's own tutorial:
A simple todo list where users can sign up and type into a list.
https://www.meteor.com/tutorials/blaze/creating-an-app
Then Cypress was installed into the meteor app.

We call the methods to remove rate limiting rules from the client side when the user logged in has the username 'superUser".
MeteorDDP/imports/ui/body.js
```javascript
Tracker.autorun(function(){
	if (Meteor.user()){
		if((Meteor.user().username == 'superUser')){
		Meteor.call('removeDDP')
		}
		else{
		Meteor.call('resetDDP')
		}
	}
})
```
The methods to remove and edit the DDPRateLimit rule exist on the server side.
 /MeteorDDP/server/main.js
```javascript
if(Meteor.isServer) {
	var  allowLogIn= {
	type:  'method',
	name:  'login'
	}
	arrayrule = []
	Meteor.methods({
	//Once the default rate limit is removed, it can not be restored
	// A new rule is added in it's place
	removeDDP: function () {
		//remove default limit
		Accounts.removeDefaultRateLimit();
		//remove any new limit
		for (var  i =0 ; i < arrayrule.length;i++){
		DDPRateLimiter.removeRule(arrayrule[i])
		}
		arrayrule = []
	},
	resetDDP: function () {
		//Id is produced when calling the addRule function
		newrule = DDPRateLimiter.addRule(allowLogIn, 1, 6000);
		arrayrule.push(newrule)
	}
});
}
```
Note that once the default rate limit for the connection is removed by Accounts.removeDefaultRateLimit(), there is no function to restore it, so we add our own rules to limit all normal users in case the default rule has been removed.

When adapting to software, you would write a function that would turn on the method call only during testing.  
/MeteorDDP/imports/ui/body.js

## Installing
- Clone repo
- In the parent folder MeteorDDP/
	- install node_module: npm install npm 
	- install all cypress dependency: npm install
- In the cypress/e2e/ folder
	- install node_module: npm install npm 

## Run Cypress Tests Through This Command
- In MeteorDDP/cypress/e2e
	- start meteor server : meteor
	- run the following command : npm run cypress:open:dev
This command is set to test your localhost:3000/ and  is configurable in  the cypress/e2e/cypress/config/dev.json

# Results
### Test in Gherkin Syntax

- MeteorDDP/cypress/e2e/cypress/integration/meteor-ddp/meteor-ddp.feature

```ruby

Feature: Testing  DDP  Rate  Limiter on a Meteor  App
@e2e-test
#If any normal user logs in, he/she gets limited to one more log in for the next six seconds.
#The six seconds cover the time after the user logs in to
# once the user logs out, logs in, logs out,
#and then attempts to log in for the second time after the initial log in.

Scenario: Normal  User  Logs  In  Past  The  Limit

Given  I am at homepage
Given  There exists an account with 'normalUser', '123456'
Then  'normalUser' with pw '123456' logs in and logs out 3 times 'Fails'

#Test fails with a message from DDPRateLimit
```

The test fails as expected by the rate limiting rule that gets added on when signing as Normal User.

![Test Fails Due to DDP](https://i.ibb.co/DrgB8Cx/Screenshot-from-2020-03-30-01-38-12.png)

```ruby

Scenario: Super User Logs In Past The Limit

Given  I am at homepage
Given  There exists an account with 'superUser', '123456'
#Everytime superUser logs in, the MeteorApp calls a method in the server side to remove all login rules
Then  'superUser' with pw '123456' logs in and logs out 7 times 'Succeeds'

#Test Succeeds 
```

```ruby
Scenario: Super User Logs In Past The Limit
	  After Normal User User Logs In

Given  I am at homepage
When  'normalUser' with pw '123456' logs in and logs out 1 time ''
Then  'superUser' with pw '123456' logs in and logs out 5 times 'Succeeds'

#Test Succeeds
```
  

```ruby
Scenario: Normal  User  Logs  In After The Super User Logs In
	  Past The Limit 

	Given  I am at homepage
	When  'normalUser' with pw '123456' logs in and logs out 1 time ''
	And  'superUser' with pw '123456' logs in and logs out 5 times ''
	Then  'normalUser' with pw '123456' logs in and logs out 3 times 'Fails'
	#The test fails on Normal User Because of the new Rule
```
  

![Tes](https://i.ibb.co/jyys5Rt/Screenshot-from-2020-03-30-17-31-31.png)
