export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' }); // Define a chave única da cena para referência futura
    }

    preload() {
        // Carrega a imagem de instruções que será usada como fundo
        this.load.image("instrucao", "../assets/instrucao.png");
        
        // Carrega a imagem do botão de menu, que será usado para iniciar o jogo
        this.load.image('menu', 'assets/botao_menu.png');
    }

    create() {
        // Obtém a largura e altura da tela do jogo para posicionamento adequado dos elementos
        const { width, height } = this.sys.game.config;

        // Adiciona a imagem de fundo na tela, centralizada e redimensionada para cobrir toda a tela
        this.add.image(width / 2, height / 2, 'instrucao')
            .setOrigin(0.5) // Define a origem da imagem para o centro
            .setDisplaySize(width, height); // Ajusta o tamanho da imagem para cobrir toda a tela

        // Cria o botão do menu que leva à cena 'WelcomeScene'
        this.createImageButton(250, 410, 'menu', () => this.scene.start('WelcomeScene'), 0.2);
    }

    //Cria um botão de imagem interativo.
       createImageButton(x, y, imageKey, callback, scale = 1) { // Posição X do botão, Posição Y do botão, Chave da imagem do botão, Função executada ao clicar no botão, Escala do botão.
        let button = this.add.image(x, y, imageKey)
            .setOrigin(0.5) // Define a origem do botão no centro
            .setScale(scale) // Define o tamanho do botão
            .setInteractive() // Permite que o botão receba interações
            .on('pointerdown', callback) // Define a função que será executada ao clicar
            .on('pointerover', () => button.setScale(scale * 1.1)) // Aumenta ligeiramente o botão ao passar o mouse
            .on('pointerout', () => button.setScale(scale)); // Retorna ao tamanho original ao sair do botão
        
        return button; // Retorna o botão criado
    }
}
