Feature: Testing DDP Rate Limiter on a Meteor App
  
  @e2e-test

  #If any normal user logs in, he/she gets limited to one more log in for the next six seconds. 
  #The six seconds cover the time after the user logs in to once the user logs out, logs in, logs out, 
  #and then attempts to log in for the second time after the first log in. 

  Scenario: Normal User Logs In Past the Limit 
    Given I am at homepage
    Given There exists an account with 'normalUser', '123456'
    Then 'normalUser' with pw '123456' logs in and logs out 3 times 'Fails'
    #Test fails with a message from DDPRateLimit 

Scenario: Normal User Logs In Past The Limit After The Super User Logs In  
    Given I am at homepage
    When 'normalUser' with pw '123456' logs in and logs out 1 times ''
    And 'superUser' with pw '123456' logs in and logs out 5 times ''
    Then 'normalUser' with pw '123456' logs in and logs out 3 times 'Fails'
    #test should fail
