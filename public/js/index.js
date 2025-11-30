// Criar instância do modal
const myModal = new bootstrap.Modal(document.getElementById("register-modal"));


//Logar no sistema




// Evento de submit do formulário de cadastro
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

// Função para salvar conta no localStorage
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
