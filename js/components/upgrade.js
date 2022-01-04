Vue.component("upgrade", {
    props: ["upgrade"],
    methods: {
        getResourceLayer: function()
        {
            if(this.upgrade instanceof MetaDynamicLayerUpgrade)
            {
                return this.upgrade.currentLayer();
            }
            if(this.upgrade instanceof DynamicLayerUpgrade)
            {
                return this.upgrade.getCostLayer(this.upgrade.level.toNumber());
            }
            return this.upgrade.layerCost.layer;
        },
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    computed: {
        canAfford: function ()
        {
            if(this.upgrade.level.eq(this.upgrade.maxLevel)) return true;
            if(this.upgrade instanceof MetaDynamicLayerUpgrade)
            {
                return this.upgrade.canBuy();
            }
            if(this.upgrade instanceof DynamicLayerUpgrade)
            {
                if(!this.upgrade.currentCostLayer()) return false;
                return this.upgrade.currentPrice().lte(this.upgrade.currentCostLayer().resource);
            }
            return this.upgrade.currentPrice().lte(this.upgrade.layerCost.resource);
        },
        isMetaUpgrade: function()
        {
            return this.upgrade instanceof MetaDynamicLayerUpgrade;
        },
        showLayerNumber: function()
        {
            return this.isMetaUpgrade && this.upgrade.currentLayer().gte(100);
        },
        isUnlocked: function()
        {
            return this.upgrade.isBuyable === undefined || (this.upgrade.isBuyable());
        },
        maxed: function()
        {
            return this.upgrade.level.eq(this.upgrade.maxLevel);
        }
    },
    template: `<button :disabled="!canAfford || !isUnlocked" @click="upgrade.buy()" class="upgrade" :class="{maxed: maxed}">
<p v-html="upgrade.description"></p>
<p v-html="upgrade.getEffectDisplay()"></p>
<p class="price"><label v-if="!isMetaUpgrade">{{upgrade.getPriceDisplay()}}</label> <resource-name v-if="upgrade.level < upgrade.maxLevel" :layerid='getResourceLayer()'></resource-name></p>
<p class="layer-number" v-if="showLayerNumber">#{{formatNumber(upgrade.currentLayer(), 2, 0, 1e9)}}</p>
</button>`
});