import { auth, db } from '@/includes/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: values.name,
        age: values.age,
        country: values.country,
        email: values.email,
        hobbies: values.hobbies,
        fave_past_time: values.fave_past_time,
        createdAt: serverTimestamp(),
      })

      await updateProfile(userCred.user, {
        displayName: values.name,
      })

      this.userLoggedIn = true
    },

    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },

    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    },
  },
})
