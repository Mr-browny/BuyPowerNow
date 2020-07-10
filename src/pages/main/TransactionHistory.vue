<template>
    <div class="">
        <q-table title="Transaction History"  :filter="filter" :data="data" :columns="columns" row-key="type" >
            <template v-slot:top>   
                <q-input borderless dense filled debounce="300" color="primary" class="col" v-model="filter"   placeholder="Search Transaction...">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
                <template v-slot:before>
                    <q-icon name="mdi-download" color="primary"  @click="exportTable"/>
                </template>
                <template v-slot:after>
                    <q-icon name="mdi-filter" color="primary" @click="filterDialog = !filterDialog "/>
                </template>
                </q-input>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props" @click="viewTransaction(props.row.transactionReference)">
                    <q-td key="type" :props="props"> 
                        <!-- <q-chip color="primary" text-color="white" icon="mdi-credit-card-plus-outline"> -->
                        <q-chip  :color="props.row.type == 'Credit' ? 'primary' :  'grey' "   text-color="white" :icon=" props.row.type == 'Credit' ? 'mdi-credit-card-plus-outline' :  'mdi-credit-card-minus-outline' ">
                            {{ props.row.type }}
                        </q-chip>
                    </q-td>
                    <q-td key="transactionReference" :props="props">
                        {{ props.row.transactionReference }} 
                    </q-td>
                    <q-td key="description" :props="props">
                        {{ props.row.description }} 
                    </q-td>
                    <q-td key="amount" :props="props" :class="props.row.type == 'Credit' ? 'text-primary' :  'text-red'">
                        &#8358; {{ props.row.amount }} 
                    </q-td>
                    <q-td key="date" :props="props">
                        {{ props.row.date }} 
                    </q-td>
                    
                </q-tr>
            </template>
        </q-table>

        <!-- This is the dialog for the filter settings  -->
        <q-dialog v-model="filterDialog" position="bottom">
            <q-card style="width: 100%">
                <q-linear-progress :value="0.8" color="primary" />

                 <q-card-section>
                     <div class="q-gutter-md column"> 
                         <div class="text-grey-8"> Filter Settings </div>
                            <q-select rounded dense outlined v-model="filterBy" :options="['All', 'A', 'B']" label="Filter By" /> 
                            <q-select rounded dense outlined v-model="transactionType" :options="['All', 'Credit', 'Debit']" label="Transaction Type" /> 
                            <q-input rounded dense outlined  label="Reference" /> 
                            <q-input rounded dense outlined label="From" v-model="FromDate" mask="date" :rules="['date']">
                                <template v-slot:prepend>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="FromDateRef" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="FromDate" @input="() => $refs.FromDateRef.hide()" />
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                            <q-input rounded dense outlined label="To" v-model="ToDate" mask="date" :rules="['date']">
                                <template v-slot:prepend>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="ToDateRef" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="ToDate" @input="() => $refs.ToDateRef.hide()" />
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>



                            <q-btn color="primary" rounded class="col" block  text-color="white" label="Filter" />
                        </div> 
                 </q-card-section>
            </q-card>
        </q-dialog>


        <!-- This is the Dialog for single Transaction History -->
        <q-dialog v-model="singleTransaction" persistent maximized transition-show="slide-up" transition-hide="slide-down" >
            <q-card class="">
                <q-bar class="text-white bg-primary q-pa-lg"> 
                    <q-btn dense size="lg" flat icon="mdi-chevron-left" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn> 
                    <div>
                        Transaction Summary 
                    </div> 
                </q-bar> 

                <q-card-section class="q-pt-none scroll " style="height: 90vh; "> 
                        <div class="q-pt-md q-mb-lg q-pb-lg">
                            <div class="q-gutter-md" >
                                <q-input filled v-model="text" label="Date"  disable>
                                    <template #append>
                                        <q-icon name="mdi-calendar-range" />
                                    </template>
                                </q-input>
                                <q-input filled v-model="text" label="Token"  disable>
                                    <template #append>
                                        <q-icon name="mdi-xml" />
                                    </template>
                                </q-input>
                                <q-input filled v-model="text" label="Amount"  disable>
                                    <template #append>
                                        <q-icon name="mdi-cash-multiple" />
                                    </template>
                                </q-input>  
                                <q-input filled v-model="text" label="Transaction Reference"  disable>
                                    <template #append>
                                        <q-icon name="mdi-twitter-retweet" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Receipt Number"  disable>
                                    <template #append>
                                        <q-icon name="mdi-numeric" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Discos Type" disable>
                                    <template #append>
                                        <q-icon name="mdi-lightbulb-group" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Meter Number"  disable>
                                    <template #append>
                                        <q-icon name="mdi-numeric" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Meter Type"  disable>
                                    <template #append>
                                        <q-icon name="mdi-speedometer" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Phone Number"   disable>
                                    <template #append>
                                        <q-icon name="mdi-phone" />
                                    </template>
                                </q-input> 
                                <q-input filled v-model="text" label="Email" class="q-mb-lg" disable>
                                    <template #append>
                                        <q-icon name="mdi-email-check" />
                                    </template>
                                </q-input> 
                            </div>
                        </div> 
                </q-card-section> 
                <div class="text-center bg-white q-pa-md" style="position: fixed; width: 100%;   bottom: 0;   text-align: center; ">
                    <q-btn rounded class="q-mr-lg"  icon="mdi-chevron-left" label="Back" v-close-popup/>
                    <q-btn rounded  icon="mdi-download" color="primary"  label="Download" @click="transactionReceipt = true" />
                </div>
            </q-card>
        </q-dialog>


        <!-- This is for the Receipt Printing -->
        <q-dialog v-model="transactionReceipt" full-width >
            
            <q-card>
                <q-bar class="text-white bg-primary q-pa-lg">  
                    <div>
                        e-Receipt 
                    </div> 
                    <q-space />
                    <div> RC: 7884589340354 </div>
                 </q-bar>  

                <q-card-section class="q-pt-none text-center">
                    <q-icon name="mdi-lightbulb-on" color="yellow" style="font-size: 14em; " />
                </q-card-section>

                <q-card-section class="text-center">
                     <div class="text-h6">BuyPowerNow</div>
                     <div class="subtitle2">Thank You For Making The Order</div>
                     <!-- <div class="subtitle2">Thank You For Making The Order</div> -->
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
    </div>
</template>

<script>

import { exportFile } from 'quasar'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}



export default {
    data () {
        return {
            filter: '',
            filterDialog: false,
            filterBy: '',
            transactionType: '',
            FromDate: null, 
            ToDate: null, 
            singleTransaction: false,
            transactionReceipt: false,
            text: '',
            columns: [
                { name: 'type', required: true, label: 'Type', align: 'left', field: row => row.type, format: val => `${val}`, sortable: true },
                { name: 'transactionReference', align: 'left', label: 'Transaction Reference', field: 'transactionReference', sortable: true },
                { name: 'description', label: 'Description',  align: 'left', field: 'description', sortable: true },
                { name: 'amount', label: 'Amount', align: 'center', field: 'amount' },
                { name: 'date', label: 'Date', align: 'center', field: 'date' }, 
            ],

            data: [ 
                {
                type: 'Credit',
                transactionReference: '452452345254567',
                description: 'DISCO_COMMISSION: Commission',
                amount: '3232',
                date: new Date().toLocaleDateString(), 
                }, 
                {
                type: 'Debit',
                transactionReference: '767896786781343',
                description: 'DISCO: Electricity Purchase',
                amount: '10000',
                date: new Date().toLocaleDateString(), 
                }, 
                {
                type: 'Credit',
                transactionReference: '1232548809863563',
                description: 'DISCO_COMMISSION: Commission',
                amount: '12500',
                date: new Date().toLocaleDateString(), 
                }, 
                {
                type: 'Debit',
                transactionReference: '756657856745234523',
                description: 'DISCO: Electricity Purchase',
                amount: '7000',
                date: new Date().toLocaleDateString(), 
                }, 
                
                
            ]
        }
    },
    computed: {
        drawerState: {
            get () {
                return this.$store.state.displayLayout.drawerState
            }, 
        }
    }, 
    mounted(){ 
        this.$store.commit('displayLayout/updateDrawerState', false)  
    },
    beforeDestroy(){
        this.$store.commit('displayLayout/updateDrawerState', true)
    },
    methods: {
        exportTable () {
            // naive encoding to csv format
            const content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
                this.data.map(row => this.columns.map(col => wrapCsvValue(
                typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                col.format
                )).join(','))
            ).join('\r\n')

            const status = exportFile( 'BuyPower-Transaction-Table-Export.csv', content, 'text/csv' )

            if (status !== true) {
                this.$q.notify({
                message: 'Browser denied file download...',
                color: 'negative',
                icon: 'warning'
                })
            }
        },
        viewTransaction(val){
            console.log(val)
            this.singleTransaction = true
        }
    },
}
</script>