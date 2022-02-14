Vue.component("endgame-tab", {
    computed: {
        timeSpent: function() {
            time = game.timeSpent;
            formattedTime = functions.formatTime(time)
            return formattedTime
        },
    },
    methods: {
        hardResetGame: () => functions.hardResetGame(),
    },
    template: `<div id="endgame">
    <h2><span class="omega">You</span> Win!</h2>
    <p>You beat the game in <span class="omega">{{timeSpent}}</span><br>
    <button onclick="game.settings.tab = 'Layers'">Continue</button> <button @click="hardResetGame()">Wipe Game</button></p>
</div>`
})