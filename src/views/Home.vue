<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
