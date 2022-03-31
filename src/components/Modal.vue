<template>
<v-dialog v-model="modalAberto" max-width="600px">
  <v-card max-width="600px" class="pa-6">
    <v-card-title class = "pa-0 font-weight-regular">{{tipo === 'criar' ? 'Nova Pessoa':'Editar'}}</v-card-title>
    <v-form v-model=isValid>
    <v-row justify = "space-between" no-gutters v-if="tipo!=='criar'">
        <v-col cols = 3>
            <v-text-field
            v-model="info.id"
            label="Id"
            readonly
            disabled
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row justify = "space-between" no-gutters>
        <v-col cols = 7 class ="ma-30">
            <v-text-field
            v-model="info.nome"
            :rules="[v => !!v || 'Obrigatório']"
            label="Nome *"
          ></v-text-field>
        </v-col>
        <v-col cols = 4>
            <v-slider
              v-model="info.idade"
              :rules="[v => !!v || 'Obrigatório']"
              color="blue"
              label="Idade *"
              min="1"
              max="100"
              thumb-label
            ></v-slider>
        </v-col>
    </v-row>
    <v-row justify = "space-between" no-gutters>
        <v-col cols = 7>
            <v-text-field
            v-model="info.email"
            :rules="[v => !!v || 'Obrigatório']"
            label="Email *"
            >
            </v-text-field>
        </v-col>
        <v-col cols = 4>
            <v-text-field
            v-model="info.telefone"
            :rules="[v => !!v || 'Obrigatório']"
            placeholder="(99) 99999-9999"
            label="Telefone *"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col>
            <v-text-field
            v-model="info.cidade"
            :rules="[v => !!v || 'Obrigatório']"
            label="Cidade *"
          ></v-text-field>
        </v-col>
    </v-row>
    <v-card-actions class="justify-end">
      <v-btn color="primary" text @click.stop="handleModalClose">Fechar</v-btn>
      <v-btn :disabled="!isValid" color="primary" text @click.stop="salvar(info, tipo)">Salvar</v-btn>
    </v-card-actions>
    </v-form>
  </v-card>
  <snackbar v-model="snackbarAberto" :mensagem="snackbarMessage"/>

</v-dialog>
</template>

<script>
import Snackbar from '../components/Snackbar.vue'

export default {
  props: {
    value: Boolean,
    tipo: String,
    info: Object,
    parentArray: Array
  },
  data: function () {
    return {
      dataInfo: this.info,
      dataTipo: this.tipo,
      snackbarMessage: '',
      snackbarAberto: false,
      isValid: true,
      childArray: this.parentArray
    };
  },
  computed: {
    modalAberto: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    salvar: function (object, tipo) {
      const th = this;
      switch (tipo) {
        case 'criar':
          th.$api.Pessoa.Post(object).then(async (response) => {
            th.handleSnackbar(`${response.nome} foi adicionado`)
            var timeout = setTimeout(function () { th.modalAberto = false; }, 1000);
            await timeout;
            this.$parent.$emit('salvar', response);
          });
          break;
        case 'editar':
          th.$api.Pessoa.Put(object.id, object).then(async (response) => {
            th.handleSnackbar(`${response.nome} foi atualizado`)
            var timeout = setTimeout(function () { th.modalAberto = false; }, 1000);
            await timeout;
            this.$parent.$emit('salvar', response);
          });
          break;
        default:
          th.handleSnackbar('Modo de acesso não identificado')
      }
    },
    handleModalClose: function () {
      this.modalAberto = false;
    },
    handleSnackbar: function (mensagem) {
      const th = this;
      th.snackbarAberto = true
      th.snackbarMessage = mensagem;
    }
  },
  components: {
    Snackbar
  }
}

</script>
