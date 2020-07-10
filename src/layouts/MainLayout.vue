<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" /> -->

        <q-toolbar-title>    
          <q-icon round size="sm" name="mdi-desktop-mac-dashboard" v-if="titleBarBackIcon == 'Dashboard' " />
          <q-icon round size="sm" name="mdi-chevron-left" v-else @click="$router.go(-1)"/>
          {{ $route.path.split('/')[2] ? $route.path.split('/')[2] : 'Dashboard' }} 
        </q-toolbar-title>

        <!-- <q-btn flat round  icon="mdi-printer" class="q-mr-xs" />
        <q-btn flat round  icon="mdi-share-variant" /> -->
        <div> Hi, {{ user.first_name  }} </div>
      </q-toolbar>
    </q-header> 

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding> 
          <q-item-label header>Personal</q-item-label>
          <q-separator  inset class="q-mx-lg" />

          <q-item  clickable v-ripple @click="leftDrawerOpen = !leftDrawerOpen" to="/main/Dashboard">
          <!-- <q-item  clickable v-ripple @click="leftDrawerOpen = !leftDrawerOpen" > -->
            <q-item-section avatar>
              <q-icon name="mdi-desktop-mac-dashboard" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>   
 
          <q-item clickable v-ripple  to="/main/History">
            <q-item-section avatar>
              <q-icon name="mdi-history" />
            </q-item-section>

            <q-item-section>
              Transaction History
            </q-item-section>
          </q-item>


          <q-item-label header>Settings</q-item-label>
          <q-separator  inset class="q-mx-lg" />

          <q-item  clickable v-ripple to="/main/Help">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/main/FAQs">
            <q-item-section avatar>
              <q-icon name="mdi-help" />
            </q-item-section>

            <q-item-section>
              FAQs
            </q-item-section>
          </q-item> 
          <!-- this.$navigateTo(StartPage, { clearHistory: true }) -->

          <q-item clickable v-ripple @click="logOut">
            <q-item-section avatar>
              <q-icon color="red" name="mdi-location-exit" />
            </q-item-section>

            <q-item-section >
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../statics/images/user.jpg">
          </q-avatar>
          <div class="text-weight-bold">George Ikwegbu</div>
          <div>08101570258</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>



    <q-footer elevated class="bg-primary text-white" v-if="drawerState"  >  
      <q-tabs v-model="tab" indicator-color="white" active-color="white"  class="text-grey-5 q-pb-sm"  align="justify" >
        <!-- <q-route-tab to="/main/Message" exact  name="message" icon="mdi-comment-multiple-outline" size="lg"/> -->
        <q-route-tab to="/main/Notification" exact  name="notification" icon="mdi-bell-outline" size="lg"/>
        <q-route-tab to="/main/Dashboard" exact  name="home" icon="home" size="lg"/>
        <q-route-tab to="/main/Profile" exact  name="profile" icon="mdi-account-outline" size="lg"/>
        <q-btn dense flat round class="q-mr-lg" icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" /> 
      </q-tabs>  
    </q-footer>
  </q-layout>
</template>

<script> 
import { mapState  } from 'vuex'

export default {
  name: 'MainLayout',
 
  computed: {
    titleBarBackIcon(){ 
      return  this.$route.path.split('/')[2] 
    },
    ...mapState('userAccount', {
            user: state => state.user
      }),
    drawerState: {
        get () {
            return this.$store.state.displayLayout.drawerState
        },
        set (val) {
            this.$store.commit('displayLayout/updateDrawerState', val)
        }
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
      tab: 'home',
      
    }
  }, 
  methods: {
    logOut(){
      // this.$router.push('/auth/', { clearHistory: true }) 
      this.$router.replace('/auth/', ) 
    }
  }
}
</script>
