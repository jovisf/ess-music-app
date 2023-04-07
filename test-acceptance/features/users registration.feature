Feature: Registration and maintenance of Users (insert, remove, update)
    As a "Dizer" employee
    I want to insert new users
    And remove existing users
    And update existing users information
    So that users could login at the "Dizer"
    And users could update theirs information at the "Dizer"

Scenario: Registering new users
    Given I am on the "Registro de novo usuário" page
    When I write "pcsb" in "Usuário"
    And I write "Pedro Basilio" in "Nome"
    And I write "pcsb01" in "Senha"
    And I write "pcsb@cin.ufpe.br" in "Email"
    And I click on "Enviar"
    Then I see a registration completed message

Scenario: User logged in wants to change his password
    Given I am on the "Editar Perfil" page
    And I am logged in with user "pcsb" and password "pcsb01"
    When I click on "Alterar Senha" option
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I see a password changed successfully message

Scenario: Logged in user wants to delete his account
    Given I am on the "Editar Perfil" page
    And I am logged in with email "pcsb@cin.ufpe.br" and password "01pcsb"
    When I click on "Deletar Perfil" option
    And I click "Sim"
    Then I get a message that the user "pcsb@cin.ufpe.br" has been deleted
    And I am logged out on the "Pagina Inicial" page

Scenario: Administrator wants to remove a User from the system
    Given I am logged in with and admin account with email "admin@dizer.com" and password "admin"
    And I'm on the "Admin Dashboard" page
    And I see a list of system users
    And I see the "e-mail" user "pcsb@cin.ufpe.br"
    When I click on the "Remove User" button on the "e-mail" user "pcsb@cin.ufpe.br"
    And I click "confirm"
    Then I get a message that the user has been deleted
    And I check that the "e-mail" user "pcsb@cin.ufpe.br" is no longer on the list of system users

Scenario: Register new User with already registered email
    Given I am on the "New User Registration" page
    When I write "Pedro Basilio" in "Name"
    And I write "pcsb@cin.ufpe.br" in "email"
    And I write "000000" in "Password"
    Then I get a Registration Error message "email already registered"


Scenario: Register new User with password less than 6 digits
    Given I am on the "New User Registration" page
    When I write "Drielle" in "Name"
    And I write "dddd@cin.ufpe.br" in "email"
    And I write "00000" in "Password"
    Then I get a Registration Error message "password less than 6 digits"
