<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PsykerCreate/>
  </div>
</template>

<script>
// @ is an alias to /src
import PsykerCreate from "@/components/PsykerCreate"
export default {
  name: 'Home',
  components: {
    PsykerCreate
  }
}
</script>
