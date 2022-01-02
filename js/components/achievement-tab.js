Vue.component('achievement-tab', {
    data: function ()
    {
        return {
            achievements: game.achievements
        }
    },
    computed: {
        achievementsUnlocked: function()
        {
            return this.achievements.filter(ach => ach.isCompleted).length;
        },
        totalAchievements: function()
        {
            return this.achievements.length;
        }
    },
    template: `<div class="achievement-tab">
<p>You have unlocked {{achievementsUnlocked}} / {{totalAchievements}} Achievements.</p>
<div class="achievements">
    <achievement v-for="(a, i) in achievements" :key="i" :achievement="a"></achievement>
</div>
</div>`
})