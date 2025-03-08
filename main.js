// Importação das cenas do jogo, que são módulos externos com a lógica de cada parte do jogo
import { WelcomeScene } from "./scenes/welcome.js"; // Cena de boas-vindas
import { GameScene } from "./scenes/game.js"; // Cena principal do jogo
import { EndScene } from "./scenes/end.js"; // Cena de fim de jogo
import { MenuScene } from "./scenes/menu.js"; // Cena de menu
import { WinScene } from "./scenes/win.js"; // Cena de vitória

// Configuração principal do jogo
const config = { 
    type: Phaser.AUTO, // Define o tipo de renderização, o Phaser escolhe automaticamente entre WebGL ou Canvas
    width: 1000, // Largura da tela do jogo (em pixels)
    height: 500, // Altura da tela do jogo (em pixels)
    backgroundColor: "#c1a0e0", // Cor de fundo da tela do jogo (em hexadecimal)
    pixelArt: true, // Define que os gráficos serão em pixel art
    roundPixel: false, // Indica se os pixels da arte devem ser arredondados (para evitar distorções)
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o jogo para se ajustar à tela, sem distorcer
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza automaticamente o jogo na tela
    },
    physics: {
        default: "arcade", // Utiliza o sistema de física arcade (simples e rápido)
        arcade: {
            gravity: { y: 2000 }, // Aplica uma gravidade para o eixo Y, fazendo com que objetos caem
           // debug: true // Descomentar se desejar exibir as informações de depuração (como colisões)
        }
    },
    scene: [WelcomeScene, GameScene, EndScene, MenuScene, WinScene] // Define as cenas que o jogo utilizará, listadas na ordem
};

// Criação do jogo utilizando a configuração definida acima
const game = new Phaser.Game(config); // Chama a biblioteca Phaser com as configurações passadas para iniciar o jogo
