<template>
  <div class="card mt-4">
      <table class="table m-0">
          <thead>
                <tr class="d-flex">
                    <th class="col-3" scope="col">Name</th>
                    <th class="col-3" scope="col">Type</th>
                    <th class="col-3" scope="col">Powers</th>

                    <th class="col-3" scope="col">Action</th>
                </tr>
          </thead>
          <tbody>
              <tr class="d-flex" v-for="{ id, name, type, powers} in psykers" :key="id">
                    <td class="col-3" >{{ name }}</td>
                    <td class="col-3" >{{ type }}</td>
                    <td class="col-3" >
                        <p v-for="(p, i) in powers" :key="i">
                            {{ p }}
                        </p>
                    </td>
                    <td class="col-3" >
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