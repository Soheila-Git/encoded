@forms @usefixtures(workbook,admin_user)
Feature: Edit forms

    Scenario: Save a change to an antibody
        When I visit "/antibodies/ENCAB728YTO/"
        And I wait for the content to load
        And I click the element with the css selector ".icon-gear"
        And I click the link to "/antibodies/ENCAB728YTO/#!edit"
        And I wait for an element with the css selector "form.rf-Form" to load
        And I wait for 5 seconds
        And I fill in "product_id" with "62626"
        And I press "Save"
        And I wait for an element with the css selector ".view-item.type-AntibodyLot" to load
        Then I should see "62626"

#    Scenario: Edit a child object
#        When I visit "/antibodies/ENCAB728YTO/#!edit"
#        And I wait for an element with the css selector ".collapsible-trigger" to load
#        And I click the element with the css selector ".collapsible-trigger"
#        And I wait for an element with the css selector "input[name=caption]" to load
#        And I fill in "caption" with "This is the new caption"
#        And I press "Save"
#        And I wait for an element with the css selector ".view-item.type-AntibodyLot" to load
#        Then I should see "This is the new caption" within 1 seconds

    Scenario: Leaving a dirty form without saving asks for confirmation
        When I visit "/antibodies/ENCAB728YTO/#!edit"
        And I wait for an element with the css selector "form.rf-Form" to load
        And I wait for 5 seconds
        And I fill in "notes" with "It's not a very nice antigen"
        And I click the link with text "ENCODE"
        And I dismiss the alert
        Then field "notes" should have the value "It's not a very nice antigen"
        # Make sure we don't leave a dirty form that will interfere with subsequent tests
        When I click the link with text "ENCODE"
        And I accept the alert

    Scenario: Validation errors are shown in context
        When I visit "/antibodies/ENCAB728YTO/#!edit"
        And I wait for an element with the css selector "form.rf-Form" to load
        And I fill in "url" with "bogus"
        And I wait for an element with the css selector ".rf-Message + input[name=url]" to load
        Then I should see "does not conform to" within 2 seconds
        # Make sure we don't leave a dirty form that will interfere with subsequent tests
        When I click the link with text "ENCODE"
        And I accept the alert

# To add:
# - interacting with the object picker
# - clicking links in the form opens in new window
