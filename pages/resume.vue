<template>
  <div>
    <div class="mt-12 flex justify-center">
      <v-container>
        <LinkedInBadge />
        <Timeline :items="data.experiences" />
        <DataTable :headers="data.headers" :items="data.skills" />
      </v-container>
    </div>
  </div>
</template>

<script>
  import { defineComponent, useMeta } from '@nuxtjs/composition-api'
  import data from '~/data/pages/resume'
  import Timeline from '~/components/Timeline.vue'
  import DataTable from '~/components/DataTable.vue'
  import LinkedInBadge from '~/components/LinkedInBadge.vue'

  export default defineComponent({
    components: { Timeline, DataTable, LinkedInBadge },

    setup() {
      useMeta({
        title: 'Resume | ',
      })

      return {
        data,
      }
    },

    head: {},
  })
</script>

<style>
  .v-data-table-header th {
    white-space: nowrap !important;
  }

  .v-data-table-header
    tr
    th.hide-icon-to-sortable:hover
    .v-data-table-header__icon {
    display: inline-flex !important;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .v-data-table-header
    tr
    > th.hide-icon-to-sortable
    > .v-data-table-header__icon {
    display: none !important;
  }

  @media (max-width: 425px) {
    .v-data-footer__pagination {
      width: 100% !important;
    }

    .v-data-footer__icons-before,
    .v-data-footer__icons-after,
    .v-data-footer__select {
      margin: auto !important;
    }
  }
</style>
