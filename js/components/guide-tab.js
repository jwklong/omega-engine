Vue.component("guide-tab", {
    computed: {
        betaUnlocked: () => game.layers.length >= 2 || game.metaLayer.active,
        gammaUnlocked: () => game.layers.length >= 3 || game.metaLayer.active,
        epsilonUnlocked: () => game.layers.length >= 5 || game.metaLayer.active,
        alephUnlocked: () => game.alephLayer.isUnlocked() || game.metaLayer.active,
        restackUnlocked: () => game.restackLayer.isUnlocked() || game.metaLayer.active,
        metaUnlocked: () => game.metaLayer.active,
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="guide-tab">
    <guide-item>
        <template v-slot:title>Guide Template</template>
        <template v-slot:text>Guide Template
        </template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>Aleph Guide Template</template>
        <template v-slot:text>Guide Template
        </template>
    </guide-item>
    <guide-item v-if="restackUnlocked">
        <template v-slot:title>Restack Guide Template</template>
        <template v-slot:text>Guide Template
        </template>
    </guide-item v-if="metaUnlocked">
    <guide-item>
        <template v-slot:title>Meta Guide Template</template>
        <template v-slot:text>Guide Template
        </template>
    </guide-item>
</div>`
})
