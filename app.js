const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        attactMonster() {
            this.currentRound++;

            const attactValue = getRandomValue(5, 12);

            this.monsterHealth -= attactValue;

            this.attactPlayer();
        },
        attactPlayer() {
            const attactValue = getRandomValue(8, 15);

            this.playerHealth -= attactValue;
        },
        specialAttactMonster() {
            this.currentRound++;

            const attactValue = getRandomValue(10, 25);

            this.monsterHealth -= attactValue;

            this.attactPlayer();
        },
        healPlayer() {
            this.currentRound++;

            const healValue = getRandomValue(8, 20);

            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }

            this.attactPlayer();
        },
        surrender() {
            this.winner = 'monster';
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }

            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }

            return {width: this.playerHealth + '%'};
        },
        myUseSpecialAttact() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // A Draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Player Lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // A Draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Monster Lost
                this.winner = 'player'
            }
        }
    },
})

app.mount('#game');

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}