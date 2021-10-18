<template>
  <div class="card card-body mx-0 mx-md-auto w-80 d-flex justify-content-center">
       <h3>Create Psyker</h3>
      <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-md form-group">
                <h5>Name</h5>
                <input 
                v-model="form.name" 
                class="form-control" 
                required>
            </div>

            <div class="col-md form-group mt-3 mt-md-0">
                <h5>Type</h5>
                    <select v-model="form.type" @change="checkCurrentUnit" class="form-control" required>
                        <option disabled value="">Please select one</option>
                        <option v-for="(unit, key) in units" :key="key">{{key}}</option>
                    </select>
            </div>
          </div>

            <div class="row mt-3">
                <div class="col-md form-group mt-3">
                    <h5>Discipline of Change</h5>
                    <div class="d-flex justify-content-between align-items-center" v-for="(power) in changePowers" :key="power.id" @change="checkPowers">
                        <label :for="power.name">{{power.name}}</label>
                        <input :disabled="form.powers.length === currentUnit.knownPowers && form.powers.indexOf(power.name) === -1" type="checkbox" id="power" :value="power.name" v-model="form.powers">
                    </div>
                </div>
                <div class="col-md form-group mt-3">
                    <h5>Discipline of Vengeance</h5>
                    <div class="d-flex justify-content-between align-items-center" v-for="(power) in vengPowers" :key="power.id" @change="checkPowers">
                        <label :for="power.name">{{power.name}}</label>
                        <input :disabled="form.powers.length === currentUnit.knownPowers && form.powers.indexOf(power.name) === -1" type="checkbox" id="power" :value="power.name" v-model="form.powers">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-success mt-3">
                Create Psyker
            </button>

      </form>
  </div>
</template>

<script>
import { createPsyker } from "@/firebase";
import { reactive } from "vue";
import unitList from "@/unitStats.json";
import powerList from "@/powers.json";

export default {
    setup() {
        const form = reactive({
            name: "",
            type: "",
            powers: []
        })
        const units = unitList[0];
        let currentUnit = reactive({
            knownPowers: 0,
            castPowers: 0
        });
        console.log(currentUnit.knownPowers);
        const powers = powerList;
        const onSubmit = async () => {
            await createPsyker({...form})
            //reset form inputs
            form.name = "";
            form.type = "";
            form.powers = [];
        }

        const calculateStats = () => {
            console.log("calculate stats");
            const stats = units;
            console.log(stats);
        }

        const checkPowers = () => {
            console.log(form.powers);
        }
        const checkCurrentUnit = () => {
            currentUnit.value = units[form.type]
            console.log(currentUnit.value.knownPowers);
        }
        return { form, units, powers, currentUnit, onSubmit, calculateStats, checkCurrentUnit, checkPowers }
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