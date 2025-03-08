export class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' }); // Define a chave da cena para 'EndScene'
    }

    preload() {
        // Carrega as imagens usadas na cena
        this.load.image("derrota", "../assets/derrota.png"); // Imagem de fundo
        this.load.image('menu', 'assets/botao_menu.png'); // Imagem do botão de menu
    }

    create() {
        // Obtém a largura e altura da tela do jogo
        const { width, height } = this.sys.game.config;

        // Adiciona a imagem de fundo ocupando toda a tela
        this.add.image(width / 2, height / 2, 'derrota')
            .setOrigin(0.5) // Define a origem da imagem no centro
            .setDisplaySize(width, height); // Ajusta o tamanho da imagem para cobrir toda a tela

        // Cria o botão de menu e define seu comportamento ao ser clicado
        this.createImageButton(width / 2, 410, 'menu', () => this.scene.start('WelcomeScene'), 0.2);
    }

    //Cria um botão interativo na tela
    createImageButton(x, y, imageKey, callback, scale = 1) { // Posição X do botão, Posição Y do botão, Chave da imagem do botão, Função executada ao clicar no botão, Escala do botão
        let button = this.add.image(x, y, imageKey)
            .setOrigin(0.5) // Centraliza a imagem
            .setScale(scale) // Ajusta o tamanho do botão
            .setInteractive() // Permite interações com o botão
            .on('pointerdown', callback) // Define o evento de clique
            .on('pointerover', () => button.setScale(scale * 1.1))  // Aumenta ligeiramente ao passar o mouse
            .on('pointerout', () => button.setScale(scale)); // Retorna ao tamanho normal ao sair

        return button; // Retorna o botão criado
    }
}
