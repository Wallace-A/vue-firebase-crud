<template>
  <div class="home" >
    <h1>Welcome, Magister.</h1>
    <PsykerCreate/>
    <PsykerList/>
  </div>
</template>

<script>
// @ is an alias to /src
import PsykerCreate from "@/components/PsykerCreate"
import PsykerList from "@/components/PsykerList"

export default {
  name: 'Home',
  components: {
    PsykerCreate,
    PsykerList
  }
}
</script>
