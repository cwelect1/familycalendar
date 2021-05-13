<template>
  <v-container class="pa-0 ma-0">

    <!-- Intro screen for unauthenticated users -->
    <div id="unauth-view" v-if="!$auth.isAuthenticated">
      <v-card class="ma-2">
        <v-list-item>
          <v-list-item-avatar color="orange"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">Welcome!</v-list-item-title>
            <v-list-item-subtitle>Login or Sign up to start adding events</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    
        <v-img
          src="@/assets/events_cork_board.jpg"
          height="350"
        ></v-img>
    
        <v-card-text>
        Family Calendar allows families to keep track of their appointments and events.
        </v-card-text>
    
        <v-card-actions>
          <v-btn text color="orange" href="https://github.com/cwelect1/familycalendar"  target="_blank">
            GitHub
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>

    <!-- Events list for authenticated users -->
    <v-container class="pa-0 ma-0" id="auth-view" v-if="$auth.isAuthenticated">
      <div class="ma-2">There are {{ events.length }} events!</div>
    </v-container>

    <!-- Loading spinner -->
    <v-container v-if="$auth.isAuthenticated && loading" >
      <div class="text-center">
        <v-progress-circular
          :size="50"
          color="orange"
          indeterminate
        ></v-progress-circular>        
      </div>  
    </v-container>

    <!-- No Events - prompt user to add one -->
    <v-container v-if="events.length === 0 && !loading" >
      <v-card class="ma-2">
        <v-card-title class="headline">No Events</v-card-title>
        <v-card-subtitle>Someone really should add some events.</v-card-subtitle>
        <v-card-actions>
          <v-btn color="orange" text to="/addEvent">Add New Event</v-btn>
        </v-card-actions>
      </v-card>    
    </v-container>
    <v-container class="pa-0 ma-0" v-if="events.length > 0">
      <v-container class="pa-0 ma-0" v-bind:key="index" v-for="(event, index) in events">
        <Event v-bind:event="event"/>
      </v-container>
    </v-container>

    <!-- Add event icon -->
    <v-container class="pa-0 ma-0">
      <v-btn 
        v-if="$auth.isAuthenticated" 
        fixed
        dark
        fab
        bottom
        right
        color="red"
        class="mb-4"
        to="/addEvent">
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
  import axios from "axios"
  import { mapState } from 'vuex'
  import { bus } from '../main'
  import Event from '@/components/Event.vue'

  export default {
    name: "HomeView",
    components: {
      Event
    },
    data: function () {   
      return {
        loading: true,
        user: null
      }
    },
    computed: {
      ...mapState(['events'])
    },
    mounted () {
      console.log('mounted')
      this.updateResults()
    },
    created () {
      bus.$on('authenticated', async (user) => {
        this.$store.commit('setUser', user)
        console.log('User signed in: ', this.$store.getters.getUser)

      })
    },
    methods: {
      async updateResults() {
        if (!this.$store.getters.isInitialized) return
        const token = await this.$auth.getTokenSilently()

        // Only use this line for debugging! It displays the JWT token in the browser console.
        // console.log(token)
        const url = `${this.$APIurl}/events`
        console.log('URL: ', url)
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`    // send the access token through the 'Authorization' header
          }
        })
        console.log('Response: ', data)
        this.$store.commit('setAllEvents', data)
        this.loading = false
      }
    }
  }
</script>
