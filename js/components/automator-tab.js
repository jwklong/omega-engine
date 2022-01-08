Vue.component("automator-tab", {
    data: function()
    {
        return {
            automators: game.automators
        }
    },
    methods: {
        alephUnlocked: () => game.alephLayer.isUnlocked(),
        metaUnlocked: () => game.restackLayer.metaUpgrade.level.gte(1)
    },
    template: `<div class="automator-tab">
<div class="automators">
    <automator :automator="automators.autoMaxAll"></automator>
    <automator :automator="automators.autoPrestige"></automator>
    <automator :automator="automators.autoAleph" v-if="alephUnlocked()"></automator>
    <automator :automator="automators.autoAuto" v-if="metaUnlocked()"></automator>
</div>
</div>`
})