export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WelcomeScene' }); // Define a chave de identificação da cena como 'WelcomeScene'
    }

    preload() {
        // Pré-carrega as imagens necessárias para a cena inicial
        this.load.image('tela', 'assets/tela_inicial.png'); // Tela de fundo
        this.load.image('play', 'assets/botao_play.png'); // Botão para iniciar o jogo
        this.load.image('instrucoes', 'assets/botao_instrucoes.png'); // Botão para acessar o menu de instruções
    }

    create() {
        // Obtém a largura e altura da tela do jogo
        const { width, height } = this.sys.game.config;

        // Adiciona a imagem de fundo ao centro da tela
        this.add.image(width / 2, height / 2, 'tela')
            .setOrigin(0.5) // Define a origem da imagem para o centro
            .setDisplaySize(width, height); // Ajusta o tamanho da imagem para cobrir a tela inteira

        // Cria os botões de interação para iniciar o jogo e acessar o menu de instruções
        this.createImageButton(width / 2, 250, 'play', () => this.scene.start('GameScene'), 0.2); // Botão de iniciar
        this.createImageButton(width / 2, 350, 'instrucoes', () => this.scene.start('MenuScene'), 0.2); // Botão de instruções
    }

    //Método para criar um botão interativo com efeito visual ao passar o mouse.

    createImageButton(x, y, imageKey, callback, scale = 1) { // Posição X do botão, Posição Y do botão, Chave da imagem do botão, Função executada ao clicar no botão, Escala do botão.
        let button = this.add.image(x, y, imageKey)
            .setOrigin(0.5) // Centraliza a imagem
            .setScale(scale) // Ajusta o tamanho do botão
            .setInteractive() // Permite interações com o botão
            .on('pointerdown', callback) // Executa a função ao clicar no botão
            .on('pointerover', () => button.setScale(scale * 1.1)) // Aumenta o botão ao passar o mouse
            .on('pointerout', () => button.setScale(scale)); // Retorna ao tamanho original ao retirar o mouse

        return button; // Retorna o botão criado
    }
}

export default WelcomeScene; // Exporta a classe para ser utilizada em outros arquivos
