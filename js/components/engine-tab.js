Vue.component("engine-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.1<</template>
    <template v-slot:text>Support for layer names, a new Modern theme, the Source Code Pro font, what more could you ask for!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title><h1>v1.0.0</h1></template>
    <template v-slot:text>The biggest update yet! Adds many new debug mode features, two new themes (one replacing the old light theme), new button stylings, latin layer names, updated layer name finder, ubuntu font, and alot of bug fixing!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.3</template>
    <template v-slot:text>New achievements & aleph locked buttons!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.2</template>
    <template v-slot:text>Challenges can now give a restack reward and endgame menu added!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.1</template>
    <template v-slot:text>All buttons menu in debug mode, new random layer names and 4th infinity!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.2.0</template>
    <template v-slot:text>Debug mode, game changelog (different to engine changelog), minecraft font, link to the community server (which you should join) and alot more!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v0.1.3</template>
    <template v-slot:text>Parts of UI are redesigned, and new Secret Achievements!
    </template>
    </guide-item>
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
    <template v-slot:title>v0.0.1-v0.0.3</template>
    <template v-slot:text>Private Builds
    </template>
    </guide-item>
</div>`
})
