<template>
    <q-page >   
        <q-carousel animated v-model="slide" swipeable navigation infinite autoplay height="400px"   transition-prev="slide-right" transition-next="slide-left" >
            <q-carousel-slide :name="1" img-src="../../statics/images/banner.jpeg" />
            <q-carousel-slide :name="2" img-src="../../statics/images/banner1.jpg" />
            <q-carousel-slide :name="3" img-src="../../statics/images/banner2.jpg" />
            <q-carousel-slide :name="4" img-src="../../statics/images/banner3.jpg" />
        </q-carousel>
        <div class="row flex-center ">
            <q-card class="col-xs " style="background-image: url('../../statics/images/bkg.svg ')" >
            
                <q-card-section class="flex justify-between" >
                    <div> Wallet Balance </div>
                    <div class="text-green">  &#8358; {{ parseInt(user.balance).toLocaleString()  }} </div>
                </q-card-section>  
                <q-card-section class="flex justify-between" v-if="user.staus == 3">
                    <div> Total Discount </div>
                    <div class="text-green">  &#8358; {{ user.discount == null  ? 0 :  parseInt(user.discount).toLocaleString()  }} </div>
                </q-card-section>   
            </q-card>
        </div>
        <div class="q-gutter-sm row q-pa-sm">
        <!-- <div class="q-gutter-sm row  q-mt-lg q-pa-sm"> -->
            <q-card class="col-xs   text-center" style="background-image: url('../../statics/images/bkg.svg ')" @click="allDiscos = true" >
                <q-card-section >
                    <q-icon style="font-size: 4.4em;"  name="mdi-lightbulb-on" color="yellow"  />
                </q-card-section>  
                <q-card-section >
                    Buy Electricity
                </q-card-section>  
            </q-card>
            <q-card class="col-xs   text-center" style="background-image: url('../../statics/images/bkg.svg ')" @click="moveCommission" >
                <q-card-section >
                    <q-icon style="font-size: 4.4em;"  name="mdi-cash-multiple" color="green"  /> 
                </q-card-section>    
                <q-card-section >
                   Move Commission  
                </q-card-section>  
            </q-card>
        </div>
         <div class="q-gutter-sm row q-pa-sm">
            <q-card class="col-xs   text-center" style="background-image: url('../../statics/images/bkg.svg ')" @click="viewHistory()"> 
                <q-card-section >
                    <q-icon style="font-size: 4.4em;"  name="mdi-history" color="grey"  /> 
                </q-card-section>  
                <q-card-section >
                   Order Histroy  
                </q-card-section>
            </q-card>
            <q-card class="col-xs  text-center" style="background-image: url('../../statics/images/bkg.svg ')" @click="account = true"   > 
                <!-- <q-card-section class="text-green">
                &#8358; 20.82
                </q-card-section> -->
                 <q-card-section >
                    <q-icon style="font-size: 4.4em;"  name="mdi-view-dashboard-outline" color="primary"  /> 
                </q-card-section>  
                <q-card-section >
                   Account Details  
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
                                <div class="col-6" v-for="disco  in discos" :key="disco.id">
                                    <q-card class="my-card " v-ripple @click="displayDiscos(disco.id)">
                                        <q-img :src="disco.image"  /> 
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

        <!-- This will be a dialog that will display Account Details Summary -->
        <q-dialog v-model="account" full-width  >
            <q-card>    
                <div class="ustify-center bg-grey-1"> 
                    
                    <div class=" bg-grey-3  text-center q-ma-xs" >
                        <q-card-section >
                            Account Number
                        </q-card-section>  
                        <q-card-section  class="text-green text-weight-bolder">
                            {{  user.account_no  }}
                        </q-card-section>
                    </div> 
                </div>   
            </q-card> 
        </q-dialog> 

        
    </q-page>
</template>

<style  scoped>
    
</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    computed: { 
        ...mapState('discos', {
             discos: state => state.all_discos
        }),
        ...mapState('userAccount', {
             user: state => state.user
        }),
    }, 
    data() {
        return {
            allDiscos: false,  
            account: false,  
            slide: 1,
            accountInfo: [
                { tag: 'id', title: 'Wallet ID', subtitle: '232454' },
                { tag: 'num', title: 'Acc Num.', subtitle: '9087675343221' },
                { tag: 'bal', title: 'Wallet Balance.', subtitle: '2400' },
                { tag: 'com', title: 'Commission.', subtitle: '20' },
            ]
        }
    },
  mounted() {
    this.load_discos()
  },
    methods: {
        ...mapActions('discos', ['load_all_discos']),
        load_discos(){
            const _ = this;
            _.$axios
            .get('disco')
            .then(res => {
                _.load_all_discos(res.data)
            })
            .catch(err => {
                _.notify('negative', 'Sorry, an Error Occured.')
            })
        },
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
        },
        viewHistory(){
            this.$router.push('/main/History' )
        },
        notify(type,message){
            this.$q.notify({
                type: type,
                message: message,
                timeout: 1000
            })
        }
    },
}
</script>