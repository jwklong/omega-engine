Vue.component("volatility-tab", {
    data: function()
    {
        return {
            volatility: game.volatility
        }
    },
    template: `<div class="volatility-tab">
<p class="description">volatility has stuff to make u better at game i guess</p>
<div class="upgrades">
    <upgrade :upgrade="volatility.layerVolatility"></upgrade>
    <upgrade :upgrade="volatility.autoMaxAll"></upgrade>
    <upgrade :upgrade="volatility.prestigePerSecond"></upgrade>
</div>
</div>`
});