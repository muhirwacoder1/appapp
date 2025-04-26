// Translation dictionaries for the application
// Supports English (default), Kinyarwanda, and French

export type Language = {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
};

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼", nativeName: "Kinyarwanda" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
];

// Translation keys by feature
export type TranslationKeys = {
  // Common
  common: {
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    back: string;
    next: string;
    search: string;
    languageSelection: string;
    currentLanguage: string;
  };
  // Auth
  auth: {
    login: string;
    logout: string;
    register: string;
    email: string;
    password: string;
    forgotPassword: string;
    resetPassword: string;
  };
  // Profile
  profile: {
    title: string;
    information: string;
    devices: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    updateProfile: string;
    saveChanges: string;
    connectedDevices: string;
    manageDevices: string;
    lastConnected: string;
    battery: string;
    active: string;
    inactive: string;
    addNewDevice: string;
    language: string;
    changeLanguage: string;
  };
  // Appointment
  appointment: {
    title: string;
    selectDate: string;
    selectProfessional: string;
    selectTime: string;
    confirmBooking: string;
    bookingConfirmed: string;
    bookingFailed: string;
    availableTimes: string;
    noAvailableTimes: string;
    professionals: string;
    back: string;
    next: string;
    book: string;
  };
  // Register Insole
  registerInsole: {
    title: string;
    serialNumber: string;
    email: string;
    phone: string;
    fullName: string;
    register: string;
    enterSerialNumber: string;
    enterEmail: string;
    enterPhone: string;
    enterFullName: string;
    description: string;
    benefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    footerText: string;
  };
};

// English translations (default)
export const enTranslations: TranslationKeys = {
  common: {
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    submit: "Submit",
    loading: "Loading...",
    success: "Success!",
    error: "Error",
    back: "Back",
    next: "Next",
    search: "Search",
    languageSelection: "Language Selection",
    currentLanguage: "Current Language",
  },
  auth: {
    login: "Login",
    logout: "Logout",
    register: "Register",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
  },
  profile: {
    title: "Profile",
    information: "Profile Information",
    devices: "Connected Devices",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    updateProfile: "Update Profile",
    saveChanges: "Save Changes",
    connectedDevices: "Connected Devices",
    manageDevices: "Manage your connected foot pressure monitoring devices",
    lastConnected: "Last connected",
    battery: "Battery",
    active: "Active",
    inactive: "Inactive",
    addNewDevice: "Add New Device",
    language: "Language",
    changeLanguage: "Change Language",
  },
  appointment: {
    title: "Book Appointment",
    selectDate: "Select Date",
    selectProfessional: "Select Healthcare Professional",
    selectTime: "Select Time",
    confirmBooking: "Confirm Booking",
    bookingConfirmed: "Booking Confirmed!",
    bookingFailed: "Booking Failed",
    availableTimes: "Available Times",
    noAvailableTimes: "No available times for this date",
    professionals: "Healthcare Professionals",
    back: "Back",
    next: "Next",
    book: "Book Appointment",
  },
  registerInsole: {
    title: "Register New Insole",
    serialNumber: "Serial Number",
    email: "Email",
    phone: "Phone",
    fullName: "Full Name",
    register: "Register Device",
    enterSerialNumber: "Enter device serial number",
    enterEmail: "Enter your email",
    enterPhone: "Enter your phone number",
    enterFullName: "Enter your full name",
    description: "Enter your details to register your new insole device",
    benefits: "Smart Insole Benefits",
    benefit1: "Real-time pressure monitoring for better foot health",
    benefit2: "Personalized insights and recommendations",
    benefit3: "Connect with healthcare professionals",
    benefit4: "Track progress and improvements over time",
    footerText: "Register your device to unlock all features and start your journey to better foot health.",
  },
};

// Kinyarwanda translations
export const rwTranslations: TranslationKeys = {
  common: {
    save: "Kubika",
    cancel: "Guhagarika",
    edit: "Guhindura",
    delete: "Gusiba",
    submit: "Kohereza",
    loading: "Biratunganywa...",
    success: "Byagenze neza!",
    error: "Ikosa",
    back: "Gusubira inyuma",
    next: "Komeza",
    search: "Gushakisha",
    languageSelection: "Guhitamo Ururimi",
    currentLanguage: "Ururimi Rukoresha",
  },
  auth: {
    login: "Kwinjira",
    logout: "Gusohoka",
    register: "Kwiyandikisha",
    email: "Imeri",
    password: "Ijambo ry'ibanga",
    forgotPassword: "Wibagiwe Ijambo ry'ibanga",
    resetPassword: "Guhindura Ijambo ry'ibanga",
  },
  profile: {
    title: "Umwirondoro",
    information: "Amakuru y'Umwirondoro",
    devices: "Ibikoresho Bifatanyije",
    fullName: "Amazina Yombi",
    email: "Imeri",
    phone: "Telefoni",
    location: "Aho Uherereye",
    updateProfile: "Kuvugurura Umwirondoro",
    saveChanges: "Kubika Impinduka",
    connectedDevices: "Ibikoresho Bifatanyije",
    manageDevices: "Gucunga ibikoresho byawe bigenzura umuvuduko w'ibirenge",
    lastConnected: "Igihe cyanyuma yafatanyije",
    battery: "Batiri",
    active: "Kirakora",
    inactive: "Ntigirakora",
    addNewDevice: "Ongeraho Igikoresho Gishya",
    language: "Ururimi",
    changeLanguage: "Guhindura Ururimi",
  },
  appointment: {
    title: "Gusaba Guhura",
    selectDate: "Hitamo Itariki",
    selectProfessional: "Hitamo Umuganga",
    selectTime: "Hitamo Igihe",
    confirmBooking: "Emeza Gusaba",
    bookingConfirmed: "Gusaba Byemejwe!",
    bookingFailed: "Gusaba Ntibyagenze Neza",
    availableTimes: "Ibihe Bihari",
    noAvailableTimes: "Nta bihe bihari kuri iyi tariki",
    professionals: "Abaganga",
    back: "Gusubira Inyuma",
    next: "Komeza",
    book: "Saba Guhura",
  },
  registerInsole: {
    title: "Kwandikisha Insole Nshya",
    serialNumber: "Nomero Iranga",
    email: "Imeri",
    phone: "Telefoni",
    fullName: "Amazina Yombi",
    register: "Kwandikisha Igikoresho",
    enterSerialNumber: "Andika nomero iranga igikoresho",
    enterEmail: "Andika imeri yawe",
    enterPhone: "Andika nomero ya telefoni yawe",
    enterFullName: "Andika amazina yawe yombi",
    description: "Andika amakuru yawe kugira ngo wandikishe igikoresho cyawe gishya",
    benefits: "Akamaro k'Insole Nshya",
    benefit1: "Gukurikirana uko ibirenge byawe bihagaze mu gihe nyacyo",
    benefit2: "Inama zikwiye buri muntu ku giti cye",
    benefit3: "Gukorana n'abaganga",
    benefit4: "Gukurikirana iterambere ryawe",
    footerText: "Andikisha igikoresho cyawe kugira ngo ubone serivisi zose kandi utangire urugendo rwo kugira ibirenge byiza.",
  },
};

// French translations
export const frTranslations: TranslationKeys = {
  common: {
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    submit: "Soumettre",
    loading: "Chargement...",
    success: "Succès!",
    error: "Erreur",
    back: "Retour",
    next: "Suivant",
    search: "Rechercher",
    languageSelection: "Sélection de la Langue",
    currentLanguage: "Langue Actuelle",
  },
  auth: {
    login: "Connexion",
    logout: "Déconnexion",
    register: "S'inscrire",
    email: "Email",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié",
    resetPassword: "Réinitialiser le mot de passe",
  },
  profile: {
    title: "Profil",
    information: "Informations du Profil",
    devices: "Appareils Connectés",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone",
    location: "Emplacement",
    updateProfile: "Mettre à jour le Profil",
    saveChanges: "Enregistrer les Modifications",
    connectedDevices: "Appareils Connectés",
    manageDevices: "Gérer vos appareils de surveillance de pression plantaire",
    lastConnected: "Dernière connexion",
    battery: "Batterie",
    active: "Actif",
    inactive: "Inactif",
    addNewDevice: "Ajouter un Nouvel Appareil",
    language: "Langue",
    changeLanguage: "Changer de Langue",
  },
  appointment: {
    title: "Prendre Rendez-vous",
    selectDate: "Sélectionner une Date",
    selectProfessional: "Sélectionner un Professionnel de Santé",
    selectTime: "Sélectionner une Heure",
    confirmBooking: "Confirmer la Réservation",
    bookingConfirmed: "Réservation Confirmée!",
    bookingFailed: "Échec de la Réservation",
    availableTimes: "Heures Disponibles",
    noAvailableTimes: "Aucune heure disponible pour cette date",
    professionals: "Professionnels de Santé",
    back: "Retour",
    next: "Suivant",
    book: "Réserver",
  },
  registerInsole: {
    title: "Enregistrer Nouvelle Semelle",
    serialNumber: "Numéro de Série",
    email: "Email",
    phone: "Téléphone",
    fullName: "Nom Complet",
    register: "Enregistrer l'Appareil",
    enterSerialNumber: "Entrez le numéro de série de l'appareil",
    enterEmail: "Entrez votre email",
    enterPhone: "Entrez votre numéro de téléphone",
    enterFullName: "Entrez votre nom complet",
    description: "Entrez vos coordonnées pour enregistrer votre nouvelle semelle intelligente",
    benefits: "Avantages de la Semelle Intelligente",
    benefit1: "Surveillance de la pression en temps réel pour une meilleure santé des pieds",
    benefit2: "Conseils et recommandations personnalisés",
    benefit3: "Connectez-vous avec des professionnels de la santé",
    benefit4: "Suivez vos progrès et améliorations au fil du temps",
    footerText: "Enregistrez votre appareil pour débloquer toutes les fonctionnalités et commencer votre parcours vers une meilleure santé des pieds.",
  },
};

// Get translations based on language code
export const getTranslations = (languageCode: string): TranslationKeys => {
  switch (languageCode) {
    case "rw":
      return rwTranslations;
    case "fr":
      return frTranslations;
    case "en":
    default:
      return enTranslations;
  }
};
