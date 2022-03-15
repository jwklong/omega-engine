Vue.component("layer-locked-button", {
    props: ["layerid"],
    methods: {
        maxLayerUnlocked: () => game.highestUpdatedLayer,
    },
    template: `<button @click="$emit('click')" :disabled="maxLayerUnlocked().gte(layerid)">
    <span v-if="maxLayerUnlocked().gte(layerid)">Reach <resource-name :layerid="layerid"></resource-name></span>
    <span v-else><slot></slot></span>
</button>`
})
