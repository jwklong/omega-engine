Vue.component("dynamic-upgrade", {
    props: ["upgrade"],
    computed: {
        upgradeType: function()
        {
            return this.upgrade.constructor.name;
        },
        isResourceUpgrade: function()
        {
            return this.upgrade instanceof ResourceUpgrade;
        }
    },
    template: `
<upgrade v-if="!isResourceUpgrade" :upgrade="upgrade"></upgrade>
<aleph-upgrade v-else-if="upgradeType === 'AlephUpgrade'" :upgrade="upgrade"></aleph-upgrade>
<restack-upgrade v-else-if="upgradeType === 'RestackLayerUpgrade'" :upgrade="upgrade"></restack-upgrade>`
});