Feature: Registration and maintenance of Users (insert, remove, update)
    As a "Dizer" employee
    I want to insert new users
    And remove existing users
    And update existing users information
    So that users could login at the "Dizer"
    And users could update theirs information at the "Dizer"

Scenario: Administrator wants to edit a User from the system
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Basilio", "pcsb@cin.ufpe.br", "user" and "Ativo"
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field, "pcsb02" in "Senha" field, "pcsb2@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I see a success message "Informação alterada com sucesso!"
    And I see a list of system users
    And I see the collumns fields "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "pcsb", "Pedro Costa", "pcsb2@cin.ufpe.br", "user" and "Ativo"



Scenario: User logged in wants to change his password
    Given I am logged in with user "pcsb" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha"
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I see a password changed successfully message

Scenario: User logged in wants to change his password to a less than 6 digits password
    Given I am logged in with user "pcsb" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha" option
    And I write "01pcsb" in "Nova Senha"
    And I click on "Alterar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nova Senha" field highlighted

Scenario: User logged in wants to change his password without password
    Given I am logged in with user "pcsb" and password "pcsb01"
    And I am on the "Editar Perfil" page
    When I click on "Alterar Senha" option
    And I write nothing in "Nova Senha" field
    And I click on "Alterar"
    Then I get a Registration Error message "Por favor colocar um dado válido"
    And I see the "Nova Senha" field highlighted

Scenario: Administrator wants to remove a User from the system
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I am on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "email" user "pcsb@cin.ufpe.br"
    When I click on the "Remover" button on the "Email" user "pcsb@cin.ufpe.br" line
    And I click "Sim"
    Then I check that the email user "pcsb@cin.ufpe.br" is no longer on the list of system users

Scenario: Administrator wants to edit a User password to a password less than 6 digits
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb0" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

Scenario: Administrator wants to edit a User email to a invalid email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb01" in "Senha" field
    And I write "pcsb2" in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Administrator wants to edit a User information without email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb01" in "Senha" field
    And I write nothing in "Email" field
    And I click "Atualizar"
    Then I get a Error message "Por favor colocar um dado válido"
    And I see the "Email" field highlighted

Scenario: Administrator wants to edit a User information without password
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I write nothing in "Senha" field
    And I click "Atualizar"
    Then I get a Error message "Por favor colocar um dado válido"
    And I see the "Senha" field highlighted

    Scenario: Administrator wants to edit a User information without name
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Editar" button on the "Usuario" user "pcsb" line
    And I write "pcsb01" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I write nothing in "Nome" field
    And I click "Atualizar"
    Then I get a Error message "Por favor colocar um dado válido"
    And I see the "Nome" field highlighted

Scenario: Administrator wants to edit a user role
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Ativar" button on the "Usuario" user "pcsb" line
    And I select "Admin" in "Tipo de Usuario" field
    And I click "Atualizar"
    Then I see a success message "Informação alterada com sucesso!"
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb2@cin.ufpe.br"
    And I see the "Nome" user "Pedro Costa"
    And I see the "Tipo de Usuario" user "Admin"
    And I see the "Ativo" user field checked

Scenario: Administrator wants to edit a user role without selecting a role
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb@cin.ufpe.br"
    And I see the "Nome" user "Pedro Basilio"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked
    When I click on the "Ativar" button on the "Usuario" user "pcsb" line
    And I select nothing in "Tipo de Usuario" field
    And I click "Atualizar"
    Then I get a Error message "Por favor, selecione um cargo!"

Scenario: Administrator wants to add a new User
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario" 
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb02" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I click "Adicionar"
    Then I see a success message "Usuário cadastrado com sucesso"
    And I see a list of system users with "4" users
    And I see the "Usuario" user "pcsb"
    And I see the "email" user "pcsb2@cin.ufpe.br"
    And I see the "Nome" user "Pedro Costa"
    And I see the "Tipo de Usuario" user "Usuario"
    And I see the "Ativo" user field checked

Scenario: Administrator wants to add a new User with an invalid email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb02" in "Senha" field
    And I write "pcsb2" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User with an invalid password
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb0" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

Scenario: Administrator wants to add a new User without user field
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb02" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I write nothing in "Usuario" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

    Scenario: Administrator wants to add a new User without email
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb02" in "Senha" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I write nothing in "Email" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

    Scenario: Administrator wants to add a new User without password
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I write nothing in "Senha" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

    Scenario: Administrator wants to add a new User without name
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "pcsb02" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select "Usuario" in "Tipo de Usuario" field
    And I select the checkbox of "Ativo" field
    And I write nothing in "Nome" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"

    Scenario: Administrator wants to add a new User without role
    Given I am logged in with an admin account with user "admin@dizer.com" and password "admin"
    And I'm on the "Lista de Usuários" page
    And I see a list of system users with "3" users
    When I click on "Adicionar Usuario"
    And I write "pcsb" in "Usuario" field
    And I write "Pedro Costa" in "Nome" field
    And I write "pcsb02" in "Senha" field
    And I write "pcsb2@cin.ufpe.br" in "Email" field
    And I select the checkbox of "Ativo" field
    And I write nothing in "Tipo de Usuario" field
    And I click "Adicionar"
    Then I see a error message "Por favor, insira um dado válido!"