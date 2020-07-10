<template>
    <q-page padding style="min-height: 0px; " class="">
        <q-form @submit="onSubmit"  class="q-gutter-md " >
            <div class="column q-gutter-md">
                <q-input dense color="grey-3" label-color="grey" rounded outlined name="email" v-model="email" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Email" >
                    <template #append>
                        <q-icon name="mdi-email" color="grey" />
                    </template>
                </q-input>

                <q-input dense color="grey-3" name="password" v-model="password" rounded outlined :type="isPwd ? 'password' : 'text'" label-color="grey" label="Password"  required autocapitalize="off" autocomplete="off" spellcheck="false" >
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" color="grey"  />
                    </template>
                </q-input>    
                <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
                <div class="text-left">
                    <div @click="forgotPassword"> Forgot Password ?</div>
                </div> 

                <q-btn type="submit" label="Login" rounded block  :loading="logingIn" color="primary" push  class="">
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn> 
            </div>
        </q-form>

         
        <div class="" style="background-color: transparent; height: 100px;"> </div>
        <div class="text-left q-mt-lg">
            Don't have an account? <q-btn dense rounded flat color="primary" to="/auth/signup"> Signup </q-btn>
        </div>
        
    </q-page>
</template>



<script>
import { mapActions  } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            isPwd: true,
            logingIn: false
        }
    },
    //  <q-btn no-caps unelevated color="negative" @click="triggerNegative" label="Trigger 'negative'" />
    methods: {
        ...mapActions('userAccount', ['load_user_details']),
        onSubmit(){
            const _ = this;
            if( !_.email || !_.password) return;
            
            _.logingIn = true;
             _.$axios
                .post('login',  { email: _.email, password:  _.password } )
                .then(res => {  
                    _.load_user_details(res.data)
                    _.notify('positive', 'Login Successful')
                    _.logingIn = false;
                     setTimeout(() => { 
                        _.$router.push('/main/Dashboard')
                    }, 1000); 
                })
                .catch(err => { 
                    _.notify('negative', 'Invalid Credentials')
                    _.logingIn = false;
                })  
        }, 
        forgotPassword(){
            this.$router.push('/auth/forgotPassword')
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