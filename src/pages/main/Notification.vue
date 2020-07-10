<template>
    <div> 
        <div class="" style="width: 100%"> 

            <q-list bordered> 

            <q-separator />
            <q-item-label header>Notification Lists</q-item-label>

            <q-item v-for="note in 10" :key="note" class="q-mb-sm" clickable v-ripple >
                <q-item-section avatar>
                <q-avatar>
                    <img :src="`https://cdn.quasar.dev/img/avatar2.jpg`">
                </q-avatar>
                </q-item-section>

                <q-item-section @click="viewNotification(note)">
                    <q-item-label>DISCOS_COMMISSION</q-item-label>
                    <q-item-label caption lines="1"> Payment Successful </q-item-label>
                </q-item-section>

                <q-item-section side>
                     <q-icon name="mdi-delete-empty" @click="deleteNotification(note)" color="red-4" />
                </q-item-section>
            </q-item>
            </q-list>
        </div> 

        <!-- This is the Dialog for single Notification -->
        <q-dialog v-model="singleNotification" persistent maximized transition-show="slide-up" transition-hide="slide-down" >
            <q-card  >
                <q-bar class="text-white bg-primary q-pa-lg"> 
                    <q-btn dense size="lg" flat icon="mdi-chevron-left" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn> 
                    <div>
                        George 
                    </div> 
                </q-bar>

                <q-card-section>
                <div class="text-h6">DISCOS_COMMISSION</div>
                <q-separator inset  color="grey"/>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Your payment was successfull , thank you... You can print you transaction slip from the transaction History page
                </q-card-section> 
            <div class="text-center q-mb-lg " style="position: fixed; bottom: 0; left: 20px;  text-align: center; ">
                <q-btn rounded class="q-mr-lg" outline icon="mdi-chevron-left" label="Back" v-close-popup/>
                <q-btn rounded outline icon="mdi-delete" color="red-3"  label="Delete Notificaion" @click="deleteNotification()"  />
            </div>
            </q-card>
        </q-dialog>
    </div>
</template>



<script>  
export default {
    name: 'Notification',
    data () {
        return { 
            singleNotification: false
        }
    },
    methods: {
        viewNotification(id){
            const _ = this;
            _.singleNotification = !_.singleNotification
        },
        deleteNotification(val){
            const _ = this; 
           _.$q.dialog({
                title: 'Confirm Delete',
                type: 'error',
                message: 'Would you like to Delete this Notification?',
                cancel: true, 
                persistent: true
            }).onOk(() => {
                // console.log('>>>> OK')
                _.singleNotification == true ? _.singleNotification = false : ''
            }).onOk(() => {
                console.log('>>>> second OK catcher: ' + val)
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        }
    },
}
</script>