<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm
    ref="registerForm"
    :validation-schema="registerSchema"
    @submit="onRegister"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-500" name="name" />
    </div>

    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-500" name="email" />
      <!-- CORRECT -->
    </div>

    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-500" name="age" />
    </div>

    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-500" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
    </div>

    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-500" name="confirm_password" />
    </div>

    <!-- Fave Past time -->
    <div class="mb-3">
      <label class="inline-block mb-2">Fave Past time</label>
      <VeeField
        name="fave_past_time"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Fave Past time"
      />
      <ErrorMessage class="text-red-500" name="fave_past_time" />
    </div>

    <!-- Hobbies -->
    <div class="mb-3">
      <label class="inline-block mb-2">Hobbies</label>
      <VeeField
        as="select"
        name="hobbies"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Sports">Sports</option>
        <option value="Music">Music</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
      </VeeField>
      <ErrorMessage class="text-red-500" name="hobbies" />
    </div>

    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Australia">Australia</option>
      </VeeField>
      <ErrorMessage class="text-red-500" name="country" />
    </div>

    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <ErrorMessage class="text-red-500" name="tos" />

      <label class="inline-block">Accept terms of service</label>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ reg_in_submission ? 'Loading...' : 'Submit' }}
    </button>
  </VeeForm>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapActions } from 'pinia'

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:99',
        password: 'required|min:4|max:100|excluded:password,1234',
        confirm_password: 'required|confirmed:@password',
        country: 'required|excluded:Australia',
        tos: 'tos',
        fave_past_time: 'required|excluded:password,1234|max:25',
        hobbies: 'required|excluded:cooking',
      },

      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait while we register your account.',
    }
  },

  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),

    async onRegister(values) {
      this.reg_in_submission = true
      this.reg_show_alert = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait while we register your account.'

      try {
        await this.createUser(values)

        this.reg_alert_variant = 'bg-green-500'
        this.reg_alert_msg = 'Registration successful!'

        this.$refs.registerForm.resetForm({
          name: '',
          email: '',
          age: '',
          password: '',
          confirm_password: '',
          country: 'USA',
          hobbies: '',
          fave_past_time: '',
          tos: false,
        })
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = error.message
        console.error(error)
      } finally {
        this.reg_in_submission = false
      }
    },
  },
}
</script>
