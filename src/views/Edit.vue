<template>
  <div class="card card-body mt-4">
    <h3>Edit Psyker</h3>
    <form @submit.prevent="update">
      <div class="form-group">
          <label>Name</label>
          <input 
          v-model="form.name" 
          class="form-control" 
          required>
      </div>

      <div class="form-group mt-3">
          <label>Type</label>
          <select v-model="form.type" class="form-control" required>
              <option disabled value="">Please select one</option>
              <option>Thousand Sons Daemon Prince</option>
              <option>Exalted Sorcerer</option>
              <option>Sorcerer</option>
              <option>Sorcerer in Terminator Armour</option>
              <option>Infernal Master</option>
              <option>Tzaangor Shaman</option>
          </select>
      </div>
      <div class="form-group mt-3">
          <label>Powers</label>
          <div v-for="(power) in powers" :key="power.id">
              <label :for="power.name">{{power.name}}</label>
              <input type="checkbox" id="power" :value="power.name" v-model="form.powers">
          </div>
      </div>
      <button type="submit" class="btn btn-success mt-3">
          Update Psyker
      </button>

    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPsyker, updatePsyker } from "@/firebase"
import unitList from "@/unitStats.json";
import powerList from "@/powers.json";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    //get id from url path
    const psykerId = computed(() => route.params.id)
    const units = unitList;
    const powers = powerList;
    const form = reactive({
      name: "",
      type: "",
      powers: []
    })
    onMounted(async () => {
      //get current values of psyker
      const psyker = await getPsyker(psykerId.value);
      form.name = psyker.name;
      form.type = psyker.type;
      form.powers= psyker.powers;
    })
    const update = async () => {
      await updatePsyker(psykerId.value, { ...form})
      //redirect to home page
      router.push("/");
      //reset inputs
      form.name="";
      form.type=""; 
      form.powers=[];
    };

    return { form, units, powers, update }
  }
}
</script>

<style>

</style>