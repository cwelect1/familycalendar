/*
  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// initial state
const state = {
  initialized: false,
  user: {},
  events: [],
  currentEvent: {}
}

// getters
const getters = {
  isInitialized: (state) => state.initialized,
  getUser: (state) => state.user,
  getEvents: (state) => state.events,
  getCurrentEvent: (state) => state.currentEvent
}

//mutations
const mutations = {
  saveEvent(state, event) {

    console.log('store::saveEvent:', event)
    for (let i in state.events) {
      console.log(state.events[i])
      if (state.events[i].rangeKey === event.rangeKey) {
        console.log('Matched: ', event.rangeKey)
        return
      }
    }    
    console.log('Not in store - adding')

    state.events.push(event)

  },
  setUser(state, user) {
    state.user = user
  },  
  setInitialized(state, val) {
    console.log('setInitalized')
    state.initialized = val
  },
  setCurrentEvent(state, event) {
    state.currentEvent = event
    console.log(state.currentEvent)
  },
  setAllEvents(state, events) {
    state.events = events
  },
  updateEvents(state, event) {
    console.log('store::updateEvent')
    for (let i in state.events) {
      if (state.events[i].rangeKey === event.rangeKey) {
        console.log('Updated event: ', state.events[i].rangeKey)
      }
    }
  }
}

export default new Vuex.Store({
  // strict: true,
  state,
  getters,
  mutations
})
