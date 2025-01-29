const messages = [
    "Quase lá! Tente novamente! 😊",
    "Ele escapou de novo! 🏃‍♂️",
    "Você é persistente, hein? 💪",
    "Mais uma tentativa! 😄",
    "Não desista agora! 🌟",
    "Ele está te desafiando! 🎯",
    "Você consegue! 🚀",
    "Quase pegou! 👐",
    "Ele é rápido, mas você é mais! 🏆",
    "Só mais uma tentativa! 😉"
];

const botaoSim = document.getElementById('sim');
const botaoNao = document.getElementById('nao');
const messageDiv = document.getElementById('message');
const specialMessageDiv = document.getElementById('special-message');
const fireworksContainer = document.createElement('div');
fireworksContainer.id = 'fireworks';
document.body.appendChild(fireworksContainer);

let clickCount = 0;

// Função para verificar colisão entre dois elementos
function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// Função para garantir que o botão não saia dos limites do contêiner
function isWithinBounds(element, x, y) {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    return (
        x >= 0 &&
        y >= 0 &&
        x + elementRect.width <= containerRect.width &&
        y + elementRect.height <= containerRect.height
    );
}

function moverBotao() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    let newX, newY;
    let collisionDetected;

    do {
        // Gera novas coordenadas dentro dos limites do contêiner
        newX = Math.random() * (containerRect.width - botaoSim.offsetWidth);
        newY = Math.random() * (containerRect.height - botaoSim.offsetHeight);

        // Define a nova posição temporariamente para verificar colisão
        botaoSim.style.left = `${newX}px`;
        botaoSim.style.top = `${newY}px`;

        // Verifica se há colisão com o botão "Não"
        collisionDetected = checkCollision(botaoSim, botaoNao);
    } while (collisionDetected || !isWithinBounds(botaoSim, newX, newY)); // Repete até não haver colisão e estar dentro dos limites

    // Exibe uma mensagem aleatória
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageDiv.textContent = randomMessage;
}

function showSpecialMessage() {
    specialMessageDiv.textContent = "Parabéns! Você conseguiu! 💖🎉";
    specialMessageDiv.style.display = "block";

    // Ativa os fogos de artifício
    const fireworks = new Fireworks(fireworksContainer, {
        speed: 3,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1,
        particles: 100,
        explosion: 10,
    });
    fireworks.start();

    // Remove o botão "Sim" após a mensagem especial
    botaoSim.style.display = "none";
}

// Movimenta o botão "Sim" quando o mouse passa por cima
botaoSim.addEventListener('mouseover', moverBotao);

// Conta os cliques no botão "Sim"
botaoSim.addEventListener('click', function(event) {
    event.preventDefault();
    clickCount++;
    moverBotao();

    if (clickCount === 10) {
        showSpecialMessage();
    }
});

document.getElementById('nao').addEventListener('click', function() {
    alert('Hmm, talvez na próxima vez! 😢');
});