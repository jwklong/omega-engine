Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "modding.net",
                "layer name moment",
                "weird themes",
                "hey, you could make a mod out of this",
                "when the imp- oh wrong mod",
                "basically there is a thi- (softcapped)",
                "incremental thing i guess",
                "omega layers but steam engine",
                "mod.js: powering layers",
                "i ran out of words on my hard drive :(",
                "what if i told you that secret achievements are real",
                "omega layers 2, coming in 2048 years",
                "finally a major release",
                "go visit omega layers ez and sussy layers 2",
                "join the community server",
                "content when",
                "omega engine v-1.0.0: we removed all the features that aren't the main game"
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length;
        }
    },
    methods: {
        getMessage: function()
        {
            const arr = Array.from(this.messages);
            if(this.messageIndex !== -1)
            {
                arr.splice(this.messageIndex, 1);
            }
            const index = Math.floor(Math.random() * arr.length);
            this.messageIndex = index;
            const element = arr[index];
            this.currentMessage = typeof element === "string" ? element : element();
        }
    },
    mounted: function()
    {
        this.getMessage();
        this.$refs.message.onanimationiteration = e =>
        {
            const anim = this.$refs.message.style.animation.slice();
            this.getMessage();
            this.$refs.message.style.animation = "none";
            void this.$refs.message.offsetWidth; //very black magic
            this.$refs.message.style.animation = anim;
            Vue.nextTick(() =>
            {
                if(this.$refs.message.style.animationDuration === "")
                {
                    this.$refs.message.style.animationDuration = this.animationDuration + "s";
                }
            });
        };
    },
    template: `<div class="news-ticker">
    <span ref="message" :style="{'animation-duration': animationDuration + 's'}" v-html="currentMessage"></span>
</div>`
})
