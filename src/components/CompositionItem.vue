<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="delete -song"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert" :class="alert_variant">
      {{ alert_icon }}
      {{ alert_message }}
    </div>

    <div v-show="showForm">
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="$emit('update:unsavedChanges', true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="modified_genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="$emit('update:unsavedChanges', true)"
          />
          <ErrorMessage class="text-red-600" name="modified_genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    unsavedChanges: {
      type: Boolean,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        modified_genre: 'alpha_',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_icon: 'fa fa-spinner fa-spin',
      alert_message: 'Please wait while we process your request.',
    }
  },
  methods: {
    async edit(values) {
      this.in_submission = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_icon = 'fa fa-spinner fa-spin'
      this.alert_message = 'Please wait while we process your request.'

      try {
        await songsCollection.doc(this.song.docID).update(values)
      } catch (error) {
        this.alert_variant = 'bg-red-500'
        this.alert_icon = 'fa fa-exclamation-triangle'
        this.alert_message = `Error: ${error.message}`
      } finally {
        this.updateSong(this.index, values)
        this.$emit('update:unsavedChanges', false)

        this.in_submission = false
        this.showForm = false
        this.alert_message = 'Song updated successfully!'
      }
    },
    async delete_song() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.name}`)

      try {
        await songsCollection.doc(this.song.docID).delete()
        await songRef.delete()

        this.$emit('songDeleted', this.index)
      } catch (error) {
        console.error('Error deleting song:', error)
      }
      this.removeSong(this.index)
    },
  },
}
</script>
