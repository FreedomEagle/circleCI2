Feature: Broadcast basic alerts
  @e2e-test
# Each channel has a response agency                                  
# A channel can exist within a channel group or groups
# Multiple channels can belong to a channel group
# When a member of a channel group broadcasts an alert, the member can choose which channels to broadcast an alert to
# When members of a channel broadcasts an alert, the message travels within the channel and channel's parent group(s)

# TODO:
#   - convert broadcast scenario to assume users already exist so tests run faster (no verifying permissions)  <- 80 sec to 56 seconds
#   - convert email addresses to use 'name.e2e@example.com' format   <- done
#   - get passwords from cypress.env.json file; access via Cypress.env('passwords')   <- created User Object in Json
#
# General test writing guidelines
#   - shorter usually better
#   - write from perspective of Share911 Support Staff

  # Scenario: Voice Call Test
  #   Given Share911 is opened
  #   Given 'principal.e2e@example.com' logs in
  #   And open 'Liberty HS' channel

  #   When I view the latest alert receiver for 'Liberty HS'
  #   Then voice calls to 'Bedford PD' should be completed

Scenario: A regular member of an isolated channel broadcasts a 'lockdown' alert to her channel  
    Given Share911 is opened
    Given 'principal.e2e@example.com' logs in  
    And logs out