Vue.component("restack-locked-button", {
    props: ["layercoins"],
    methods: {
        totalLayerCoins: () => game.restackLayer.layerCoins,
        Decimal: (x) => new Decimal(x)
    },
    template: `<button @click="$emit('click')" :disabled="Decimal(totalLayerCoins()).lt(layercoins)">
    <span v-if="Decimal(totalLayerCoins()).lt(aleph)">Reach {{layercoins}}<img alt="LC" class="inline" src="images/layercoin.svg"/></span>
    <span v-else><slot></slot></span>
</button>`
})
