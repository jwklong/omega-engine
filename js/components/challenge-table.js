Vue.component("challenge-table", {
    props: ["challenges"],
    template: `<div class="challenge-container">
<challenge v-for="(c, i) in challenges" :key="i" :challenge="c"></challenge>
</div>`
});