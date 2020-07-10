<template>
    <q-page padding style="min-height: 0px; " class="">
        <q-form  @submit="submitForm"> 
            <div class="q-gutter-md column">


                <q-input dense  color="grey-3" label-color="grey" rounded outlined name="fullname" v-model="fullname" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Full Name" >
                    <template #append>
                        <q-icon name="mdi-sort-alphabetical-ascending-variant" color="grey" />
                    </template>
                </q-input>

                <q-input dense color="grey-3" label-color="grey"  :rules="emailRules" name="email" v-model="email" rounded outlined label="Email" >
                    <template #append>
                        <q-icon name="mdi-email-check" color="grey" />
                    </template>
                </q-input> 

                <q-input dense  color="grey-3" label-color="grey" rounded outlined name="phone" hint="Phone number MUST be 11 digits" v-model="phone" autocorrect="off" required autocapitalize="off" autocomplete="off" spellcheck="false" label="Phone Number" >
                    <template #append>
                        <q-icon name="mdi-phone" color="grey" />
                    </template>
                </q-input>

                <q-input dense  color="grey-3" name="password" v-model="password" rounded outlined :type="isPwd ? 'password' : 'text'" label-color="grey" label="Password"  required autocapitalize="off" autocomplete="off" spellcheck="false" >
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" color="grey"  />
                    </template>
                </q-input> 

                <q-select dense color="grey-3" label-color="grey" rounded outlined v-model="account" :options="['User', 'Agent']" label="Select Account" />


                <q-toggle v-model="accept" label="I accept the license and terms"  required/> 

                <div class="text-center" v-if="!accept"> 
               <q-btn  flat rounded> 
                   <a href="javascript: ;" style="text-decoration: none; color: blue; text-transform: capitalize; "> Please Read The Terms & Conditions Before Continuing </a>
               </q-btn>
                <!-- Insert the external link to it on the web -->
                </div>

                <q-btn label="Signup" push rounded type="submit" :loading="submitting" color="primary"   >
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn> 
            </div> 
        </q-form>
        <div class="" style="background-color: transparent; height: 10px;"> </div>
        <div class="text-left q-mt-lg">
            Already have an account? <q-btn dense rounded flat color="primary" to="/auth/"> Login </q-btn>
        </div>
    </q-page>
</template>



<script>
import { mapActions  } from 'vuex'
export default {
    name: 'Signup',
    data() {
        return {
            fullname: '',
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            phone: '',
            password: '',
            account: '',
            isPwd: true,
            accept: false,
            submitting: false,
        }
    },
    methods: {
        ...mapActions('userAccount', ['load_user_details']),
        submitForm(){ 
            const _ = this;
            if((!_.accept) || (!_.password) || (!_.fullname) || (!_.account) ) return; 

            let data = {
                first_name: _.fullname.split(' ')[0],
                last_name:  _.fullname.split(' ')[1],
                email: _.email,
                phone:  _.phone,
                password: _.password,
                userid: _.account == 'User' ? 2 : 3
            }
             _.$axios
                .post('register',  data )
                .then(res => { 
                    _.load_user_details(res.data)
                    _.notify('positive', 'Registeration Successful')
                    _.submitting = false;
                     setTimeout(() => { 
                        this.$router.push('/main/Dashboard')
                    }, 1000); 
                })
                .catch(err => {
                    _.notify('negative', 'Please try again')
                    _.submitting = false;
                }) 
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