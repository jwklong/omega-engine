Vue.component("meta-layer", {
    data: function()
    {
        return {
            metaLayer: game.metaLayer
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    computed: {
        showLayersPS: function()
        {
            return this.metaLayer.getLayersPS().gte(10);
        },
        showPowerers: function()
        {
            return game.restackLayer.upgradeTreeNames.unlockResourcePowerers.apply();
        },
        canMaxAll: function()
        {
            return game.restackLayer.upgradeTreeNames.substractLayers.apply();
        }
    },
    template: `<div class="meta-layer">
<p class="resource">You have {{formatNumber(metaLayer.resource, 2, 0, 1e9)}} <resource-name :layerid="metaLayer.layer.floor()"></resource-name></p>
<p class="resource alpha" v-if="metaLayer.layer.gt(0)">You have approx. {{formatNumber(metaLayer.getApproxAlpha(), 2, 0, 1e9)}} <resource-name :layerid="0"></resource-name></p>
<p class="layer">You are on Layer {{formatNumber(metaLayer.layer.add(1), 2, 0, 1e12)}}</p>
<p>Your resources are multiplied by x{{formatNumber(metaLayer.getMultiPS(), 2, 2)}} each second
<span v-if="showLayersPS"><br/>and thus advancing {{formatNumber(metaLayer.getLayersPS(), 2, 2)}} layers per second</span></p>
<button v-if="canMaxAll" @click="metaLayer.maxAll()" class="max-all">Max All (M)</button>
<h4>Resource Multipliers</h4>
<upgrade-container :upgrades="metaLayer.multiplierUpgrades"></upgrade-container>
<h4 v-if="showPowerers">Resource Powerers</h4>
<upgrade-container v-if="showPowerers" :upgrades="metaLayer.powerUpgrades"></upgrade-container>
</div>`
})
