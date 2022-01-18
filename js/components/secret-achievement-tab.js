Vue.component('secret-achievement-tab', {
    data: function ()
    {
        return {
            secretAchievements: game.secretAchievements
        }
    },
    computed: {
        achievementsUnlocked: function()
        {
            return this.secretAchievements.filter(ach => ach.isCompleted).length;
        },
        totalAchievements: function()
        {
            return this.achievementsUnlocked == this.secretAchievements.length ? this.achievementsUnlocked : "?";
        }
    },
    template: `<div class="achievement-tab">
<p>You have unlocked {{achievementsUnlocked}} / {{totalAchievements}} Achievements.</p>
<div class="achievements">
    <achievement v-for="(a, i) in secretAchievements" v-if="a.isCompleted === true" :key="i" :achievement="a"></achievement>
</div>
</div>
</div>`
})