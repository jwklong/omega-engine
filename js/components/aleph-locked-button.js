Vue.component("aleph-locked-button", {
    props: ["aleph"],
    methods: {
        totalAleph: () => game.alephLayer.aleph,
    },
    template: `<button @click="$emit('click')" :disabled="totalAleph().gte(aleph)">
    <span v-if="totalAleph().gte(aleph)">Reach {aleph} <span class="aleph">ℵ</span></span>
    <span v-else><slot></slot></span>
</button>`
})
