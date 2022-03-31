<template>
  <div class="text-center">
    <v-snackbar v-model="snackbarAberto" :timeout="timeout">
      {{ mensagem }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    mensagem: String,
  },
  computed: {
    snackbarAberto: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      },
    },
  },
  data: () => ({
    timeout: 1000
  }),
};
</script>
