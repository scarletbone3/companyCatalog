<template>
  <v-app>
    <v-app-bar
      app
      color="red"
    >
      <v-app-bar-title>
        <h3 class="text-h4 white--text">Catalog</h3>
      </v-app-bar-title>
    </v-app-bar> 

    <v-main>
      <v-data-table
         :headers="headers"
         :items="result.data.contacts"
         dark
      >
        <template
          v-slot:body="{ items }"
        >
          <tbody>
            <tr v-for="item in items"
              :key="item.id"
              @contextmenu="rightClick($event, item)"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.company.name }}</td>
              <td>
                <tr v-for="contactLine in item.contactLines"
                  :key="contactLine.id"
                >
                  <td>{{ contactLine.value }}</td>
                </tr>
              </td>
            </tr>
          </tbody>
          <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
          >
            <v-list>
              <v-list-item @click="click">
                <v-list-item-title>Delete Contact</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-dialog
            v-model="dialog"
            max-width="400"
          >
            <v-card>
              <v-card-title class="text-h5">
                {{ description.data ? description.data.deleteContact.description : "" }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-main>
  </v-app>
</template>

<script>
  import { GET_ALL_CONTACTS } from './queries/contacts';
  import { DELETE_CONTACT } from './queries/deleteContact'
  export default {
    name: "app",
    data() {
        return {
            result: {},
            description: {},
            headers: [
              { text: "Contact" },
              { text: "Company" },
              { text: "ContactLines" }
            ],
            showMenu: false,
            currentItemId: "",
            dialog: false,
        };
    },
    async mounted() {
        this.result = await this.$apollo.query({ query: GET_ALL_CONTACTS });
    },
    methods: {
      rightClick(event, item) {
        event.preventDefault()
        this.showMenu = false
        this.currentItemId = item.id
        this.x = event.clientX
        this.y = event.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
      async click() {
        this.description = await this.$apollo.mutate({ mutation: DELETE_CONTACT,
          variables: { id: this.currentItemId },
        });
        this.dialog = true;
        this.result = await this.$apollo.query({ query: GET_ALL_CONTACTS });
      }
    }
}
</script>
