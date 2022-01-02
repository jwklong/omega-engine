Vue.component("guide-tab", {
    computed: {
        betaUnlocked: () => game.layers.length >= 2 || game.metaLayer.active,
        gammaUnlocked: () => game.layers.length >= 3 || game.metaLayer.active,
        epsilonUnlocked: () => game.layers.length >= 5 || game.metaLayer.active,
        alephUnlocked: () => game.alephLayer.isUnlocked() || game.metaLayer.active,
        restackUnlocked: () => game.restackLayer.isUnlocked() || game.metaLayer.active,
        metaUnlocked: () => game.metaLayer.active,
        sabotageUnlocked: () => game.sabotageLayer.isUnlocked()
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="guide-tab">
    <guide-item>
        <template v-slot:title>thing</template>
        <template v-slot:text>welcome to sussy layers now go away
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>something about save</template>
        <template v-slot:text>uhh there something in settings i think
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>genera</template>
        <template v-slot:text>its a thing
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>upgra</template>
        <template v-slot:text>its a thing that upgrades the thing
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>uygfdsjsfjd</template>
        <template v-slot:text>u can do something when it says u can
        </template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>auto no people</template>
        <template v-slot:text>we dont need u anymore goodbye
        </template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>uhm</template>
        <template v-slot:text>its a thing that also upgrades the thing
        </template>
    </guide-item>
    <guide-item v-if="betaUnlocked">
        <template v-slot:title>pow</template>
        <template v-slot:text>uhm kfhdsfskdfjdsafakds</template>
    </guide-item>
    <guide-item v-if="gammaUnlocked">
        <template v-slot:title>challeng</template>
        <template v-slot:text>get better</template>
    </guide-item>
    <guide-item v-if="gammaUnlocked">
        <template v-slot:title>vol</template>
        <template v-slot:text>uhm i think its volume</template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>tasks</template>
        <template v-slot:text>get task
        </template>
    </guide-item>
    <guide-item v-if="alephUnlocked">
        <template v-slot:title>layontor</template>
        <template v-slot:text>kdhfjdskdsklfjgsdsfidsoli
        </template>
    </guide-item>
    <guide-item v-if="epsilonUnlocked">
        <template v-slot:title>tee</template>
        <template v-slot:text>wow tee
        </template>
    </guide-item>
    <guide-item v-if="restackUnlocked">
        <template v-slot:title>stacc</template>
        <template v-slot:text>confuse
        </template>
    </guide-item>
    <guide-item v-if="metaUnlocked">
        <template v-slot:title>better</template>
        <template v-slot:text>get better at game
        </template>
    </guide-item>
    <guide-item v-if="sabotageUnlocked">
        <template v-slot:title>sabotag</template>
        <template v-slot:text>o no i have to go fix everything
        </template>
    </guide-item>
</div>`
})