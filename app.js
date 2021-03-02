const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        }
    },
    methods: {
        attactMonster() {
            const attactValue = getRandomValue(5, 12);

            this.monsterHealth -= attactValue;

            this.attactPlayer();
        },
        attactPlayer() {
            const attactValue = getRandomValue(8, 15);

            this.playerHealth -= attactValue;
        },
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        }
    },
})

app.mount('#game');

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}