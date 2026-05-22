<script setup lang="ts">
import { CalendarDays, Check, Download, Heart, LockKeyhole, MapPin, Phone, Save } from 'lucide-vue-next'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

type DrinkState = 'chaud' | 'froid'

type DrinkChoice = {
  id: string
  name: string
  state: DrinkState
}

type Guest = {
  id: string
  full_name: string
  phone: string
  nom_table: string | null
  drink_choice_id: string | null
  comments: string | null
  attendance_confirmed: boolean
  qr_code: string | null
  invite_token: string
  drink_choices?: DrinkChoice | null
}

const route = useRoute()
const client = useSupabaseClient()

const token = computed(() => String(route.params.token || ''))
const guest = ref<Guest | null>(null)
const drinks = ref<DrinkChoice[]>([])
const unlocked = ref(false)
const phoneCheck = ref('')
const loading = ref(true)
const saving = ref(false)
const downloadingPdf = ref(false)
const message = ref('')
const invitationPdf = ref<HTMLElement | null>(null)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const weddingDate = new Date('2026-06-13T09:00:00')

const form = reactive({
  full_name: '',
  phone: '',
  nom_table: '',
  drink_choice_id: '',
  comments: '',
  attendance_confirmed: true
})

const programItems = [
  {
    time: '13 juin 2026 à 09h00',
    title: 'Mariage civil',
    address: 'Avenue Antenne, sur entrée CPA, Commune de Mont-Ngafula.',
    reference: 'Référence : Paroisse Saint des derniers Jours.'
  },
  {
    time: "13 juin 2026 à 19h00'",
    title: 'Fête de célébration',
    address: 'Salle de fête Bijoux de Mbinza, 9, Avenue Kabongo, commune de Ngaliema.',
    reference: 'Référence : Entrée terrain Delvaux.'
  }
]

const normalizePhone = (value: string) => value.replace(/\D/g, '')

const updateCountdown = () => {
  const distance = weddingDate.getTime() - Date.now()

  if (distance <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    if (countdownTimer) clearInterval(countdownTimer)
    return
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

const loadGuest = async () => {
  loading.value = true
  const { data, error } = await client
    .from('guests')
    .select('*, drink_choices(*)')
    .eq('invite_token', token.value)
    .single()

  if (error || !data) {
    message.value = 'Invitation introuvable.'
    loading.value = false
    return
  }

  guest.value = data
  form.full_name = data.full_name
  form.phone = data.phone
  form.nom_table = data.nom_table || ''
  form.drink_choice_id = data.drink_choice_id || ''
  form.comments = data.comments || ''
  form.attendance_confirmed = data.attendance_confirmed

  if (localStorage.getItem(`invite-${token.value}-verified`) === 'true') {
    unlocked.value = true
    await loadDrinks()
  }

  loading.value = false
}

const loadDrinks = async () => {
  const { data, error } = await client
    .from('drink_choices')
    .select('*')
    .order('name', { ascending: true })

  if (!error) drinks.value = data || []
}

const unlock = async () => {
  if (!guest.value) return

  const provided = normalizePhone(phoneCheck.value)
  const expected = normalizePhone(guest.value.phone)

  if (!provided || provided !== expected) {
    message.value = 'Le téléphone ne correspond pas à cette invitation.'
    return
  }

  localStorage.setItem(`invite-${token.value}-verified`, 'true')
  unlocked.value = true
  message.value = ''
  await loadDrinks()
}

const downloadPdf = async () => {
  if (!invitationPdf.value || !guest.value) return

  downloadingPdf.value = true

  try {
    const canvas = await html2canvas(invitationPdf.value, {
      backgroundColor: '#fffdf9',
      scale: 1.6,
      useCORS: true,
      allowTaint: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: invitationPdf.value.scrollWidth,
      windowHeight: invitationPdf.value.scrollHeight,
      onclone: (documentClone) => {
        documentClone.querySelectorAll('.no-pdf').forEach((element) => {
          element.remove()
        })

        const style = documentClone.createElement('style')
        style.textContent = `
          *, *::before, *::after {
            animation: none !important;
            animation-delay: 0s !important;
            transition: none !important;
          }

          .fade-in,
          .delay-1,
          .delay-2,
          .delay-3,
          .save-date-section,
          .countdown-panel,
          .wedding-story,
          .gallery-frame,
          .program-item {
            opacity: 1 !important;
            transform: none !important;
          }

          .invite-card {
            box-shadow: none !important;
            width: 720px !important;
            max-width: 720px !important;
          }

          .gallery-frame {
            justify-self: center !important;
            text-align: center !important;
          }

          .gallery-frame img {
            display: block !important;
            width: 560px !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 260px !important;
            object-fit: cover !important;
            opacity: 1 !important;
            filter: none !important;
          }

          .lead,
          .program-item p,
          .muted,
          figcaption {
            color: #272522 !important;
            opacity: 1 !important;
          }
        `
        documentClone.head.appendChild(style)
      }
    })

    const image = canvas.toDataURL('image/jpeg', 0.68)
    const pdf = new jsPDF('p', 'mm', 'a4', true)
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 12
    const imageWidth = pageWidth - margin * 2
    const imageHeight = (canvas.height * imageWidth) / canvas.width

    let position = margin
    let heightLeft = imageHeight

    pdf.addImage(image, 'JPEG', margin, position, imageWidth, imageHeight, undefined, 'FAST')
    heightLeft -= pageHeight - margin * 2

    while (heightLeft > 0) {
      position = heightLeft - imageHeight + margin
      pdf.addPage()
      pdf.addImage(image, 'JPEG', margin, position, imageWidth, imageHeight, undefined, 'FAST')
      heightLeft -= pageHeight - margin * 2
    }

    const filename = guest.value.full_name.replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')
    pdf.save(`Invitation-${filename || 'invite'}.pdf`)
  } catch {
    message.value = "Le PDF n'a pas pu être généré. Réessayez dans quelques instants."
  } finally {
    downloadingPdf.value = false
  }
}

const save = async () => {
  if (!guest.value) return

  saving.value = true
  const { data, error } = await client
    .from('guests')
    .update({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      nom_table: form.nom_table.trim() || null,
      drink_choice_id: form.drink_choice_id || null,
      comments: form.comments.trim() || null,
      attendance_confirmed: form.attendance_confirmed
    })
    .eq('id', guest.value.id)
    .select('*, drink_choices(*)')
    .single()

  saving.value = false

  if (error) {
    message.value = error.message
    return
  }

  guest.value = data
  message.value = 'Vos informations ont été enregistrées.'
}

onMounted(async () => {
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
  await loadGuest()
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <main class="invite-layout">
    <article ref="invitationPdf" class="invite-card">
      <div class="invite-cover">
        <div class="brand">
          <span class="brand-mark"><Heart :size="22" /></span>
          <h2><em>Invitation</em></h2>
         
        </div>
        
      </div>

      <div class="panel-body">
        <div v-if="loading" class="empty">Chargement de l'invitation...</div>

        <template v-else-if="guest && !unlocked">
          <LockKeyhole :size="32" />
          <h2 style="margin-top: 16px;">Bonjour {{ guest.full_name }}</h2>
          <p class="lead">
            Pour ouvrir cette invitation personnelle, confirmez votre numéro de téléphone.
          </p>
          <form class="grid" @submit.prevent="unlock">
            <label class="field">
              <span>Téléphone</span>
              <input v-model="phoneCheck" class="input" inputmode="tel" autocomplete="tel" required>
            </label>
            <button class="btn" type="submit">
              <Check :size="18" />
              Ouvrir l'invitation
            </button>
          </form>
        </template>

        <template v-else-if="guest">
          <section class="save-date-section fade-in">
           
            <h2>Mérite & Arnold Mbutu</h2>
            <p class="lead">
              Avec des cœurs remplis de joie et d'amour, nous vous invitons chaleureusement
              à célébrer notre mariage.
            </p>

            <div class="scroll-gallery" aria-label="Galerie de mariage">

              <!-- <figure class="gallery-frame gallery-frame-offset fade-in delay-2">
                <img  style="justify-content:center; text-align: center;"
                  src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80"
                  crossorigin="anonymous"
                  alt="Cérémonie de mariage"
                >
                <figcaption>Votre présence rendra cette célébration plus belle.</figcaption>
              </figure> -->
            </div>
          </section>

          <section class="countdown-panel fade-in delay-1" aria-label="Compte à rebours">
            <h3>Prévu dans :</h3>
            <div class="countdown-grid">
              <div class="countdown-item countdown-dark">
                <strong>{{ days }}</strong>
                <span>Jours</span>
              </div>
              <div class="countdown-item countdown-mid">
                <strong>{{ hours }}</strong>
                <span>Heures</span>
              </div>
              <div class="countdown-item countdown-soft">
                <strong>{{ minutes }}</strong>
                <span>Minutes</span>
              </div>
              <div class="countdown-item countdown-light">
                <strong>{{ seconds }}</strong>
                <span>Secondes</span>
              </div>
            </div>
          </section>

          <section class="wedding-story fade-in delay-2">
           
            <h2 style="text-align:center; margin: 0">Programme</h2>

            <div class="program-grid">
              <article v-for="item in programItems" :key="item.title" class="program-item">
                <CalendarDays :size="22" />
                <div>
                  <strong>{{ item.time }} : {{ item.title }}</strong>
                  <p>
                    <MapPin :size="16" />
                    {{ item.address }}
                  </p>
                  <p>{{ item.reference }}</p>
                </div>
              </article>

              <article class="program-item">
                <Phone :size="22" />
                <div>
                  <strong>Contacts</strong>
                  <p>+243830820831, +243813801509</p>
                </div>
              </article>
            </div>
          </section>

          <p class="eyebrow">Vous êtes invité(e)</p>
          <h2>{{ guest.full_name }}</h2>
          <p v-if="guest.nom_table" class="badge" style="margin-bottom: 14px;">Table : {{ guest.nom_table }}</p>
          <p class="lead">
            Confirmez votre présence et mettez à jour votre choix de boisson.
          </p>

          <form class="grid two" @submit.prevent="save">
            <label class="field">
              <span>Nom complet</span>
              <input v-model="form.full_name" class="input" required>
            </label>
            <label class="field">
              <span>Téléphone</span>
              <input v-model="form.phone" class="input" inputmode="tel" required>
            </label>
            <label class="field">
              <span>Nom table</span>
              <input disabled v-model="form.nom_table" class="input" placeholder="Votre table">
            </label>
            <label class="field">
              <span>Présence</span>
              <select v-model="form.attendance_confirmed" class="select">
                <option :value="true">Je confirme ma présence</option>
                <option :value="false">Je ne pourrai pas venir</option>
              </select>
            </label>
            <label class="field">
              <span>Choix de boisson</span>
              <select v-model="form.drink_choice_id" class="select">
                <option value="">Aucun choix</option>
                <option v-for="drink in drinks" :key="drink.id" :value="drink.id">
                  {{ drink.name }} - {{ drink.state }}
                </option>
              </select>
            </label>
            <label class="field" style="grid-column: 1 / -1;">
              <span>Commentaires</span>
              <textarea v-model="form.comments" class="textarea" />
            </label>

            <div class="panel" style="grid-column: 1 / -1;">
              <div class="panel-body" style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <img v-if="guest.qr_code" class="qr" :src="guest.qr_code" alt="QR code invitation">
                <p v-if="form.nom_table" class="badge">Table : {{ form.nom_table }}</p>
                <div>
                  <strong>QR code invité</strong>
                  <p class="muted" style="margin-bottom: 0;">Il contient votre nom complet et votre téléphone.</p>
                </div>
              </div>
            </div>

            <button class="btn" type="submit" :disabled="saving" style="grid-column: 1 / -1;">
              <Save :size="18" />
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </form>
          <div class="actions no-pdf" style="margin-bottom: 24px;">
            <button class="btn" type="button" :disabled="downloadingPdf" @click="downloadPdf">
              <Download :size="18" />
              {{ downloadingPdf ? 'Préparation du PDF...' : 'Télécharger PDF invitation' }}
            </button>
          </div>
        </template>

        <div v-else class="empty">{{ message }}</div>

        <p v-if="message" class="toast">{{ message }}</p>
      </div>
    </article>
  </main>
</template>
