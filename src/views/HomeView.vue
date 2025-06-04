<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      :style="{ backgroundImage: `url(${images.header})` }"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue
          augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      :src="images.introductionMusic"
      alt="Introduction Music"
    />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon.right="headphone - alt">
        <span class="card-title">Songs</span>
        <!-- Icon -->
      </div>

      <!-- Playlist -->
      <SongItem v-for="song in songs" :key="song.docID" :song="song" />
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import header from '@/assets/img/header.png'
import introductionMusic from '@/assets/img/introduction-music.png'
import SongItem from '@/components/SongItem.vue'
import { songsCollection } from '@/includes/firebase'

export default {
  name: 'HomeView',
  components: {
    SongItem,
  },

  async created() {
    this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  data() {
    return {
      images: {
        header,
        introductionMusic,
      },
      songs: [],
      maxSongsPerPage: 10,
      pendingRequests: false,
    }
  },

  methods: {
    async getSongs() {
      if (this.pendingRequests) {
        return
      }

      this.pendingRequests = true

      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()

        await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc.exists ? lastDoc : null)
          .limit(this.maxSongsPerPage)
          .get()
      } else {
        const snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxSongsPerPage)
          .get()
        snapshots.forEach((doc) => {
          this.songs.push({
            docID: doc.id,
            ...doc.data(),
          })
        })
        this.pendingRequests = false
      }
    },

    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const offsetHeight = document.documentElement.offsetHeight
      const innerHeight = window.innerHeight
      const isAtBottom = Math.round(scrollTop + innerHeight) >= offsetHeight
      if (isAtBottom) {
        this.getSongs()
      }
    },
  },
}
</script>
