Vue.component("restack-locked-button", {
    props: ["layercoins"],
    methods: {
        totalLayerCoins: () => game.restackLayer.layerCoins,
    },
    template: `<button @click="$emit('click')" :disabled="totalLayerCoins().lte(layercoins)">
    <span v-if="totalLayerCoins().lte(aleph)">Reach {{layercoins}}<img alt="LC" class="inline" src="images/layercoin.png"/></span>
    <span v-else><slot></slot></span>
</button>`
})
