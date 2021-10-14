<template>
  <div class="card card-body mt-4">
      <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Name</label>
                <input v-model="form.name" class="form-control" required>
            </div>

            <div class="form-group mt-3">
                <label>Type</label>
                <input 
                v-model="form.type"
                class="form-control"
                type="text"
                required
                >
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

export default {
    setup() {
        const form = reactive({
            name: "",
            type: ""
        })

        const onSubmit = async () => {
            await createPsyker({...form})
            //reset form inputs
            form.name = "";
            form.type = "";
        }
        return { form, onSubmit }
    }
    
}
</script>

<style>

</style>