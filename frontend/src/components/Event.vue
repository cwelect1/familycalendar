<template>
  <v-container class="pa-0 ma-0">
    <!-- Event card -->
     <v-card class="my-2 ma-2">
      <v-card-text>
        <div>{{ event.event_date }}</div>
        <p class="display-1 text--primary">
          {{ event.title }}
        </p>
        <div class="text--primary">
          {{ event.comments }}
        </div>
      </v-card-text>
  
      <v-card-actions>
        <!-- Delete Event -->
        <div>
          <v-btn text color="orange" dark @click="deleteEvent(event)">
            Delete
          </v-btn>
          <v-btn text color="orange" dark @click="editEvent(event)">
            Edit
          </v-btn>
        </div>
      </v-card-actions>
      <v-divider class="mx-4"></v-divider> 
    </v-card> 

  </v-container>
</template>

<script>
import axios from "axios"

export default {
  name: "Event",
  props: ['event'],
  data: function () {   
    return {
      saving: false,
      currentEvent: {}
    }
  },
  methods: {
    editEvent(event){
      this.$store.commit('setCurrentEvent', event)
      this.$router.push('/editevent')
    },
    async deleteEvent(event){
      const token = await this.$auth.getTokenSilently();
      const url = `${this.$APIurl}/events`
      this.saving = true

      let payload = {
        event: event
      }
      console.log('Payload: ', payload)
      try {
        const { data } = await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}`},
          data: {payload}
        })
        console.log('Result: ', data) 
      } catch (err) {
        console.error('Error: ', err)
      }

      this.saving = false
      this.reset()
    },
    reset () {
      this.updateResults()
    },
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
