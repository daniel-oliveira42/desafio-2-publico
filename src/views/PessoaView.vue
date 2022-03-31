<template>
  <div v-on:teste="debugFunc()">
      <v-btn
        color="primary"
        dark
        @click.stop="handleModal('criar')"
      >Nova Pessoa</v-btn>
      <v-data-table
        :headers="getHeaders(headers)"
        :items="pessoas"
        :items-per-page="5"
        class="elevation-1"
      >
      <template slot="item.delete" slot-scope="props">
            <v-btn class="red white--text" @click="excluir($event, props.item)">
                Excluir
            </v-btn>
      </template>
      <template slot="item.edit" slot-scope="props">
            <v-btn class="blue white--text" @click="editar($event, props.item)">
                Editar
            </v-btn>
      </template>
      </v-data-table>
      <modal ref = "modal" v-model="modalAberto" :tipo="tipoModal" :info="infoModal" :parentArray="pessoas"/>
      <snackbar v-model="snackbarAberto" :mensagem="snackbarMessage"/>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import Snackbar from '../components/Snackbar.vue'

export default {
  data: function () {
    return {
      pessoas: [],
      headers: ['Id', 'Nome', 'Idade', 'E-mail', 'Telefone', 'Cidade'],
      modalAberto: false,
      snackbarAberto: false,
      tipoModal: '',
      infoModal: {},
      snackbarMessage: ''
    };
  },
  mounted () {
    this.getPessoas();
    this.addSalvarListener();
  },
  methods: {
    getPessoas: function () {
      const th = this;
      th.$api.Pessoa.GetAll().then(function (response) {
        th.pessoas = response;
      });
    },
    setPessoas: function (array) {
      this.pessoas = array;
    },
    addSalvarListener: function () { this.$on('salvar', (param) => { this.pessoas = param }) },
    getHeaders: function (textArray) {
      const headers = []

      textArray.forEach((element) => {
        if (element.name === 'Delete') {
          element.name = '';
        }
        headers.push({ text: element, value: element.toLowerCase().replace('-', '') })
      });

      headers.push({ text: '', value: 'edit' })
      headers.push({ text: '', value: 'delete' })

      return headers;
    },
    excluir: function (e, item) {
      e.preventDefault();
      const th = this;
      th.$api.Pessoa.Delete(item.id).then(function (response) {
        th.pessoas = response;
        th.handleSnackbar('Registro Excluído')
      });
    },
    editar: function (e, item) {
      e.preventDefault();
      this.handleModal('editar', item);
    },
    handleModal: function (tipo, info = {}) {
      const th = this;
      th.modalAberto = !th.modalAberto;

      const infoObject = { ...info } // Copia o conteúdo do objeto info para evitar Reactivity no componente Modal

      th.tipoModal = tipo;
      th.infoModal = infoObject;
    },
    handleSnackbar: function (mensagem) {
      const th = this;
      th.snackbarAberto = true
      th.snackbarMessage = mensagem;
    }
  },

  components: {
    Modal,
    Snackbar
  }
};
</script>
