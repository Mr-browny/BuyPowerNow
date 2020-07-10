<template>
  <q-layout view="lHh Lpr lFf" >  
      <q-card class="text-center bg-primary " >
      <!-- <q-card class="text-center bg-primary curved" style="border-bottom-left-radius: 50% 50%; border-bottom-right-radius: 50% 50%;"> -->
        <q-card-section>
          <q-icon size="50px" color="yellow" name="mdi-lightbulb-on" />
        </q-card-section>
        <q-card-section>
          <div class="text-h3 text-white">BuyPowerNow</div>
              <div class="text-subtitle1 text-grey-4">Nigeria No.1 Electricity Bill Payment Platform</div>
        </q-card-section>
      </q-card>
      <div class="curve"></div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.curve {
  position: relative;
  background: white; 
  height: 20px;
  top: -1pc;
  border-top-left-radius: 50% 100%; 
  border-top-right-radius: 50% 100%;
  border-bottom: 1px solid transparent ;
} 
</style>


<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
       
    }
  }
}
</script>
