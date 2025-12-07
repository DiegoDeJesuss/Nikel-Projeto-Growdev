// Criar instância do modal
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

// BOTÃO SAIR
document.getElementById("button-logout").addEventListener("click", logout);


// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date,
    });

    saveData(data);  // salva no localStorage
    e.target.reset(); // limpar formulário
    myModal.hide(); // fechar modal

    alert("Lançamento adicionado com sucesso!");
});


// VERIFICAR LOGIN
checkLogged();

function checkLogged() {
    // Se existe uma sessão salva no localStorage, move para sessionStorage
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    // Se não está logado, vai para página inicial
    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    // Carregar dados do usuário
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    console.log(data);
}


// FUNÇÃO SAIR
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}


// SALVAR DADOS DO USUÁRIO
function saveData(data) {
    // Usa o email/login do usuário como chave
    localStorage.setItem(logged, JSON.stringify(data));
}
