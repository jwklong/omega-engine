Vue.component("automator-tab", {
    data: function()
    {
        return {
            automators: game.automators
        }
    },
    methods: {
        alephUnlocked: () => game.alephLayer.isUnlocked()
    },
    template: `<div class="automator-tab">
<div class="automators">
    <automator :automator="automators.autoMaxAll"></automator>
    <automator :automator="automators.autoPrestige"></automator>
    <automator :automator="automators.autoAleph" v-if="alephUnlocked()"></automator>
</div>
</div>`
})