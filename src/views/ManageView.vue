import useUserStore from '@/stores/user';
<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadMusic ref="uploadMusic" />
      </div>

      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CompositionItem from '@/components/CompositionItem.vue'
import UploadMusic from '@/components/UploadMusic.vue'
import { auth, songsCollection } from '@/includes/firebase'

export default {
  name: 'ManageView',

  components: {
    UploadMusic,
    CompositionItem,
  },

  data() {
    return {
      songs: [],
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$refs.uploadMusic.cancelUpload()
    next()
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id,
      }
      this.songs.push(song)
    })
  },
  methods: {
    async updateSong(i, values) {
      this.songs[i].name = values.modified_name
      this.songs[i].genre = values.modified_genre

      try {
        await songsCollection.doc(this.songs[i].docID).update({
          name: values.modified_name,
          genre: values.modified_genre,
        })
      } catch (error) {
        console.error('Error updating song:', error)
      }
    },
  },
}
</script>
