export class GameScene extends Phaser.Scene {

    alturaJogo = 432;  // Definição da altura do jogo
    larguraJogo = 1000; // Definição da largura do jogo
    plataformas = []; // Lista para armazenar as plataformas do jogo

    constructor() {
        super({ key: 'GameScene' }); // Chama o construtor da classe Phaser.Scene com a chave 'GameScene'
    }

    preload() {
        // Carrega os recursos necessários para o jogo (vídeos, imagens e áudio)
        this.load.video("paisagem", "../assets/paisagem.mp4", 'loadeddata', false, true);
        this.load.spritesheet("menino", "../assets/menino.png", { frameWidth: 32, frameHeight: 32 });
        //this.load.audio("musicaFundo", "../assets/musica.mp3");
        this.load.spritesheet("fantasma", "../assets/fantasma.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Inicialização de variáveis de pontuação e tempo
        this.pontuacao = 0; // Define a pontuação inicial
        this.tempoRestante = 240; // Define o tempo inicial

        // Carrega e toca a música de fundo
       // this.musica = this.sound.add("musicaFundo");
       // this.musica.play({
            loop: true,
            volume: 0.05
        });

        // Cria o vídeo de fundo
        const video = this.add.video(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem");
        const scaleX = this.larguraJogo / video.width; // Calcula a escala para ajustar a largura
        const scaleY = this.alturaJogo / video.height; // Calcula a escala para ajustar a altura
        const scale = Math.max(scaleX, scaleY); // Usa a maior escala para evitar distorções
        video.setScale(scale).setOrigin(0.5, 0.5); // Aplica a escala e define o ponto de origem
        video.play(true); // Toca o vídeo em loop

        // Cria o jogador no centro da tela
        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'menino').setScale(1.3);
        this.player.setCollideWorldBounds(true); // Impede que o jogador saia da tela

        // Cria as plataformas e define suas colisões
        this.plataformas[0] = this.physics.add.staticImage(660, 420);
        this.plataformas[0].body.setSize(555, 40, true);

        this.plataformas[1] = this.physics.add.staticImage(275, 320);
        this.plataformas[1].body.setSize(440, 30, true);

        this.plataformas[2] = this.physics.add.staticImage(335, 220);
        this.plataformas[2].body.setSize(185, 40, true);

        this.plataformas[3] = this.physics.add.staticImage(205, 125);
        this.plataformas[3].body.setSize(120, 40, true);

        this.plataformas[4] = this.physics.add.staticImage(this.larguraJogo / 2, 505);
        this.plataformas[4].body.setSize(this.larguraJogo, 20, true);

        // Adiciona colisões entre o jogador e as plataformas
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Cria os controles de teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Cria o texto da pontuação e do tempo na tela
        this.placar = this.add.text(780, 50, 'Pontuação:' + this.pontuacao, { fontSize: '25px', fill: '#ffffff' });
        this.timerText = this.add.text(780, 25, 'Tempo: 240s', { fontSize: '25px', fill: '#ffffff' });

        // Cria os fantasmas
        this.fantasmas = [];

        // Gera 15 fantasmas com posições e velocidades aleatórias
        for (let i = 0; i < 15; i++) {
            let fantasma = this.physics.add.sprite(
                Phaser.Math.Between(50, this.larguraJogo - 50),
                Phaser.Math.Between(50, this.alturaJogo - 50),
                "fantasma"
            ).setScale(1.2);

            fantasma.body.allowGravity = false; // Desativa a gravidade para os fantasmas
            fantasma.setCollideWorldBounds(true); // Impede que os fantasmas saiam da tela
            fantasma.setBounce(1); // Faz os fantasmas quicarem ao colidir
            this.definirMovimentoAleatorio(fantasma); // Define movimento aleatório para o fantasma
            this.fantasmas.push(fantasma); // Adiciona o fantasma à lista de fantasmas
        }

        // Configura a colisão entre o jogador e os fantasmas
        this.physics.add.overlap(this.player, this.fantasmas, (player, fantasma) => {
            // Remove o fantasma ao ser capturado
            this.fantasmas = this.fantasmas.filter(f => f !== fantasma);
            fantasma.destroy();
            
            this.pontuacao += 1; // Incrementa a pontuação
            this.placar.setText('Pontuação: ' + this.pontuacao); // Atualiza o texto da pontuação
        });

        // Criação das animações para o jogador (menino)
        this.anims.create({ key: 'direita', frames: this.anims.generateFrameNumbers('menino', { start: 2, end: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'esquerda', frames: this.anims.generateFrameNumbers('menino', { start: 0, end: 2 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'parada', frames: [{ key: 'menino', frame: 2 }], frameRate: 20 });

        // Criação das animações para o fantasma
        this.anims.create({ key: "fantasma_esquerda", frames: this.anims.generateFrameNumbers("fantasma", { start: 4, end: 7 }), frameRate: 5, repeat: -1 });
        this.anims.create({ key: "fantasma_direita", frames: this.anims.generateFrameNumbers("fantasma", { start: 0, end: 3 }), frameRate: 5, repeat: -1 });

        // Cria um evento para atualizar o tempo restante a cada segundo
        this.time.addEvent({
            delay: 1000, // Executa a cada 1000 milissegundos (1 segundo)
            callback: () => {
                this.tempoRestante--; // Decrementa o tempo restante
                this.timerText.setText('Tempo: ' + this.tempoRestante + 's'); // Atualiza o texto do tempo
                if (this.tempoRestante <= 0) { // Se o tempo acabar
                    //this.musica.stop(); // Para a música
                    this.scene.start('EndScene'); // Muda para a cena de fim de jogo
                }
            },
            callbackScope: this,
            loop: true // Define o evento como repetitivo
        });
    }

    update() {
        // Atualiza os controles do jogador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160); // Move o jogador para a esquerda
            this.player.anims.play('esquerda', true); // Toca a animação de andar para a esquerda
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160); // Move o jogador para a direita
            this.player.anims.play('direita', true); // Toca a animação de andar para a direita
        } else {
            this.player.setVelocityX(0); // Se nenhuma tecla de direção for pressionada, o jogador para
            this.player.anims.play('parada', true); // Toca a animação de parado
        }

        // Permite que o jogador pule se estiver tocando no chão
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.touching.down) {
            this.player.setVelocityY(-700); // Define a velocidade do salto
        }

        // Atualiza os fantasmas para que eles mudem de direção de acordo com sua velocidade
        this.fantasmas.forEach(fantasma => {
            if (fantasma.body.velocity.x < 0) {
                fantasma.anims.play("fantasma_esquerda", true); // Se o fantasma está indo para a esquerda
            } else if (fantasma.body.velocity.x > 0) {
                fantasma.anims.play("fantasma_direita", true); // Se o fantasma está indo para a direita
            }
        });

        // Se a pontuação atingir 15, o jogo termina e vai para a tela de vitória
        if (this.pontuacao === 15) {
           // this.musica.stop(); // Para a música
            this.scene.start('WinScene'); // Muda para a cena de vitória
        } else {
        }
    }

    // Função que define o movimento aleatório dos fantasmas
    definirMovimentoAleatorio(fantasma) {
        let velocidadeX = Phaser.Math.Between(-100, 100); // Gera uma velocidade aleatória no eixo X
        let velocidadeY = Phaser.Math.Between(-100, 100); // Gera uma velocidade aleatória no eixo Y
        fantasma.setVelocity(velocidadeX, velocidadeY); // Aplica a velocidade ao fantasma
    }
}
