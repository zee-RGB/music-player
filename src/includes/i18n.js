import { createI18n } from 'vue-i18n'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: 'Welcome to our application!',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      profile: 'Profile',
      settings: 'Settings',
      dashboard: 'Dashboard',
      home: 'Home',
      about: 'About Us',
      contact: 'Contact Us',
    },
    fr: {
      welcome: 'Bienvenue dans notre application!',
      login: 'Connexion',
      logout: 'Déconnexion',
      register: "S'inscrire",
      profile: 'Profil',
      settings: 'Paramètres',
      dashboard: 'Tableau de bord',
      home: 'Accueil',
      about: 'À propos de nous',
      contact: 'Contactez-nous',
    },
  },
})
