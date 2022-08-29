Vue.component("achievement", {
    props: ["achievement"],
    data: function()
    {
        return {
            showTooltip: false
        }
    },
    template: `
    <div v-if="achievement.title != 'linebreak'">
        <div class="achievement-wrapper">
            <div class="tooltip" v-if="showTooltip">
                <h4>{{achievement.title}}</h4>
                <p v-html="achievement.description"></p>
            </div>
            <div @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" :class="{completed: achievement.isCompleted}" class="achievement" v-html="achievement.html"></div>
        </div>
     </div>
     <br v-else>`
});
