// Criar instância do modal
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

// BOTÃO SAIR
document.getElementById("button-logout").addEventListener("click", logout);
// BOTÃO ADICIONAR LANÇAMENTO
document.getElementById("transaction-button").addEventListener("click", function () {
    window.location.href = "transactions.html";
})

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

    getCashIn(); // atualizar lançamentos na tela
    getCashOut(); // atualizar lançamentos na tela
    getTotal();  // atualizar total na tela

    // 🔥 CORREÇÃO DO ERRO DE ARIA-HIDDEN
    document.activeElement.blur();  // tira o foco do botão que abriu o modal
    document.body.focus();          // força o foco para fora do modal

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

    getCashIn();
    getCashOut();
    getTotal(); 
}

// FUNÇÃO SAIR
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml +=
                  `<div class="row mb-4">
                          <div class="col-12">
                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                              <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    <p>${cashIn[index].date}</p>

                                </div>

                              </div>
                            </div>
                          </div>
                          
                          
                          
                        </div> `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
  
  
    }

}




// CASH OUT - EM DESENVOLVIMENTO
function getCashOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "2");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml +=
                  `<div class="row mb-4">
                          <div class="col-12">
                            <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                            <div class="container p-0">
                              <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    <p>${cashIn[index].date}</p>

                                </div>

                              </div>
                            </div>
                          </div>
                          
                          
                          <div class="col-12">
                            <button type="button" class="btn button-default">
                              Ver todas
                            </button>
                          </div>
                        </div> `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
  
  
    }

}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$${total.toFixed(2)}`;
}

// SALVAR DADOS DO USUÁRIO
function saveData(data) {
    // Usa o email/login do usuário como chave
    localStorage.setItem(logged, JSON.stringify(data));
}



