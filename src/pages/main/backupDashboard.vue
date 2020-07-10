<template>
    <q-page >   
        <div class="q-gutter-sm row  q-mt-lg q-pa-sm">
            <q-card class="col-12 col-sm-3 text-center" style="background-image: url('../../statics/images/bkg.svg ')">
                <q-card-section class="bg-grey-3">
                    Wallet ID
                </q-card-section> 
                <q-card-section>
                    ABC DEF
                </q-card-section>
            </q-card>
            <q-card class="col-12 col-sm-3 text-center" style="background-image: url('../../statics/images/bkg.svg ')">
                <q-card-section class="bg-grey-3">
                   Providus Account Number
                </q-card-section> 
                <q-card-section>
                    VCN1778390
                </q-card-section>
            </q-card>
            <q-card class="col-12 col-sm-3 text-center" style="background-image: url('../../statics/images/bkg.svg ')">
                <q-card-section class="bg-grey-3">
                    Wallet Balance
                </q-card-section> 
                <q-card-section class="text-green">
                &#8358; 8,457.58
                </q-card-section>
            </q-card>
            <q-card class="col-12 col-sm text-center" style="background-image: url('../../statics/images/bkg.svg ')">
                <q-card-section class="bg-grey-3">
                    Commission
                </q-card-section> 
                <q-card-section class="text-green">
                &#8358; 20.82
                </q-card-section>
            </q-card>
        </div>
        <div class="text-center q-mt-lg">
            <q-btn outline rounded color="primary" class="q-mr-xs" @click="moveCommission">  
                <q-icon name="mdi-cash-multiple" color="green" class="q-pr-md"/> 
                Move Commission  
            </q-btn>
            <q-btn outline rounded color="primary" @click="allDiscos = true"> 
                <q-icon name="mdi-lightbulb-on" color="yellow" class="q-pr-md"/>
                Pay Electricity  
            </q-btn> 
        </div>
 
        <div class="row justify-around q-mt-lg q-mb-lg q-pa-md bg-primary text-white" >
            <div class="text-center">
                <div>
                    <q-icon name="mdi-cash-multiple" size="40px" class="text-grey" />
                </div>
                 Move <br> Commission  
            </div>
            <div class="text-center">
                <div>
                    <q-icon name="mdi-cash-refund" size="40px" class="text-grey" />
                </div>
                 Payment <br> History  
            </div>
            <div class="text-center">
                <div>
                    <q-icon  name="mdi-history" size="40px" class="text-grey" />
                </div>
                 Transaction <br> History
            </div>
        </div>

        <div class="q-mt-lg q-pl-md q-pr-md">
            <q-card class="col text-center" v-ripple  @click="allDiscos = true">
                <q-card-section class="text-h4">
                    Pay Electricity Bills
                </q-card-section> 
                <q-separator inset />
                <q-card-section>
                    Click, Select Your  Regions's  Electricity Provider Company
                </q-card-section>
            </q-card>
        </div>
 

        <!-- This will be a dialog that will display all the discos for electricity -->
        <q-dialog v-model="allDiscos" full-width  full-height>
            <q-card>
                <q-card-section class="bg-grey-3">
                     <div class="text-h6">Please Select Discos</div>
                </q-card-section>
  
                <q-card-section class="q-pt-none" > 
                    <div class="q-pa-md" >
                        <div class="q-gutter-x-xs q-gutter-y-lg"> 
                            <div class="row q-col-gutter-md">
                                <!-- <div class="col-4" v-for="n in 10" :key="`md-${n}`"> -->
                                <div class="col-6" v-for="disc  in discos" :key="disc.id">
                                    <q-card class="my-card " v-ripple @click="displayDiscos(disc.id)">
                                        <q-img :src="disc.img"  /> 
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section> 

                 <q-separator /> 
                <q-card-actions class="text-primary">
                    <q-btn rounded color="primary" push label="Close" v-close-popup class="col" />
                </q-card-actions>
            </q-card>
           
            
        </q-dialog> 

        
    </q-page>
</template>

<style  scoped>
    
</style>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Dashboard',
    computed: { 
        ...mapState('discos', {
             discos: state => state.discos
        })
    }, 
    data() {
        return {
            allDiscos: false,  
        }
    },
    methods: {
        displayDiscos(id){
            this.$router.push(`/main/SingleDiscos/${id}`)
        },
        moveCommission () {
            this.$q.dialog({
                title: 'Move From Commission To Wallet',
                message: 'Enter amount please',
                prompt: {
                model: '',
                isValid: val => val.length > 2, // << here is the magic
                type: 'number' // optional 
                },
                cancel: true,
                persistent: true
            }).onOk(data => {
                console.log('>>>> OK, commission moved to wallet ', data)
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        }
        // commingSoon(){
        //     this.$q.notify({
        //         type: 'info',
        //         message: "Comming Soon !!!"
        //     })
        // }
    },
}
</script>