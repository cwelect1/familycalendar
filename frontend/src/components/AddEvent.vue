<template>
    <div id="addEvent">
        <p>Add Event</p>
    </div>
</template>
<script>
  export default {
    props: {
      source: String,
    },

    data: function () {
      return {
        appName: this.$appName,
        drawer: null
      }
    },
  }
</script>