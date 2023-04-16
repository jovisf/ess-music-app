Feature: Registration and maintenance of Users (insert, remove, update)
    As a "Dizer" employee
    I want to insert new users
    And remove existing users
    And update existing users information
    So that users could login at the "Dizer"
    And users could update theirs information at the "Dizer"

Scenario: Registering new users
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb01" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I see a registration completed message

Scenario: Register new User with an invalid email
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb01" and "pcsb1"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Register new User with password less than 6 digits
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb1" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without user
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "", "Pedro Basilio", "pcsb01" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Usuario" field highlighted

Scenario: Registering new users without email
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "pcsb01" and ""
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Registering new users without password
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "Pedro Basilio", "" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Registering new users without name
    Given I am on the "Registro de novo usuário" page
    When I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "pcsb1", "", "pcsb01" and "pcsb1@cin.ufpe.br"
    And I click on "Enviar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nome" field highlighted

Scenario: User logged in wants to change his password
    Given I am logged in with user "pcsb1" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha"
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I see a password changed successfully message

Scenario: Logged in user wants to delete his account
    Given I am logged in with user "pcsb2" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Deletar Perfil"
    And I click "Sim"
    Then I am logged out on the "Pagina Inicial" page