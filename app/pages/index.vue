<script setup lang="ts">
import { ArrowRight, GlassWater, Heart, ShieldCheck, UsersRound } from 'lucide-vue-next'
</script>

<template>
  <main>
    <div class="shell">
      <header class="topbar">
        <NuxtLink class="brand" to="/">
          <span class="brand-mark"><Heart :size="22" /></span>
          <span>Wedding Art</span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink class="btn secondary" to="/admin">
            <UsersRound :size="18" />
            Admin
          </NuxtLink>
        </nav>
      </header>

      <section class="hero">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Gestion d'invites de mariage</p>
            <h2>Invitations, confirmations et boissons au meme endroit.</h2>
            <p class="lead">
              Une application Nuxt pour enregistrer les invites, generer un lien personnel,
              suivre les confirmations et permettre a chaque invite de choisir sa boisson.
            </p>
            <div class="actions">
              <NuxtLink class="btn" to="/admin">
                Ouvrir l'espace admin
                <ArrowRight :size="18" />
              </NuxtLink>
              <a class="btn secondary" href="#schema">
                <ShieldCheck :size="18" />
                Voir le modele
              </a>
            </div>
          </div>

          <div class="preview" aria-label="Ambiance mariage">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=80"
              alt="Table de mariage elegante"
            >
          </div>
        </div>
      </section>

      <section id="schema" class="grid three" style="padding-bottom: 56px;">
        <article class="panel">
          <div class="panel-body">
            <GlassWater :size="28" />
            <h3>Boissons</h3>
            <p class="muted">Ajout des boissons chaudes ou froides, reutilisees dans les fiches invites.</p>
          </div>
        </article>
        <article class="panel">
          <div class="panel-body">
            <UsersRound :size="28" />
            <h3>Invites</h3>
            <p class="muted">Nom complet, telephone, commentaire, confirmation, boisson et QR code.</p>
          </div>
        </article>
        <article class="panel">
          <div class="panel-body">
            <ShieldCheck :size="28" />
            <h3>Lien personnel</h3>
            <p class="muted">Chaque lien contient un jeton unique et demande le telephone pour ouvrir l'invitation.</p>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
