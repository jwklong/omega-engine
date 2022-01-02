Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "sussy game o_O",
                "when the impostor is sus",
                "&#3486;",
                "<a href='https://jwklong.github.io/Incremental-Snake'>play incremental snake</a>",
                "motd: "+Utils.getMOTD(),
                "guys i just realised that when u get layer 1.8e308 in meta there is sabotage thing that allows you to do cool stuff and btw thank you for listening to my spoiler now you know it :D",
                "hamburger",
                "what if the how is why where there",
                "monke",
                Utils.createRandomWord(250) + " sorry my cat stepped on my keyboard",
                "ERROR: " + Utils.createRandomWord(8) + " does not exist",
                "XD u just got                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 really slow text that lasts forever",
                "h m m m m m m m m m m m m m m m m m",
                "idk man, you look kinda sus",
                "i am S P E E D"
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return this.currentMessage !== "i am S P E E D" ? 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length : 3;
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