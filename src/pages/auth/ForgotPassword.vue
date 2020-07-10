<template>
    <q-page padding style="min-height: 0px; ">
        <q-form @submit="submitForm">
            <div class="q-gutter-md column">
                <div class="text-center text-subtitle1 text-grey q-mb-lg">
                    Please the email attached to your account 
                </div>
                <q-input color="grey-3" label-color="grey" autocomplete="off"  :rules="emailRules"  rounded outlined name="email" v-model="email"  label="Email" >
                    <template #append>
                        <q-icon name="mdi-email-check" color="grey" />
                    </template>
                </q-input> 
                <q-btn label="Send" push rounded type="submit" :loading="submitting" color="primary"   >
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn> 
            </div>
        </q-form>
    </q-page>
</template>



<script>
export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            submitting: false,
        }
    },
    methods: {
         submitForm(){ 

        }
    }
}
</script>