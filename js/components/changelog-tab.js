Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.1.0</template>
    <template v-slot:text>First public build, with layer names, fonts, the changelog and so much more!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.3</template>
    <template v-slot:text>Private Build
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.2</template>
    <template v-slot:text>Private Build
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.0.1</template>
    <template v-slot:text>Private Build
    </template>
</div>`
})