<template>
  <div class="card card-body mx-0 mx-md-5">
    <h3>Edit Psyker</h3>
    <form @submit.prevent="update">
      <div class="row">
        <div class="col-md form-group">
            <label>Name</label>
            <input 
            v-model="form.name" 
            class="form-control" 
            required>
        </div>

        <div class="col-md form-group mt-3 mt-md-0">
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
      </div>

      <div class="row mt-3">
        <div class="col-md form-group mt-3">
            <label>Discipline of Change</label>
            <div class="d-flex justify-content-between align-items-center" v-for="(power) in changePowers" :key="power.id" @change="checkPowers">
                <label :for="power.name">{{power.name}}</label>
                <input type="checkbox" id="power" :value="power.name" v-model="form.powers">
            </div>
        </div>
        <div class="col-md form-group mt-3">
            <label>Discipline of Vengeance</label>
            <div class="d-flex justify-content-between align-items-center" v-for="(power) in vengPowers" :key="power.id" @change="checkPowers">
                <label :for="power.name">{{power.name}}</label>
                <input type="checkbox" id="power" :value="power.name" v-model="form.powers">
            </div>
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
      console.log(psyker);
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
    const checkPowers = () => {
      console.log(form.powers);
    }
    return { form, units, powers, update, checkPowers }
  },
  computed: {
    changePowers: function () {
        return this.powers.filter(p => p.discipline === 'change')
    },
    vengPowers: function () {
        return this.powers.filter(p => p.discipline === 'vengeance')
    }
  }
}
</script>

<style>

</style>