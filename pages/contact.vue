<template>
  <div>
    <div class="mt-12 flex justify-center">
      <v-container class="flex justify-center">
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
          class="w-full sm:w-3/4"
        >
          <v-form
            :action="$config.pageclipActionUrl"
            class="pageclip-form"
            method="POST"
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="name"
              rules="required|min:2|max:30"
            >
              <v-text-field
                v-model="name"
                :counter="30"
                dense
                :error-messages="errors"
                :hint="!Boolean(name) ? 'For example, `John Doe`' : ''"
                label="Name*"
                name="name"
                outlined
                placeholder="Your name"
                :prepend-inner-icon="mdiFormTextbox"
                rounded
                shaped
                :success="!Boolean(Object.keys(errors).length) && Boolean(name)"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              :rules="{
                required: true,
                email: true,
                min: 5,
                max: 30,
                is_not: 'emretepedev@gmail.com',
              }"
            >
              <v-text-field
                v-model="email"
                :counter="30"
                dense
                :error-messages="errors"
                :hint="!Boolean(email) ? 'For example, `mail@example.com`' : ''"
                label="E-mail*"
                name="email"
                outlined
                placeholder="Your mail address"
                :prepend-inner-icon="mdiAt"
                rounded
                shaped
                :success="
                  !Boolean(Object.keys(errors).length) && Boolean(email)
                "
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="subject"
              :rules="`required|oneOf:${data.subjects}`"
            >
              <v-autocomplete
                v-model="subject"
                dense
                :error-messages="errors"
                :hint="!Boolean(subject) ? 'For example, `Proposal`' : ''"
                :items="data.subjects"
                label="Subject*"
                name="subject"
                outlined
                placeholder="Your subject"
                :prepend-inner-icon="mdiFormSelect"
                rounded
                shaped
                :success="
                  !Boolean(Object.keys(errors).length) && Boolean(subject)
                "
              ></v-autocomplete>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="phone"
              rules="integer|min:7|max:20"
            >
              <v-text-field
                v-model="phone"
                :counter="20"
                dense
                :error-messages="errors"
                :hint="!Boolean(phone) ? 'For example, `123456789`' : ''"
                label="Phone"
                name="phone"
                outlined
                placeholder="Your phone"
                :prepend-inner-icon="mdiPhone"
                rounded
                shaped
                :success="
                  !Boolean(Object.keys(errors).length) && Boolean(phone)
                "
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="message"
              rules="required|min:10|max:1000"
            >
              <v-textarea
                v-model="message"
                auto-grow
                :clear-icon="mdiCloseCircle"
                clearable
                :counter="1000"
                dense
                :error-messages="errors"
                :hint="
                  !Boolean(message) ? 'For example, `Hi @emretepedev!`' : ''
                "
                label="Message*"
                maxlength="1000"
                name="message"
                outlined
                placeholder="Your message"
                :prepend-inner-icon="mdiMessage"
                rounded
                shaped
                :success="
                  !Boolean(Object.keys(errors).length) && Boolean(message)
                "
              ></v-textarea>
            </ValidationProvider>
            <v-checkbox
              v-model="asap"
              dense
              :false-value="false"
              :label="`ASAP: ${asap ? 'yes' : 'no'}`"
              name="asap"
              :off-icon="mdiCheckboxBlankCircleOutline"
              :on-icon="mdiCheckboxMarkedCircle"
              shaped
              :value="asap"
            ></v-checkbox>
            <recaptcha
              :id="$config.googleRecaptchaV2Size"
              :site-key="$config.googleRecaptchaV2SiteKey"
              @error="onError"
              @expired="onExpired"
              @success="onSuccess"
            />
            <div class="mt-5 text-center">
              <v-btn
                class="pageclip-form__submit pageclip-form__submit--dark-loader"
                :disabled="invalid || !Boolean(passRecaptcha)"
                type="submit"
                @click="submit"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </ValidationObserver>
      </v-container>
    </div>
  </div>
</template>

<script>
  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    ref,
    useContext,
    useMeta,
  } from '@nuxtjs/composition-api'

  import {
    mdiAt,
    mdiCheckboxBlankCircleOutline,
    mdiCheckboxMarkedCircle,
    mdiCloseCircle,
    mdiFormSelect,
    mdiFormTextbox,
    mdiMessage,
    mdiPhone,
  } from '@mdi/js'

  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import data from '~/data/pages/contact'

  export default defineComponent({
    // components
    components: {
      ValidationObserver,
      ValidationProvider,
    },

    // setup
    setup() {
      // meta
      useMeta({
        link: [
          {
            href: 'https://s.pageclip.co/v1/pageclip.css',
            media: 'screen',
            rel: 'stylesheet',
          },
        ],
        script: [
          {
            body: true,
            callback: () => {
              styleToPageclip()
            },
            charset: 'utf-8',
            defer: true,
            src: 'https://s.pageclip.co/v1/pageclip.js',
          },
        ],
        title: 'Contact | ',
      })

      // context
      const { $config, $recaptcha } = useContext()

      // root variables
      const { $vToastify } = getCurrentInstance().proxy

      // refs
      const observer = ref(null)

      // envs
      const { googleRecaptchaV2Size, googleRecaptchaV2SiteKey } = $config

      // constants
      const name = ref('')
      const phone = ref('')
      const subject = ref('')
      const message = ref('')
      const asap = ref(false)
      const email = ref('')
      const passRecaptcha = ref(false)
      const widgetId = ref(0)

      // hooks
      onMounted(async () => {
        await $recaptcha.init()

        renderToRecaptcha()
      })

      // methods
      const submit = async (event) => {
        try {
          const validate = await observer.value.validate()

          if (!validate) {
            throw new Error('Form Validation: Failed.')
          }

          await $recaptcha.getResponse(widgetId.value).catch(() => {
            throw new Error('reCAPTCHA v2 Verification: Token not found.')
          })

          await $recaptcha.execute('login').catch(() => {
            throw new Error('reCAPTCHA v3 Verification: Token not found.')
          })

          await $recaptcha.reset(widgetId.value)
        } catch (error) {
          $vToastify.error(String(error))

          event.preventDefault()
        }
      }

      const resetForm = () => {
        name.value = ''
        phone.value = ''
        email.value = ''
        subject.value = ''
        message.value = ''
        asap.value = false
        observer.value.reset()
      }

      const onError = () => {
        $vToastify.error('reCAPTCHA Verification: Error.')
        passRecaptcha.value = false
      }

      const onSuccess = () => {
        $vToastify.success('reCAPTCHA Verification: Success.')
        passRecaptcha.value = true
      }

      const onExpired = () => {
        $vToastify.warning('reCAPTCHA Verification: Expired.')
        passRecaptcha.value = false
      }

      const onResponse = (error, response) => {
        if (error) {
          $vToastify.error("Mail didn't send because of `Form has errors`.")

          return
        }

        if (response.data !== 'ok') {
          $vToastify.error(
            "Mail didn't send because of `Server Error`. Try again later."
          )

          return
        }

        resetForm()

        $vToastify.success('Mail sent successfully.')
      }

      const renderToRecaptcha = () => {
        let count = 0
        const frequency = 1000 / 4 // 0.25 sec
        const maxTime = (1000 / frequency) * 10 // 10 sec

        const recaptchaInterval = setInterval(() => {
          const recaptcha = document.querySelector('.g-recaptcha')

          if (Boolean(recaptcha) || count === maxTime) {
            clearInterval(recaptchaInterval)

            widgetId.value = $recaptcha.render(googleRecaptchaV2Size, {
              sitekey: googleRecaptchaV2SiteKey,
            })

            if (count === maxTime) {
              $vToastify.error(
                'reCAPTCHA Verification: Server Error. Try again later.'
              )

              return
            }

            recaptcha.style.display = 'flex'
            recaptcha.style.justifyContent = 'center'
          }

          count++
        }, frequency)
      }

      const styleToPageclip = () => {
        const form = document.querySelector('.pageclip-form')

        /* eslint-disable-next-line */
        Pageclip.form(form, {
          onResponse(error, response) {
            onResponse(error, response)
          },
          successTemplate: 'I`ll reply to you ASAP. - @emretepedev',
        })
      }

      // return
      return {
        asap,
        data,
        email,
        mdiAt,
        mdiCheckboxBlankCircleOutline,
        mdiCheckboxMarkedCircle,
        mdiCloseCircle,
        mdiMessage,
        mdiFormSelect,
        mdiFormTextbox,
        mdiPhone,
        message,
        name,
        observer,
        onError,
        onExpired,
        onSuccess,
        passRecaptcha,
        phone,
        subject,
        submit,
      }
    },

    // head
    head: {},
  })
</script>
