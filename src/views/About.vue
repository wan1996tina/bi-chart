<template lang='pug'>
.about
  h1 This is an about page
  taiwanMap
  mapTest
</template>
<script>
import taiwanMap from '@/components/map'
import mapTest from '@/components/test/map-test'

export default {
  components: {
    taiwanMap,
    mapTest
  }
}
</script>
