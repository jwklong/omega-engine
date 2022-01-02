Vue.component("upgrade-tree-arrow", {
    props: ["x1", "y1", "x2", "y2"],
    template: `<svg class="upgrade-tree-arrow">
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" stroke-width="4" stroke="white"></line>
</svg>`
});