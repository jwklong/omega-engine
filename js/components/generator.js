Vue.component("generator",{
    props: ["generator"],
    computed: {
        canAfford: function()
        {
            return this.generator.currentPrice().lte(this.generator.layer.resource);
        },
        canAfford10: function()
        {
            return this.generator.getPriceUntil10().lte(this.generator.layer.resource);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<tr>
<td>Generator <layer-colored-text :layerid="generator.layer.layer" v-html="generator.name"></layer-colored-text> <span style="font-size: 70%;">x {{formatNumber(generator.getProductionMulti(), 2, 0)}}</span></td>
<td>{{formatNumber(generator.amount, 2, 0, 1e6)}} ({{formatNumber(generator.bought, 3, 0, 1e9)}})</td>
<td><button :disabled="!canAfford" @click="generator.buy()">{{formatNumber(generator.currentPrice(), 2, 0, 1e6)}} <resource-name :layerid="generator.layer.layer"></resource-name></button></td>
<td><button :disabled="!canAfford10" @click="generator.buyUntil10()">{{formatNumber(generator.getPriceUntil10(), 2, 0, 1e6)}} <resource-name :layerid="generator.layer.layer"></resource-name></button></td>
</tr>`
});