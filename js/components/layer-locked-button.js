Vue.component("layer-locked-button", {
    props: ["layerid"],
    methods: {
        maxLayerUnlocked: () => game.highestLayer,
        layerdecimalid: () => new Decimal(this.layerid)
    },
    template: `<button @click="$emit('click')" :disabled="maxLayerUnlocked() < layerdecimalid">
    <span v-if="maxLayerUnlocked().gte(layerdecimalid)">Reach <resource-name :layerid="layerid"></resource-name></span>
    <span v-else><slot></slot></span>
</button>`
})
