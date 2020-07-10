<template>
  <div class="q-pa-md"  >
        <div class="text-center"> 
            Need help ? sure, but first please check our FAQs ( frequently asked questions ) if your question have been answered already, click the FAQs tab.
            <div class="text-center">
                <q-btn class="q-mb-lg q-mt-md" label="FAQs Tab" @click="goToFaqs" color="primary" rounded outline />
            </div>
        </div> 
            <div class="q-ma-sm  bg-white " >  
                <q-input class="q-mb-sm" v-model="newComment" filled autogrow counter :disable="disableComment" maxlength="500" placeholder="How can we help you ?" >
                <template v-slot:append>
                    <q-icon name="send" @click="sendChat" />
                </template>
            </q-input> 
        </div> 
        <!-- Ajax bar loading to notify user when comment is successfully posted. -->
        <q-ajax-bar ref="bar" position="bottom" color="primary" size="10px" skip-hijack /> 


        
  </div>
</template>

<script>
export default {
    name: 'help',
    data(){
        return {
             newComment: '',
              disableComment: false,
        }
    },
    computed: {  
        drawerState: {
            get () {
                return this.$store.state.displayLayout.drawerState
            }, 
        }
    }, 
    methods: {
         goToFaqs(){
            this.$router.push('/main/FAQs')
        },
        sendChat(){
            if(!this.newComment.trim()) return; 
            this.disableComment = true; 
            const bar = this.$refs.bar

            bar.start()

            this.timer = setTimeout(() => {
                if (this.$refs.bar) {
                     this.$refs.bar.stop()
                } 
                this.newComment = '';
                 this.disableComment = false; 
            }, Math.random() * 3000 + 1000)
        }
    },
    mounted() {  
         this.$store.commit('displayLayout/updateDrawerState', false) 
    },
    beforeDestroy(){
        this.$store.commit('displayLayout/updateDrawerState', true)
    },

}
</script>