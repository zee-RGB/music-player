<template>
  <div class="font-sans pb-24">
    <!-- Header -->
    <AppHeader />

    <!-- Introduction -->
    <IntroductionApp :images="images" />

    <!-- Main Content -->
    <MainContent />

    <!-- Player -->
    <AppPlayer />

    <!-- Auth Modal -->
    <AuthModal :images="images" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import IntroductionApp from '@/components/IntroductionApp.vue'
import MainContent from '@/components/MainContent.vue'
import AppPlayer from './components/AppPlayer.vue'
import AuthModal from './components/AuthModal.vue'

import header from '@/assets/img/header.png'
import introductionMusic from '@/assets/img/introduction-music.png'
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
    IntroductionApp,
    MainContent,
    AppPlayer,
    AuthModal,
  },

  data() {
    return {
      images: {
        header,
        introductionMusic,
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
