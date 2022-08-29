Vue.component("restack-tab", {
    data: function()
    {
        return {
            restack: game.restackLayer
        }
    },
    computed: {
        showMetaHint: function()
        {
            return this.restack.metaUpgrade.level.gt(0);
        },
        canRestack: function()
        {
            return this.restack.getRestackGain().gt(0);
        },
        isMeta: function()
        {
            return game.metaLayer.active;
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="restack-tab">
<button class="restack-2" @click="restack.restack()" :disabled="!canRestack" v-if="isMeta">+{{formatNumber(restack.getRestackGain(), 2, 0)}} <img alt="LC" class="inline" src="images/layercoin.svg"/></button>
<p>You have <span class="big-number">{{formatNumber(restack.layerCoins, 2, 0)}}</span> <img alt="LC" class="inline" src="images/layercoin.svg"/></p>
<button v-if="!restack.allPermUpgradesBought() && !isMeta" @click="restack.respecPermUpgrades()">Respec: get your spent <img alt="LC" class="inline" src="images/layercoin.svg"/> back, and do a ReStack without reward</button>
<h4 v-if="!isMeta">Permanent Upgrades</h4>
<div v-if="!isMeta" class="upgrades">
    <restack-upgrade v-for="(u, i) in restack.permUpgrades" :upgrade="u" :key="i"></restack-upgrade>
</div>
<h4><b>Meta</b> Upgrade</h4>
<div class="upgrades">
    <restack-upgrade :upgrade="restack.metaUpgrade"></restack-upgrade>
</div>
<div v-if="isMeta">
    <h4>Upgrade Tree</h4>
    <button class="respec" @click="restack.respecUpgradeTree()">Respec</button>
    <upgrade-tree v-if="isMeta" :upgrades="restack.upgradeTree"></upgrade-tree>
</div>
<button class="restack" @click="restack.restack()" :disabled="!canRestack" v-if="!isMeta">ReStack<br/>+{{formatNumber(restack.getRestackGain(), 2, 0)}} <img alt="LC" class="inline" src="images/layercoin.svg"/></button>
<p v-if="showMetaHint && !restack.canMeta()">Come back after reaching <resource-name :layerid="23"></resource-name></p>
<button v-if="restack.canMeta() && !isMeta" @click="restack.goMeta()" class="meta">Prestige is worthless now, we are going meta!!!</button>
</div>`
});
