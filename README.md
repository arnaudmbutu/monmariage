# Wedding Guest Manager

Application Nuxt pour gerer les invites d'un mariage avec Supabase comme backend gratuit de test.

## Fonctionnalites

- Espace admin avec code simple pour le prototype.
- Creation des choix de boisson: nom et etat `chaud` ou `froid`.
- Creation des invites: nom complet, telephone, boisson, commentaire, confirmation de presence et QR code.
- Lien personnel `/invite/[token]` pour chaque invite.
- Verification du telephone avant ouverture de l'invitation.
- Mise a jour par l'invite de son nom, telephone, presence, boisson et commentaire.

## Backend gratuit de test

1. Creez un projet gratuit sur Supabase.
2. Ouvrez le SQL Editor.
3. Collez et executez le contenu de `supabase/schema.sql`.
4. Copiez `.env.example` vers `.env`.
5. Renseignez `SUPABASE_URL`, `SUPABASE_KEY` et `NUXT_PUBLIC_ADMIN_PIN`.

## Commandes

```bash
npm install
npm run dev
```

## Note securite

Le code admin et les politiques Supabase fournis sont faits pour un prototype rapide. Pour une version de production, il faut ajouter une vraie authentification admin, des policies RLS limitees, et idealement une validation cote serveur pour verrouiller les liens d'invitation.
