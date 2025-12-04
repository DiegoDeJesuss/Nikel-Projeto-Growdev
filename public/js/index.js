// Criar instância do modal
const myModal = new bootstrap.Modal(document.getElementById("register-modal"));
let logged = sessionStorage.getItem("Logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) { /*se não econtrou a conta*/
        alert("Opps! Verifique o usúario ou a senha")
        return;
    }

    if (account){
        
        if(account.password !== password) {
            alert("Opps! Verifique se o usuario ou a senha estão errados.")
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html"; /*Se econtrar vai para home*/ 
    }


    
    
});




// CRIAR CONTA
document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email.length < 5) {
        alert("O e-mail deve ter pelo menos 5 caracteres.");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    alert("Conta criada com sucesso!");

    myModal.hide();
});


function checkLogged() {
    if(session) {
        sessionStorage.setItem("looged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html" /*se o usuario clicar em permancer logado ele já jogo para home*/ 
    }
}

// Função para salvar conta no localStorage
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if (saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("session", data);
}


function getAccount (key){
    const account = localStorage.getItem(key);
    if(account) {
        return JSON.parse(account);
    }

    return "";

}
