<template>
  <div class="home">
    <v-container>
      <v-card class="ma-2">
        <v-card-title class="headline">Add a New Event</v-card-title>
        <v-card-subtitle>Enter an event or appointment.</v-card-subtitle>

        <v-form class="ma-4"
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
          <v-text-field
            v-model="date"
            :counter="100"
            label="Event Date (yyyy-mm-dd)"
            required
          ></v-text-field>

          <v-text-field
            v-model="name"
            :counter="100"
            :rules="nameRules"
            label="Your Name"
            required
          ></v-text-field>
    
          <v-text-field
            v-model="title"
            :counter="100"
            :rules="titleRules"
            label="Title"
            required
          ></v-text-field>

          <v-text-field
            v-model="comments"
            :counter="100"
            :rules="commentsRules"
            label="Comments"
            required
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveEvent" text>Submit</v-btn>
            <v-btn color="error"
            class="mr-4"
            @click="reset" text>Cancel</v-btn>
           </v-card-actions>
        </v-form>
      </v-card>    
    </v-container>    
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'AddEventView',
  data: () => ({
    valid: true,
    event_id: new Date().getTime().toString(),
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 75) || 'Name must be less than 75 characters',
    ],
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters',
    ],
    comments: '',
    commentsRules: [
      v => (v && v.length <= 200) || 'Comments must be less than 200 characters',
    ],
    date: '',
    lazy: false
  }),  
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
      this.$router.push('/')
    },
    async saveEvent() {
      const token = await this.$auth.getTokenSilently();
      const url = `${this.$APIurl}/events`

      const payload = {
        "event_id": this.event_id, 
        "title": this.title,
        "comments": this.comments,
        "event_date": this.date,
        "person_name": this.name
      }
      console.log('URL: ', url)
      console.log('Payload: ', payload)
      try {
        const { data } = await axios.post(url, payload,
          {
            headers: { 
              Authorization: `Bearer ${token}`
          }
        })
        console.log('Result: ', data) 

      } catch (err) {
        console.error('Error: ', err)
      }
      this.reset()
    }
  }
}
</script>
