<template>
  <div class="q-pa-md"  >
        <div class="text-center"> 
            Here, Most of our frequently asked questions are answered here, please browse through it, and if you still have more questions, use the Help tab 
            <div class="text-center">
                <q-btn class="q-mb-lg q-mt-md" label="Help Tab" @click="goToHelp" color="primary" rounded outline />
            </div>
        </div>
        <q-list bordered>
        <q-expansion-item group="somegroup" icon="explore" label="First" default-opened header-class="text-primary" >
            <q-card>
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
            </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-teal">
            <q-card>
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
            </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="shopping_cart" label="Third" header-class="text-purple">
            <q-card>
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
            </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
            group="somegroup"
            icon="bluetooth"
            label="Fourth"
            header-class="bg-teal text-white"
            expand-icon-class="text-white"
        >
            <q-card class="bg-teal-2">
            <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
            </q-card-section>
            </q-card>
        </q-expansion-item>
        </q-list>

        
  </div>
</template>

<script> 

export default {
    name: 'faqs',
    computed: {  
        drawerState: {
            get () {
                return this.$store.state.displayLayout.drawerState
            }, 
        }
    }, 
    methods: {
        goToHelp(){
            this.$router.push('/main/Help')
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