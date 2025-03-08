export class WinScene extends Phaser.Scene {
    constructor() {
        // Define a chave da cena como 'WinScene'
        super({ key: 'WinScene' });
    }

    preload() {
        // Carrega a imagem de parabéns que será usada como fundo
        this.load.image("parabens", "../assets/parabens.png");
        
        // Carrega a imagem do botão do menu
        this.load.image('menu', 'assets/botao_menu.png');
    }

    create() {
        // Obtém a largura e altura da tela do jogo
        const { width, height } = this.sys.game.config;

        // Adiciona a imagem de parabéns ao centro da tela
        this.add.image(width / 2, height / 2, 'parabens')
            .setOrigin(0.5) // Define a origem da imagem para o centro
            .setDisplaySize(width, height); // Ajusta o tamanho para cobrir a tela toda

        // Cria o botão de menu na posição (250, 410)
        // Ao ser pressionado, ele retorna para a cena 'WelcomeScene'
        this.createImageButton(250, 410, 'menu', () => this.scene.start('WelcomeScene'), 0.2);
    }

    // Cria um botão de imagem interativo na tela
    createImageButton(x, y, imageKey, callback, scale = 1) { // Posição X do botão, Posição Y do botão, Chave da imagem do botão, Função executada ao clicar no botão, Escala do botão.
        let button = this.add.image(x, y, imageKey)
            .setOrigin(0.5) // Define a origem como o centro
            .setScale(scale) // Ajusta o tamanho do botão
            .setInteractive() // Permite interações com o botão
            .on('pointerdown', callback) // Executa a função quando o botão for pressionado
            .on('pointerover', () => button.setScale(scale * 1.1)) // Aumenta ligeiramente ao passar o mouse
            .on('pointerout', () => button.setScale(scale)); // Retorna ao tamanho normal ao sair

        return button; // Retorna o botão criado
    }
}
