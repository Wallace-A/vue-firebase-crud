<template>
  <div class="card mt-4">
      <table class="table m-0">
          <thead>
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="{ id, name, type } in psykers" :key="id">
                  <td>{{ name }}</td>
                  <td>{{ type }}</td>
                  <td>
                      <router-link :to="`/edit/${id}`">
                          <button class="btn btn-primary btn-sm me-2">
                              Edit
                          </button>
                      </router-link>
                      <button 
                      @click="deletePsyker(id)"
                      class="btn btn-danger btn-sm">
                          Delete
                      </button>
                  </td>

              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { useLoadPsykers, deletePsyker } from "@/firebase";

export default {
    setup() {
        const psykers = useLoadPsykers()
        return  { psykers, deletePsyker }
    }
}
</script>

<style>

</style>