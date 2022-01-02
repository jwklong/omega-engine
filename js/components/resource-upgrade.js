Vue.component("resource-upgrade", {
    props: ["upgrade", "resourcename"],
    computed: {
        canAfford: function ()
        {
            if(this.upgrade.level.eq(this.upgrade.maxLevel)) return true;
            return this.upgrade.currentPrice().lte(this.upgrade.getResource());
        },
        maxed: function()
        {
            return this.upgrade.level.eq(this.upgrade.maxLevel);
        },
        isUnlocked: function()
        {
            return this.upgrade.isBuyable === undefined || (this.upgrade.isBuyable());
        }
    },
    template: `<button :disabled="!canAfford || !isUnlocked" @click="upgrade.buy()" class="upgrade" :class="{maxed: maxed}">
<p v-html="upgrade.description"></p>
<p v-html="upgrade.getEffectDisplay()"></p>
<p class="price">{{upgrade.getPriceDisplay()}} <span v-if="upgrade.level.lt(upgrade.maxLevel)" v-html="resourcename"></span></p>
</button>`
});