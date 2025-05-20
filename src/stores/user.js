import { auth, db } from '@/includes/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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

      await userCred.user.updateProfile({
        displayName: values.name,
      })

      this.userLoggedIn = true
    },
  },
})
