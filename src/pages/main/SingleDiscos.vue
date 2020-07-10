<template>
    <q-page padding>
        <q-card class="my-card">
            <img :src="singleDiscos.image" v-ripple>
            <q-card-section>
                <div class="text-h6 q-mb-xs text-grey">Discos Name</div>
                 <div class="text-h4"> 
                     {{ singleDiscos.name  }}
                 </div>
            </q-card-section>

            <q-card-section>
                <div class="text-h6 q-mb-xs text-grey">
                    <q-icon name="mdi-information-outline" size="20px" class="text-blue-4" />
                    Select "Prepaid" if you load token on your meter.
                </div>
                <div class="text-h6 q-mb-xs text-grey">
                    <q-icon name="mdi-information-outline" size="20px" class="text-blue-4" />
                    Select "Postpaid" if you get a bill at the end of the month.
                </div>
            </q-card-section>

            <q-card-section >
                <!-- <q-form action="https://some-url.com" method="post"   > -->
                <q-form action="https://some-url.com" method="post"  @submit="payBill" >
                    <div class="q-gutter-md column">
                        <q-select required color="grey-3" label-color="grey" name="meterType" rounded outlined v-model="meterType" :options="['Prepaid', 'Postpaid']" label="Select Meter Type" />

                        <q-input type="number"  color="grey-3" label-color="grey" rounded outlined name="meterNumber" v-model="meterNumber" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Meter Number" >
                            <template #append>
                                <q-icon name="mdi-numeric" color="grey" />
                            </template>
                        </q-input>

                        <q-input  color="grey-3" label-color="grey" rounded outlined name="phone" v-model="phone" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Phone Number" >
                            <template #append>
                                <q-icon name="mdi-phone" color="grey" />
                            </template>
                        </q-input>

                        <q-input color="grey-3" label-color="grey"  :rules="emailRules" name="email" v-model="email" rounded outlined label="Email" >
                            <template #append>
                                <q-icon name="mdi-email-check" color="grey" />
                            </template>
                        </q-input> 

                        <q-input type="number" color="grey-3" label-color="grey"  rounded outlined name="amount" v-model="amount" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Amount" >
                            <template #append>
                                <q-icon name="mdi-cash-plus" color="green-2" />
                            </template>
                        </q-input> 

                        <q-slide-transition>
                            <div v-show="displayStates">
                                <div>
                                    <q-list bordered separator>
                                        <q-item  v-ripple v-for="(state, index) in singleDiscos.locations" :key="index">
                                            <q-item-section>{{ state  }},</q-item-section>
                                        </q-item> 
                                    </q-list>
                                </div>
                            </div>
                        </q-slide-transition> 

                        <!-- <div class="text-overline text-primary" @click="displayStates = !displayStates" > -->
                        <div class="text-h6 text-primary" @click="displayStates = !displayStates" > 
                            {{ displayStates ?   'Hide Covered States...' : 'See Covered States...' }} 
                        </div>

                        <q-btn label="Pay now" push rounded type="submit" :loading="submitting" color="primary"   >
                            <template v-slot:loading>
                                <q-spinner-facebook />
                            </template>
                        </q-btn> 
                    </div>
                </q-form>
            </q-card-section>
 
        </q-card>
    </q-page>
</template>



<script>
import { mapState } from 'vuex'
export default {
    name: 'SingleDiscos',
    computed: { 
        ...mapState('discos', {
             discos: state => state.all_discos
        }),
        drawerState: {
            get () {
                return this.$store.state.displayLayout.drawerState
            }, 
        }
    },  
    mounted() { 
        const discosId = this.$route.params.id 
        this.singleDiscos = this.discos.find( el => el.id == discosId) 
         this.$store.commit('displayLayout/updateDrawerState', false) 
    },
    beforeDestroy(){
        this.$store.commit('displayLayout/updateDrawerState', true)
    },
    data() {
        return {
            singleDiscos: {},
            meterType: '',
            meterNumber: '',
            phone: '', 
            email: '',
            amount: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            displayStates: false,
            submitting: false
        }
    },
    methods: {
        payBill(bill){
            // if ( !this.meterType || this.phone.length != 11 ) {
            if ( !this.meterType ) {
                this.triggerNotice('meterType')
                if (this.phone.length != 11) {
                    this.triggerNotice('phone')
                    return;
                } 
                return;
            }
            console.log('paying bills......')
            bill.target.submit()
        },
        triggerNotice (val) {
            this.$q.notify({
                type: 'info',
                message: val == 'meterType' ? 'Please Select Meter Type' : `Phone number must be digits.`
            })
        } 
    }, 
}
</script>