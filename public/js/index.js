// Criar instância do modal
const myModal = new bootstrap.Modal(document.getElementById("register-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Opps! Verifique o usúario ou a senha");
        return;
    }

    if (account.password !== password) {
        alert("Opps! Verifique se o usuario ou a senha estão errados.");
        return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";
});

// CRIAR CONTA
document.getElementById("register-form").addEventListener("submit", function (e) {
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
    // Se o usuário marcou "permanecer logado"
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

// SALVA A SESSÃO CORRETAMENTE
function saveSession(email, keepLogged) {

    // se marcou permanecer logado → salva no localStorage
    if (keepLogged) {
        localStorage.setItem("session", email);
    }

    // sempre salva a sessão atual
    sessionStorage.setItem("logged", email);
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) return JSON.parse(account);

    return "";
}
