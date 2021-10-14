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
          <input 
          v-model="form.type"
          class="form-control"
          type="text"
          required
          >
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

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    //get id from url path
    const psykerId = computed(() => route.params.id)

    const form = reactive({
      name: "",
      type: ""
    })
    onMounted(async () => {
      //get current values of psyker
      const psyker = await getPsyker(psykerId.value);
      form.name = psyker.name;
      form.type = psyker.type;
    })
    const update = async () => {
      await updatePsyker(psykerId.value, { ...form})
      //redirect to home page
      router.push("/");
      //reset inputs
      form.name="";
      form.type=""; 
    };

    return { form, update }
  }
}
</script>

<style>

</style>