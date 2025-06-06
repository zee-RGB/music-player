<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>

  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_message }}
        </div>
        <vee-form :validation-schema="schema" @submit="addComment">
          <vee-field
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></vee-field>
          <ErrorMessage name="comment" class="text-red-500 mb-4" />
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="comment_in_submission"
          >
            Submit
          </button>
        </vee-form>

        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>

  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">Elaine Dreyfuss</div>
        <time>5 mins ago</time>
      </div>

      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque
        laudantium.
      </p>
    </li>
  </ul>
</template>

<script>
import { auth, commentsCollection, songsCollection } from '@/includes/firebase'
import { addDoc, doc, getDoc } from 'firebase/firestore'

export default {
  name: 'SongView',

  async created() {
    const songId = this.$route.params.id
    try {
      const songRef = doc(songsCollection, songId)
      const songSnapshot = await getDoc(songRef)

      if (songSnapshot.exists()) {
        this.song = songSnapshot.data()
      } else {
        this.$router.push({ name: 'home' })
      }
    } catch (error) {
      console.error('Error fetching song:', error)
    }
  },

  data() {
    return {
      song: {},
      comments: [],
      schema: {
        comment: 'required|min:3',
      },

      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait while your comment is being submitted.',
    }
  },
  methods: {
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true
      this.comment_show_alert = true
      this.comment_alert_variant = 'bg-blue-500'
      this.comment_alert_message = 'Please wait while your comment is being submitted.'

      try {
        const comment = {
          content: values.comment,
          datePosted: new Date().toString(),
          sid: this.$route.params.id,
          name: auth.currentUser ? auth.currentUser.displayName : 'Anonymous',
          uid: auth.currentUser.uid,
        }

        await addDoc(commentsCollection, comment)

        this.comment_alert_variant = 'bg-green-500'
        this.comment_alert_message = 'Your comment has been added.'
        resetForm()
      } catch (error) {
        console.error('Error:', error)
        this.comment_alert_variant = 'bg-red-500'
        this.comment_alert_message = 'Error adding comment. Please try again.'
      } finally {
        this.comment_in_submission = false
      }
    },
  },
}
</script>
