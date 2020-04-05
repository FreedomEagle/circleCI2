Feature: Testing DDP Rate Limiter on a Meteor App
  
  @e2e-test

  #If any normal user logs in, he/she gets limited to one more log in for the next six seconds. 
  #The six seconds cover the time after the user logs in to once the user logs out, logs in, logs out, 
  #and then attempts to log in for the second time after the first log in. 

 Scenario: Super User Logs In Past The Limit After Normal User User Logs In
    Given I am at homepage
    Given There exists an account with 'superUser', '123456'
    #everytime superUser logs in, the MeteorApp client calls to the serverside to removes all login rules 
    # /simple-todos/imports/ui/body.js   ->  /simple-todos/server/body.js
    Then 'superUser' with pw '123456' logs in and logs out 7 times 'Succeeds'
    
Scenario: Super User Logs In Past The Limit After Normal User Logs In
    Given I am at homepage
    When 'normalUser' with pw '123456' logs in and logs out 1 times 'Succeeds'
    Then 'superUser' with pw '123456' logs in and logs out 5 times 'Succeeds'


