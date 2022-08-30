Vue.component("layer-locked-button", {
    props: ["layerid"],
    methods: {
        maxLayerUnlocked: () => game.highestLayer,
        Decimal: (x) => new Decimal(x)
    },
    template: `<button @click="$emit('click')" :disabled="maxLayerUnlocked().gte(layerid)">
    <span v-if="maxLayerUnlocked() < layerid">Reach <resource-name :layerid="Decimal(layerid)"></resource-name></span>
    <span v-else><slot></slot></span>
</button>`
})
