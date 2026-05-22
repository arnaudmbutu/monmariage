<script setup lang="ts">
import QRCode from 'qrcode'
import {
  Copy,
  GlassWater,
  LockKeyhole,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  UserPlus,
  UsersRound
} from 'lucide-vue-next'

type DrinkState = 'chaud' | 'froid'

type DrinkChoice = {
  id: string
  name: string
  state: DrinkState
  created_at?: string
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
  created_at?: string
  drink_choices?: DrinkChoice | null
}

const client = useSupabaseClient()
const config = useRuntimeConfig()
const route = useRoute()

const isUnlocked = ref(false)
const pin = ref('')
const activeTab = ref<'guests' | 'drinks'>('guests')
const loading = ref(false)
const toast = ref('')

const drinks = ref<DrinkChoice[]>([])
const guests = ref<Guest[]>([])

const drinkForm = reactive({
  name: '',
  state: 'froid' as DrinkState
})

const guestForm = reactive({
  full_name: '',
  phone: '',
  nom_table: '',
  drink_choice_id: '',
  comments: '',
  attendance_confirmed: false
})

const origin = computed(() => {
  if (import.meta.client) return window.location.origin
  return ''
})

const showToast = (message: string) => {
  toast.value = message
  window.setTimeout(() => {
    toast.value = ''
  }, 3200)
}

const unlock = async () => {
  const submittedPin = pin.value.trim()
  const expectedPin = String(config.public.adminPin || '2026').trim()

  if (submittedPin !== expectedPin) {
    showToast('Code admin incorrect.')
    return
  }

  isUnlocked.value = true
  localStorage.setItem('wedding-admin-unlocked', 'true')
  refreshAll()
}

const lock = () => {
  isUnlocked.value = false
  localStorage.removeItem('wedding-admin-unlocked')
}

const refreshAll = async () => {
  loading.value = true
  await Promise.all([fetchDrinks(), fetchGuests()])
  loading.value = false
}

const fetchDrinks = async () => {
  const { data, error } = await client
    .from('drink_choices')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    showToast(error.message)
    return
  }

  drinks.value = data || []
}

const fetchGuests = async () => {
  const { data, error } = await client
    .from('guests')
    .select('*, drink_choices(*)')
    .order('created_at', { ascending: false })

  if (error) {
    showToast(error.message)
    return
  }

  guests.value = data || []
}

const createDrink = async () => {
  if (!drinkForm.name.trim()) return

  const { error } = await client.from('drink_choices').insert({
    name: drinkForm.name.trim(),
    state: drinkForm.state
  })

  if (error) {
    showToast(error.message)
    return
  }

  drinkForm.name = ''
  drinkForm.state = 'froid'
  await fetchDrinks()
  showToast('Boisson ajoutee.')
}

const deleteDrink = async (id: string) => {
  const { error } = await client.from('drink_choices').delete().eq('id', id)

  if (error) {
    showToast(error.message)
    return
  }

  await fetchDrinks()
  showToast('Boisson supprimee.')
}

const createGuest = async () => {
  if (!guestForm.full_name.trim() || !guestForm.phone.trim()) {
    showToast('Le nom complet et le telephone sont obligatoires.')
    return
  }

  const token = crypto.randomUUID()
  const qrPayload = {
    nom_complet: guestForm.full_name.trim(),
    tel: guestForm.phone.trim(),
    nom_table: guestForm.nom_table.trim() || null
  }
  const qr_code = await QRCode.toDataURL(JSON.stringify(qrPayload), {
    margin: 1,
    width: 320
  })

  const { error } = await client.from('guests').insert({
    full_name: guestForm.full_name.trim(),
    phone: guestForm.phone.trim(),
    nom_table: guestForm.nom_table.trim() || null,
    drink_choice_id: guestForm.drink_choice_id || null,
    comments: guestForm.comments.trim() || null,
    attendance_confirmed: guestForm.attendance_confirmed,
    invite_token: token,
    qr_code
  })

  if (error) {
    showToast(error.message)
    return
  }

  guestForm.full_name = ''
  guestForm.phone = ''
  guestForm.nom_table = ''
  guestForm.drink_choice_id = ''
  guestForm.comments = ''
  guestForm.attendance_confirmed = false
  await fetchGuests()
  showToast('Invite ajoute.')
}

const deleteGuest = async (id: string) => {
  const { error } = await client.from('guests').delete().eq('id', id)

  if (error) {
    showToast(error.message)
    return
  }

  await fetchGuests()
  showToast('Invite supprime.')
}

const inviteLink = (token: string) => `${origin.value}/invite/${token}`

const copyInviteLink = async (token: string) => {
  await navigator.clipboard.writeText(inviteLink(token))
  showToast('Lien copie.')
}

onMounted(async () => {
  if (route.query.tab === 'drinks') activeTab.value = 'drinks'
  if (localStorage.getItem('wedding-admin-unlocked') === 'true') {
    isUnlocked.value = true
    await refreshAll()
  }
})
</script>

<template>
  <main>
    <div class="shell">
      <header class="topbar">
        <NuxtLink class="brand" to="/">
          <span class="brand-mark"><UsersRound :size="22" /></span>
          <span>Wedding Art Admin</span>
        </NuxtLink>
        <nav class="nav">
          <button v-if="isUnlocked" class="btn secondary" type="button" @click="refreshAll">
            <RefreshCw :size="18" />
            Actualiser
          </button>
          <button v-if="isUnlocked" class="btn warning" type="button" @click="lock">
            <LogOut :size="18" />
            Fermer
          </button>
        </nav>
      </header>

      <section v-if="!isUnlocked" class="invite-layout">
        <form class="invite-card" @submit.prevent="unlock">
          <div class="panel-body">
            <LockKeyhole :size="34" />
            <h1 style="font-size: clamp(2rem, 6vw, 4rem); margin-top: 18px;">Espace admin</h1>
            <p class="lead">Entrez le code admin pour gerer les invites et les boissons.</p>
            <label class="field">
              <span>Code admin</span>
              <input v-model="pin" class="input" type="password" autocomplete="current-password">
            </label>
            <div class="actions">
              <button class="btn" type="submit">Entrer</button>
            </div>
          </div>
        </form>
      </section>

      <template v-else>
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Tableau de bord</p>
              <h2>Gestion des invites</h2>
            </div>
            <span class="badge">{{ guests.length }} invites</span>
          </div>
          <div class="panel-body">
            <div class="tabs" role="tablist">
              <button class="tab" :class="{ active: activeTab === 'guests' }" type="button" @click="activeTab = 'guests'">
                Invites
              </button>
              <button class="tab" :class="{ active: activeTab === 'drinks' }" type="button" @click="activeTab = 'drinks'">
                Boissons
              </button>
            </div>

            <div v-if="activeTab === 'guests'" class="grid">
              <form class="grid two" @submit.prevent="createGuest">
                <label class="field">
                  <span>Nom complet</span>
                  <input v-model="guestForm.full_name" class="input" required>
                </label>
                <label class="field">
                  <span>Telephone</span>
                  <input v-model="guestForm.phone" class="input" required>
                </label>
                <label class="field">
                  <span>Nom table</span>
                  <input v-model="guestForm.nom_table" class="input" placeholder="Table 1, Famille, VIP...">
                </label>
                <label class="field">
                  <span>Choix boisson</span>
                  <select v-model="guestForm.drink_choice_id" class="select">
                    <option value="">Aucun choix</option>
                    <option v-for="drink in drinks" :key="drink.id" :value="drink.id">
                      {{ drink.name }} - {{ drink.state }}
                    </option>
                  </select>
                </label>
                <label class="field">
                  <span>Presence confirmee</span>
                  <select v-model="guestForm.attendance_confirmed" class="select">
                    <option :value="false">Non</option>
                    <option :value="true">Oui</option>
                  </select>
                </label>
                <label class="field" style="grid-column: 1 / -1;">
                  <span>Commentaires</span>
                  <textarea v-model="guestForm.comments" class="textarea" />
                </label>
                <div class="actions" style="grid-column: 1 / -1; margin-top: 0;">
                  <button class="btn" type="submit">
                    <UserPlus :size="18" />
                    Ajouter l'invite
                  </button>
                </div>
              </form>

              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Invite</th>
                      <th>Telephone</th>
                      <th>Table</th>
                      <th>Boisson</th>
                      <th>Presence</th>
                      <th>Lien</th>
                      <th>QR</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="guest in guests" :key="guest.id">
                      <td>
                        <strong>{{ guest.full_name }}</strong>
                        <p class="muted">{{ guest.comments || 'Aucun commentaire' }}</p>
                      </td>
                      <td>{{ guest.phone }}</td>
                      <td>{{ guest.nom_table || 'Non attribuee' }}</td>
                      <td>{{ guest.drink_choices?.name || 'Non choisi' }}</td>
                      <td>
                        <span class="badge" :class="{ rose: !guest.attendance_confirmed }">
                          {{ guest.attendance_confirmed ? 'Oui' : 'Non' }}
                        </span>
                      </td>
                      <td>
                        <button class="icon-btn" type="button" title="Copier le lien" @click="copyInviteLink(guest.invite_token)">
                          <Copy :size="18" />
                        </button>
                      </td>
                      <td>
                        <img v-if="guest.qr_code" class="qr" :src="guest.qr_code" alt="QR code invite">
                      </td>
                      <td>
                        <button class="icon-btn" type="button" title="Supprimer" @click="deleteGuest(guest.id)">
                          <Trash2 :size="18" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="!loading && guests.length === 0" class="empty">Aucun invite enregistre.</div>
            </div>

            <div v-else class="grid">
              <form class="grid three" @submit.prevent="createDrink">
                <label class="field" style="grid-column: span 2;">
                  <span>Nom de la boisson</span>
                  <input v-model="drinkForm.name" class="input" placeholder="Jus, cafe, champagne..." required>
                </label>
                <label class="field">
                  <span>Etat</span>
                  <select v-model="drinkForm.state" class="select">
                    <option value="froid">Froid</option>
                    <option value="chaud">Chaud</option>
                  </select>
                </label>
                <div class="actions" style="grid-column: 1 / -1; margin-top: 0;">
                  <button class="btn" type="submit">
                    <Plus :size="18" />
                    Ajouter la boisson
                  </button>
                </div>
              </form>

              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Etat</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="drink in drinks" :key="drink.id">
                      <td><strong>{{ drink.name }}</strong></td>
                      <td>
                        <span class="badge" :class="{ rose: drink.state === 'chaud' }">
                          <GlassWater :size="16" />
                          {{ drink.state }}
                        </span>
                      </td>
                      <td>
                        <button class="icon-btn" type="button" title="Supprimer" @click="deleteDrink(drink.id)">
                          <Trash2 :size="18" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="!loading && drinks.length === 0" class="empty">Aucune boisson enregistree.</div>
            </div>
          </div>
        </section>
      </template>
    </div>

    <p v-if="toast" class="toast">{{ toast }}</p>
  </main>
</template>
