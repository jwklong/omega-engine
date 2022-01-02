Vue.component("notification-container", {
    props: ["notifications"],
    computed: {
        reversedNotifications: function()
        {
            return this.notifications.reverse();
        }
    },
    template: `<div class="notification-container">
<notification v-for="(n, i) in reversedNotifications" :key="i" :notification="n"></notification>
</div>`
});