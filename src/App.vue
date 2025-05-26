<template>
  <div class="font-sans pb-24">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <router-view />

    <!-- Player -->
    <AppPlayer />

    <!-- Auth Modal -->
    <AuthModal :images="images" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppPlayer from './components/AppPlayer.vue'
import AuthModal from './components/AuthModal.vue'

import introductionUsers from '@/assets/img/introduction-users.png'
import profilePic from '@/assets/img/profile-pic.jpg'
import pwaIcon from '@/assets/img/pwa-192x192.png'
import songHeader from '@/assets/img/song-header.png'
import userHeader from '@/assets/img/user-header.png'

import useUserStore from '@/stores/user'
import { mapWritableState } from 'pinia'
import { auth } from './includes/firebase'

export default {
  components: {
    AppHeader,
    AppPlayer,
    AuthModal,
  },

  data() {
    return {
      images: {
        introductionUsers,
        profilePic,
        pwaIcon,
        songHeader,
        userHeader,
      },
    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.userLoggedIn = !!user
    })
  },
}
</script>
