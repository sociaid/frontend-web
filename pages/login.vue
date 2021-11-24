<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
        <v-card>
          <v-card-title class="headline">
            Login
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="email" :rules="emailRules" label="EMail" required/>
            <v-text-field v-model="password" label="Passwort" required/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" nuxt type="submit">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: ''
    }
  },
  methods: {
    ...mapActions({
      saveTokens: 'auth/saveTokens'
    }),
    validate () {
      this.$refs.form.validate()
    },
    login () {
      this.$axios.$post('/api/auth/v1/auth/login', {
        email: this.email,
        password: this.password
      }).then(({
        access_token,
        refresh_token
      }) => {
        console.log('access', access_token)
        console.log('refresh', refresh_token)
        this.saveTokens({
          refreshToken: refresh_token,
          accessToken: access_token
        })
      }).catch((reason) => {
        if (reason.response.status === 401) {
          console.log('passwort falsch')
        }
        console.log('genereller error', reason)
      })
    }
  },
}
</script>

<style scoped>

</style>
