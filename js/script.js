window.addEventListener("DOMContentLoaded", function () {
    fetch("/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((games) => {
            document.getElementById("gameList").innerHTML = games.map((game) => {
                return `
                <li id="${game.id}">
                    ID: ${game.id} <br> Nome do jogo: ${game.name} <br> Gênero do Jogo: ${game.gender}
                </li>
            `
            }).join("");
        })
}, false);

const addGame = () => {
    const newGame = prompt("Nome do jogo & gênero (separados por vírgula): ");
    if (newGame) {
        const [name, gender] = newGame.split(",");
        fetch("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, gender }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById("gameList").innerHTML += `
                    <li id="${res.id}">
                        ID: ${res.id} Nome do jogo: ${name} <br> Gênero do Jogo: ${gender}
                    </li>
                `
                }
            });
    }
};

const deleteGame = () => {
    const gamePrompt = prompt("ID do jogo cadastrado: ");
    if (!gamePrompt) return alert("Invalid game ID");
    const gameId = parseInt(gamePrompt);
    if (gameId) {
        fetch(`/games/${gameId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById(gameId).remove();
                }
            });
    }
};

const updateGame = () => {
    const gamePrompt = prompt("ID do jogo cadastrado: ");
    if (!gamePrompt) return alert("Invalid game ID");
    const gameId = parseInt(gamePrompt);
    if (gameId) {
        const newGame = prompt("Nome do jogo & gênero (separados por vírgula):");
        if (newGame) {
            const [name, gender] = newGame.split(",");
            fetch(`/games/${gameId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, gender }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        document.getElementById(gameId).innerHTML = `
                        ID: ${gameId} <br> Nome do jogo: ${name} <br> Gênero do Jogo: ${gender}
                    `
                    }
                });
        }
    }
};    
