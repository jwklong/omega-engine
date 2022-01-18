Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v0.1.3</template>
    <template v-slot:text>Parts of UI are redesigned, and new Secret Achievements!
    </template>
    <guide-item>
    <template v-slot:title>v0.1.2</template>
    <template v-slot:text>Adds Comfortaa font and a automator to automate buying automators! (unlocked when meta upgrade bought)
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.1.1</template>
    <template v-slot:text>Fixes a few bugs and adds save management, now you can have more then 1 save stored!
    </template>
    </guide-item>
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
    </guide-item>
</div>`
})