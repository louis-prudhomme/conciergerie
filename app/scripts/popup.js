import init, { check_db_exists, Cred, create_cred, obtain_cred, sign_up, sign_in } from "keyring";

async function launchBackend() {
    signForm.setAttribute("hidden", true);
    createForm.setAttribute("hidden", true);
    obtainForm.setAttribute("hidden", true);
    errorPrompt.setAttribute("hidden", true);
    successPrompt.setAttribute("hidden", true);
    obtainPassContainer.setAttribute("hidden", true);

    mainPrompt.removeAttribute("hidden");
    await init();
    mainPrompt.setAttribute("hidden", true);
}

async function initUi() {
    configAliases();
    await launchBackend();

    const isDb = check_db_exists();

    if (isDb) {
        signPrompt.textContent = "Sign in";
        signBtn.onclick = () => signin();
    } else {
        signPrompt.textContent = "Sign up";
        signBtn.onclick = () => signup();
    }

    reinitBtn.onclick = () => deleteDb();
    createBtn.onclick = () => createCred();
    obtainBtn.onclick = () => obtainCred();

    signForm.removeAttribute("hidden");
}

function deleteDb() {
    console.log("Erased database");
    localStorage.clear();
    window.close();
}

async function createCred() {
    await launchBackend();

    let isOk

    try {
        isOk = create_cred(Cred.from(signLogin.value, signPass.value),
            Cred.from(createLogin.value, createPass.value));
    } catch (e) { errorDisplay(isOk); }

    alternateForms(!!isOk);

    if (isOk) {
        createLogin.value = "";
        createPass.value = "";
        successPrompt.textContent = "Credential successfully created."
        successPrompt.removeAttribute("hidden");
    }
}

function alternateForms(isSignHidden) {
    if (isSignHidden) {
        signForm.setAttribute("hidden", true);

        createForm.removeAttribute("hidden");
        obtainForm.removeAttribute("hidden");
    } else {
        signForm.removeAttribute("hidden");

        createForm.setAttribute("hidden", true);
        obtainForm.setAttribute("hidden", true);
    }

}

function errorDisplay(error) {
    errorPrompt.textContent = error;

    errorPrompt.removeAttribute("hidden");

    if(!!error) console.error(error);
    if (!!error.stack) console.error(error.stack);
}

async function obtainCred() {
    await launchBackend();

    let pass

    try { pass = obtain_cred(Cred.from(signLogin.value, signPass.value), obtainLogin.value); }
    catch (e) { errorDisplay(pass); }

    if (!!pass) {
        obtainPass.value = pass;
        obtainPassContainer.removeAttribute("hidden");
    }

    alternateForms(true);
}

async function signin() {
    await launchBackend();

    let isOk
    try { isOk = sign_in(Cred.from(signLogin.value, signPass.value)); }
    catch (e) { errorDisplay(isOk); }

    if (!isOk) {
        errorDisplay("Wrong credentials");
    }

    alternateForms(!!isOk);
}

async function signup() {
    await launchBackend();

    let isOk
    try { isOk = sign_up(Cred.from(signLogin.value, signPass.value)); }
    catch (e) { errorDisplay(isOk); }

    alternateForms(!!isOk);
}

window.onload = () => { console.clear(); initUi().then(() => { }); };

let signForm;
let signPrompt;
let signLogin;
let signPass;
let signBtn;

let obtainForm;
let obtainLogin;
let obtainPass;
let obtainBtn;

let createForm;
let createLogin;
let createPass;
let createBtn;

let mainPrompt;
let successPrompt;
let errorPrompt;
let obtainPassContainer;
let reinitBtn;

function configAliases() {
    obtainPassContainer = document.getElementById("id_obtain_pass_container");
    mainPrompt = document.getElementById("id_main_prompt");
    successPrompt = document.getElementById("id_success_prompt");
    errorPrompt = document.getElementById("id_error_prompt");
    reinitBtn = document.getElementById("id_reinit_btn");

    signForm = document.getElementById("id_sign_form");
    signPrompt = document.getElementById("id_sign_prompt");
    signLogin = document.getElementById('id_sign_login');
    signPass = document.getElementById('id_sign_pass');
    signBtn = document.getElementById('id_sign_btn');

    createForm = document.getElementById('id_create_form');
    createLogin = document.getElementById('id_create_login');
    createPass = document.getElementById('id_create_pass');
    createBtn = document.getElementById('id_create_btn');

    obtainForm = document.getElementById('id_obtain_form');
    obtainLogin = document.getElementById('id_obtain_login');
    obtainPass = document.getElementById('id_obtain_pass');
    obtainBtn = document.getElementById('id_obtain_btn');
}