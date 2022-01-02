Vue.component("resource-display", {
    props: ["layer"],
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<p class="resource-display">You have <span>{{formatNumber(layer.resource, 2, 0, 1e9)}}</span> <resource-name :layerid="layer.layer"></resource-name></p>`
});