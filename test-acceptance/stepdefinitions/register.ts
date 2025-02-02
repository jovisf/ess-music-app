import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import { HttpClient } from 'selenium-webdriver/http';
import request = require("request-promise");
import { stringify } from 'querystring';


var base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";

const httpClient = new HttpClient(base_url);

async function loginAsUser(user_id: string, password: string){
    //Navegar até página de login
    await browser.get(base_front_url);
    await element(by.buttonText('Login')).click();
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + '/login');

    //Realizar login
    await $("input[formControlName='username']").sendKeys(<string> user_id);
    await $("input[formControlName='password']").sendKeys(<string> password);
    await element(by.buttonText('Login')).click();
    await browser.wait(ExpectedConditions.urlIs(base_front_url + "/initial-page") , 30000);
    await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/initial-page");
}

async function getUserFromDb(user_id: string){
    return httpClient.send(
        {
            method: "get",
            path: "/user/" + user_id,
            headers: null,
            data: null
        }
    )
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am on the "Registro de novo usuário" page$/, { timeout: 10000 }, async () => {
        await browser.get(base_front_url + '/register');
    })
    
    When(/^I fill the fields "Usuario", "Nome", "Senha" and "Email" with the values "([^\"]*)", "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, async (id, name, password, email) => {
        await $("input[formControlName='id']").sendKeys(<string> id);
        await $("input[formControlName='name']").sendKeys(<string> name);
        await $("input[formControlName='password']").sendKeys(<string> password);
        await $("input[formControlName='email']").sendKeys(<string> email);
    })

    When(/^I click on "Enviar"$/, async () => {
        await element(by.buttonText('Enviar')).click();
    })

    Then(/^I see a registration completed message$/, { timeout : 10000 }, async () => {
        await browser.get(base_front_url+'/login');
        await element(by.cssContainingText('div', 'Registro feito com sucesso!')).isPresent();
    })

    Then(/^I get a Registration Error message "Por favor colocar um dado válido"$/, { timeout: 10000 }, async () => {
        await browser.get(base_front_url+'/register');
        await element(by.cssContainingText('div', 'Por favor colocar um dado válido')).isPresent();
    })

    Then(/^I see the "Email" field highlighted$/, { timeout: 10000 }, async () => {
        // await element(by.cssContainingText('mdc-text-field--invalid', '')).isPresent();
        await expect($("input[formControlName='email'].ng-invalid").isPresent()).to.eventually.equal(true);
    })

    Then(/^I see the "Senha" field highlighted$/, { timeout: 10000 }, async () => {
        // await element(by.cssContainingText('mdc-text-field--invalid', '')).isPresent();
        await expect($("input[formControlName='password'].ng-invalid").isPresent()).to.eventually.equal(true);
    })

    Then(/^I see the "Usuario" field highlighted$/, { timeout: 10000 }, async () => {
        // await element(by.cssContainingText('mdc-text-field--invalid', '')).isPresent();
        await expect($("input[formControlName='id'].ng-invalid").isPresent()).to.eventually.equal(true);
    })

    Then(/^I see the "Nome" field highlighted$/, { timeout: 10000 }, async () => {
        // await element(by.cssContainingText('mdc-text-field--invalid', '')).isPresent();
        await expect($("input[formControlName='name'].ng-invalid").isPresent()).to.eventually.equal(true);
    })

    Given(/^I am logged in with user "([^\"]*)" and password "([^\"]*)"$/, {timeout: 10000}, async (user : string, password:string) => {
        loginAsUser(user, password);
    })

    Given(/^I am on the "Editar Perfil" page$/, {timeout: 10000}, async () => {
        await browser.wait(() => browser.getCurrentUrl().then((url) => url == (base_front_url + '/initial-page')));
        await $("a[routerLink='/user']").click();
        await browser.wait(() => browser.getCurrentUrl().then((url) => url == (base_front_url + '/user')));
        await element(by.buttonText('Editar Perfil')).click();
        await expect(browser.wait(() => browser.getCurrentUrl().then((url) => url == (base_front_url + '/userEdit'))).then(()=>true).catch(()=>false)).to.eventually.equal(true);

    })

    When(/^I click on "Alterar Senha"$/, async () => {
        await element(by.buttonText('Alterar Senha')).click();
    })

    When(/^I write "([^\"]*)" in "Nova Senha"$/, async (password) => {
        await $("input[formControlName='password']").sendKeys(<string> password);
    })

    When(/^I click on "Alterar"$/, async () => {
        await element(by.buttonText('Alterar')).click();
    })

    Then(/^I see a password changed successfully message$/, { timeout : 10000 }, async () => {
        await element(by.cssContainingText('div', 'Senha alterada com sucesso!')).isPresent();
    })

    When(/^I click on "Deletar Perfil"$/, async () => {
        await element(by.buttonText('Deletar Perfil')).click();
    })
    // When(/^I click on "Sim"$/, async () => {
    //     // await element(by.xpath('//*[@id="mat-mdc-dialog-0"]/div/div/app-user-se-deletapopup/mat-card/mat-card-content/div/a[1]/span[2]')).click();
    //     // await element(by.buttonText('Sim')).click();
    //     // await browser.wait(() => element(by.css('app-user-se-deletapopup')).isPresent(), 5000);


    // })

    Then(/^I am logged out on the "Pagina Inicial" page$/, { timeout : 10000 }, async () => {
        await browser.get(base_front_url);
    })

    Given(/^I am logged in with an admin account with user "([^\"]*)" and password "([^\"]*)"$/, {timeout: 10000}, async (user : string, password:string) => {
        loginAsUser(user, password);
    })

    Given(/^I am on the "Lista de Usuários" page$/, {timeout: 30000}, async () => {
        await browser.wait(() => browser.getCurrentUrl().then((url) => url == (base_front_url + '/userAdmin')));
        // await element(by.cssContainingText("a", "Visualizar Usuários")).click();
        await $("a[routerLink='/lista-usuarios']").click();

        await expect(browser.wait(() => browser.getCurrentUrl().then((url) => url == (base_front_url + '/lista-usuarios'))).then(()=>true).catch(()=>false)).to.eventually.equal(true);
    })

    Given(/^I see a list of system users$/, {timeout: 10000}, async () => {
        await expect(element(by.css('app-userlisting')).isPresent()).to.eventually.equal(true);
    })

    Given(/^I see the collumns "Usuario", "Nome", "Email", "Tipo de Usuário" and "Status" with the values "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, {timeout: 10000}, async (user:string, name:string, email:string, role:string, status:string ) => {
        await browser.wait(() => element(by.css('table')).isPresent(), 5000);
        const usr = element(by.cssContainingText('td', user));
        await expect(usr.isPresent()).to.eventually.equal(true);
        const row = usr.element(by.xpath('..'));

        const nm = row.element(by.cssContainingText('td', name));
        await expect(nm.isPresent()).to.eventually.equal(true);
        
        const eml = row.element(by.cssContainingText('td', email));
        await expect(eml.isPresent()).to.eventually.equal(true);
        
        const rl = row.element(by.cssContainingText('td', role));
        await expect(rl.isPresent()).to.eventually.equal(true);
        
        const stt = row.element(by.cssContainingText('td', status));
        await expect(stt.isPresent()).to.eventually.equal(true);
    })
    
    When(/^I click on the "Editar" button on the "Usuario" user "([^\"]*)" line$/, async (user:string) => {
        await element(by.xpath("//*[contains(@id,'Editar')]"));
    //    await element(by.cssContainingText('td', user)).element(by.xpath('..')).element(by.buttonText('Editar')).click();
    })

    When(/^I click "Atualizar"$/, async () => {
        await element(by.cssContainingText('td' ,'Atualizar'));
        })
    

    Then(/^I see a success message "Informação alterada com sucesso!"$/, { timeout: 10000 }, async () => {
        await element(by.cssContainingText('div', 'Informação alterada com sucesso')).isPresent();
    })

    Given(/^I see the "email" user "([^\"]*)"$/, {timeout: 10000}, async (email:string) => {
        await element(by.cssContainingText('td', email)).isPresent();
    })

    When(/^ I click on the "Remover" button on the "Email" user "([^\"]*)" line$/, {timeout: 10000}, async (email:string) => {

      })

    When(/^I click "Sim"$/, {timeout: 10000}, async () => {
        // await element(by.buttonText('Sim')).click();      
        await element(by.cssContainingText('span', 'Sim')).click();  
        })

    Then(/^I check that the email user "([^\"]*)" is no longer on the list of system users"$/, {timeout: 10000}, async (email:string) => {
        await element(by.cssContainingText('app-userlisting', '*')).isPresent();
        await expect(element(by.cssContainingText('app-userlisting', email)).isPresent()).to.eventually.equal(false);
    })

    Then(/^I see the "Nova Senha" field highlighted$/, { timeout: 10000 }, async () => {
        // await element(by.cssContainingText('mdc-text-field--invalid', '')).isPresent();
        await expect($("input[formControlName='password'].ng-invalid").isPresent()).to.eventually.equal(true);
    })
    

})