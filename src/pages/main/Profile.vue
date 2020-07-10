<template>
    <div>
        <q-form @submit="onSubmit" class=" q-ma-lg" >
            
            <div class="q-gutter-md q-mt-lg" >
                <q-input filled v-model="user.account_name" label="Fullname" >
                    <template #append>
                        <q-icon name="mdi-account" />
                    </template>
                </q-input>
                <q-input filled v-model="user.phone" label="Phone Number" disable >
                    <template #append>
                        <q-icon name="mdi-numeric" />
                    </template>
                </q-input>
                <q-input filled v-model="user.account_no" label="Account Number" disable >
                    <template #append>
                        <q-icon name="mdi-numeric" />
                    </template>
                </q-input>  
                <q-input filled v-model="user.balance" label="Account Balance" prefix="N" disable >
                    <template #append>
                        <q-icon name="mdi-cash-multiple" />
                    </template>
                </q-input> 
                <q-input filled v-model="user.balance" label="Wallet ID" disable >
                    <template #append>
                        <q-icon name="mdi-numeric" />
                    </template>
                </q-input> 
                <q-input filled v-model="user.balance" label="Commission" disable >
                    <template #append>
                        <q-icon name="mdi-lightbulb-group" />
                    </template>
                </q-input>   
                <q-btn type="submit" label="Update" rounded block  :loading="updateBtn" color="primary" push style="width: 95%; " >
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn> 
            </div>
        </q-form>
    </div>
</template>



<script>
import { mapState, mapActions  } from 'vuex'
export default {
    name: 'Profile',
    data(){
        return {
            text: '',
            updateBtn: false
        }
    },
    computed: {
        ...mapState('userAccount', {
             user: state => state.user
        }),
    },
    mounted() {
        
    },
    methods: {
        ...mapActions('userAccount', ['load_user_details']),
        onSubmit(){
            const _ = this;
            if( !_.user.account_name) return
            _.updateBtn = true;
            _.$axios
            .put(`update-profile/${_.user.id}`,   _.user.account_name )
            .then(res => { 
                // the response data, should contain the user's details again, which will be used to update the state
                _.load_user_details(res.data)
                _.notify('positive', 'Update Successful')
                _.updateBtn = false
            })
            .catch(err => {
                _.notify('negative', 'Please try again')
                _.updateBtn = false
            })
        }, 
        notify(type,message){
            this.$q.notify({
                type: type,
                message: message,
                timeout: 1000
            })
        }
    }
// https://buypowernow.com/api/update-profile/2
}
</script>
