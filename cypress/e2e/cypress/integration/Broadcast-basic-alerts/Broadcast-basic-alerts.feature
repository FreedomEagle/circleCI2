Feature: Broadcast basic alerts
# Each channel has a response agency                                  
# A channel can exist within a channel group or groups
# Multiple channels can belong to a channel group
# When a member of a channel group broadcasts an alert, the member can choose which channels to broadcast an alert to
# When members of a channel broadcasts an alert, the message travels within the channel and channel's parent group(s)

# General test writing guidelines
#   - shorter usually better
#   - write from perspective of Share911 Support Staff

  # Scenario: Voice Call Test
  #   Given Share911 is opened
  #   Given 'principal@share911.com' logs in
  #   And open 'Liberty HS' channels

  #   When I view the latest alert receiver for 'Liberty HS'
  #   Then voice calls to 'Bedford PD' should be completed
  #   And logs out

Scenario: A regular member of an isolated channel broadcasts a 'lockdown' alert to her channel  
    
    Given Share911 is opened
    Given 'principal.e2e@example.com' logs into 'Liberty HS' channel  
    And invites 'young.e2e@example.com' and inputs basic info
    And logs out

    When 'laura.e2e@example.com' logs back into 'Liberty HS' channel
    And broadcasts a 'Lockdown' alert for the 'Liberty HS' channel 
    And views the latest alert receiver for 'Liberty HS'
    
    Then everyone in the channel 'Liberty HS' should have received a text
    And voice calls to 'Bedford PD' should be completed
    And 'young.e2e@example.com', 'laura.e2e@example.com', and 'police.e2e@example.com' should receive a 'LOCKDOWN' alert message on their app for 'Liberty HS'
    
    Then 'principal.e2e@example.com' logs back into 'Liberty HS' channel
    And he also receives a 'LOCKDOWN' alert message on his app for 'Liberty HS'
    Then he clears event for 'Liberty HS'
    And removes 'young.e2e@example.com' from 'Liberty HS' channel

# Scenario: A member of a channel group broadcasts an 'evacuation' alert to a specific channel within the channel group

#   Given the following members belong to the 'Bedford Mall' channel group      
#       #   | firstname | lastname | email | mobile |type
#       #   | Manager | Tom | tom@share911.com |500-555-5550 | Admin
#       #   | Manager | Laura | laura@share911.com | 500-555-5551 | Regular
#   And this channel group has the type 'commercial_building' and the zip code '12345'

#   Given the channels 'Apple store' and the 'Orange Store' belong to the 'Bedford Mall' channel group
#   And the following members belongs to the 'Apple Store' channel
#       #   | firstname | lastname | email |p.w| mobile |
#       #   | Tenant | Green | mike@share911.com |'carrot horse'| 500-555-5552 | regular
#       #   | Tenant | New | new@share911.com |'carrot horse'| 500-555-5553 | Regular | To be made and removed before each test
#   And the following members belongs to the 'Orange Store' channel
#       #   | firstname | lastname | email |p.w.| mobile |
#       #   | Tenant | Rachel | rachel@share911.com |'carrot horse'| 500-555-5553 | regular

#   Given the response agency 'Bedford PD' that shares the same zipcode exists with the following officers:
#   # | firstname | lastname | email | mobile |
#   # | Officer | Yellow | yellow@share911.com | 500-444-5554 |
#   # | Officer | Black | black@share911.com | 500-444-5555 |
#   And  the 'Bedford PD' is registered to the 'Bedford Mall' channel group as its response agency     
  
#   Given the Manager Laura is authorized to broadcast alerts to the channel group 'Bedford Mall'           \

#   When the Manager Laura logs in 
#   And  broadcasts an 'Evacuate' alert to the 'Apple Store' within the 'Bedford Mall'

#   Then the managers in 'Bedford Mall' channel group gets alerted
#   And  the tenants in 'Apple store' channel gets alerted
#   And  the 'Bedford PD' and its officers are alerted
#   And  the tenants of 'Orange store' channel is not alerted
  

  

# Scenario: A member of a channel within a channel group broadcasts to his channel

#   Given the following members belong to 'Bedford Mall' channel group      
#       #  | firstname | lastname | email | mobile |type
#       #  | Manager | Tom | tom@share911.com | 500-555-5550 | Admin
#       #  | Manager | Laura | laura@share911.com | 500-555-5551 | Regular
#   And this channel group has the type 'commercial_building' and the zip code '12345'

#   Given the channels 'Apple store' and the 'Orange Store' belong to the 'Bedford Mall' channel group
#   And the following members belongs to the 'Apple Store' channel
#       #    | firstname | lastname | email | mobile |
#       #    | Tenant | Green | mike@share911.com | 500-555-5552 | regular
#       #  | Teacher | New | new@share911.com |'carrot horse'| 500-555-5553 | Regular | To be made and removed before each test
#   And the following members belongs to the 'Orange Store' channel
#       #  | firstname | lastname | email | mobile |
#       #  | Tenant | Rachel | rachel@share911.com | 500-555-5553 | regular

#   Given the response agency 'Bedford PD' that shares the same zipcode('12345') exists with the following officers:
#   # | firstname | lastname | email | mobile |
#   # | Officer | Yellow | yellow@share911.com | 500-444-5554 |
#   # | Officer | Black | black@share911.com | 500-444-5555 |
#   And  the 'Bedford PD' is registered to the 'Bedford Mall' channel group as its response agency    

#   Given Tenant Green is authorized to send alerts to his 'Apple store' channel

#   When Tenant Green logs in
#   And broadcasts an 'Evacuate' alert for the 'Apple store' channel

#   Then everyone in the 'Bedford Mall' channel gets alerted
#   And everyone in 'Apple store' channel gets alerted
#   And the 'Bedford PD' and its officers is alerted
#   And the tenants of 'Orange store' channel is not alerted



# Scenario: Everyone in a channel with an active alert can check the status reports in real time  

#   Given the following users belong to the channel 'Liberty HS' of the type School with the zipcode '12345' : 
#       #  | firstname | lastname | email | mobile | User Type 
#       #  | Principal | ofSchool | principal@share911.com | Admin |                         <- made up admin user of the channel
#       #  | Teacher | Laura | laura@share911.com | 500-555-5551 | Regular|
#       #  | Teacher | Mike | mike@share911.com | 500-555-5552 | Regular |
#       #  | Teacher | Rachel | rachel@share911.com | 500-555-5553 | Regular |
#       #  | Teacher | New | new@share911.com |'carrot horse'| 500-555-5553 | Regular | To be made and removed before each test
  
#   Given the response agency 'Bedford PD' that shares the same zipcode '12345' exists with the following response officers:
#       # | firstname | lastname | email | mobile |
#       # | Officer | Yellow | yellow@share911.com | 500-444-5554 |
#       # | Officer | Black | black@share911.com | 500-444-5555 |
#   And  the 'Bedford PD' agency is registered to the 'Liberty HS' channel as response agency 

#   When there is an alert at the 'Liberty HS'

#   Then everyone in the 'Liberty HS' channel can check in their status multiple times 
#   And everyone's status is shown on the live view 
#   And everyone in the channel and its response agency can access the status reports instantly

# Officer Broadcasts, Principal Broadcasts#

# Scenario: test
#   Given foo
#   Given a user 'principal@share911.com' logs in with password 'carrot horse'
