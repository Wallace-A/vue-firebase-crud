<template>
  <div class="card card-body mt-4">
      <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Name</label>
                <input v-model="form.name" class="form-control" required>
            </div>

            <div class="form-group mt-3">
                <label>Type</label>
                    <select v-model="form.type" @change="calculateStats" class="form-control" required>
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
                <div v-for="(power) in powers" :key="power.id" @change="checkPowers">
                    <label :for="power.name">{{power.name}}</label>
                    <input type="checkbox" id="power" :value="power.name" v-model="form.powers">
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
        const units = unitList;
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
        return { form, units, powers, onSubmit, calculateStats, checkPowers }
    },
    data() {
        return {

        }
    }
    
}
</script>

<style>

</style>