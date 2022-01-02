Vue.component("upgrade-container",{
    props: ["upgrades"],
    template: `<div class="upgrade-container">
<dynamic-upgrade v-for="(u, i) in upgrades" :key="i" :upgrade="u"></dynamic-upgrade>
</div>`
});