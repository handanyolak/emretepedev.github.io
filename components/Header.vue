<template>
  <div>
    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndDown"
      app
      clipped-left
      class="h-12"
    >
      <v-toolbar-title class="flex justify-between items-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>
          {{ $config.spaName }}
        </span>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :permanent="!$vuetify.breakpoint.mdAndDown"
      :expand-on-hover="!$vuetify.breakpoint.mdAndDown"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon
              v-if="$vuetify.breakpoint.mdAndDown"
              @click.stop="drawer = !drawer"
            >
              {{ mdiClose }}
            </v-icon>
            <span v-if="!$vuetify.breakpoint.mdAndDown">
              {{ $config.spaName }}
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense active-class="text--red">
        <nuxt-link v-for="page in pages" :key="page.title" :to="page.to">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ page.title }}
            </v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

import {
  mdiXml,
  mdiSourceRepositoryMultiple,
  mdiFileAccount,
  mdiCardAccountMail,
  mdiCoffee,
  mdiClose,
} from '@mdi/js'

export default defineComponent({
  setup() {
    // return
    return {
      drawer: ref(null),
      pages: [
        { title: 'Home', to: '/', icon: mdiXml },
        {
          title: 'Projects',
          to: '/projects',
          icon: mdiSourceRepositoryMultiple,
        },
        { title: 'CV', to: '/cv', icon: mdiFileAccount },
        { title: 'Contact', to: '/contact', icon: mdiCardAccountMail },
        { title: 'Coffee', to: '/coffee-with-crypto', icon: mdiCoffee },
      ],
      mdiClose,
    }
  },
})
</script>

<style></style>