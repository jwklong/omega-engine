Vue.component("layer-statistics", {
    props: ["layer"],
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        formatTime: s => functions.formatTime(s),
        formatTimesReset: function(t)
        {
            return t.toLocaleString("en-us", {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }
    },
    template: `<div class="layer-statistics">
<p>You have {{formatNumber(layer.resource, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>You have made a total of {{formatNumber(layer.totalResource, 2, 0, 1e9)}} resource on <resource-name :layerid="layer.layer"></resource-name></p>
<p>The highest you ever had is {{formatNumber(layer.maxResource, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>You spent {{formatTime(layer.timeSpent)}} this <resource-name :layerid="layer.layer"></resource-name></p>
<p v-if="layer.layer > 0">You have gone <resource-name :layerid="layer.layer"></resource-name> {{formatTimesReset(layer.timesReset)}} times</p>
<p v-if="layer.layer > 0 && layer.hasPower()">You have {{formatNumber(layer.power, 2, 0, 1e9)}} <resource-name :layerid="layer.layer"></resource-name>-Power</p>
</div>`
});