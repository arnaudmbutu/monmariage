import { defineComponent, computed, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { Heart, LockKeyhole, Check, CalendarDays, MapPin, Phone, Download, Save } from 'lucide-vue-next';
import { a as useRoute } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-DxYTVa8G.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[token]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useSupabaseClient();
    computed(() => String(route.params.token || ""));
    const guest = ref(null);
    const drinks = ref([]);
    const unlocked = ref(false);
    const phoneCheck = ref("");
    const loading = ref(true);
    const saving = ref(false);
    const downloadingPdf = ref(false);
    const message = ref("");
    ref(null);
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const form = reactive({
      full_name: "",
      phone: "",
      nom_table: "",
      drink_choice_id: "",
      comments: "",
      attendance_confirmed: true
    });
    const programItems = [
      {
        time: "13 juin 2026 à 09h00",
        title: "Mariage civil",
        address: "Avenue Antenne, sur entrée CPA, Commune de Mont-Ngafula.",
        reference: "Référence : Paroisse Saint des derniers Jours."
      },
      {
        time: "13 juin 2026 à 19h00'",
        title: "Fête de célébration",
        address: "Salle de fête Bijoux de Mbinza, 9, Avenue Kabongo, commune de Ngaliema.",
        reference: "Référence : Entrée terrain Delvaux."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "invite-layout" }, _attrs))}><article class="invite-card"><div class="invite-cover"><div class="brand"><span class="brand-mark">`);
      _push(ssrRenderComponent(unref(Heart), { size: 22 }, null, _parent));
      _push(`</span><h2><em>Invitation</em></h2></div></div><div class="panel-body">`);
      if (unref(loading)) {
        _push(`<div class="empty">Chargement de l&#39;invitation...</div>`);
      } else if (unref(guest) && !unref(unlocked)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(LockKeyhole), { size: 32 }, null, _parent));
        _push(`<h2 style="${ssrRenderStyle({ "margin-top": "16px" })}">Bonjour ${ssrInterpolate(unref(guest).full_name)}</h2><p class="lead"> Pour ouvrir cette invitation personnelle, confirmez votre numéro de téléphone. </p><form class="grid"><label class="field"><span>Téléphone</span><input${ssrRenderAttr("value", unref(phoneCheck))} class="input" inputmode="tel" autocomplete="tel" required></label><button class="btn" type="submit">`);
        _push(ssrRenderComponent(unref(Check), { size: 18 }, null, _parent));
        _push(` Ouvrir l&#39;invitation </button></form><!--]-->`);
      } else if (unref(guest)) {
        _push(`<!--[--><section class="save-date-section fade-in"><h2>Mérite &amp; Arnold Mbutu</h2><p class="lead"> Avec des cœurs remplis de joie et d&#39;amour, nous vous invitons chaleureusement à célébrer notre mariage. </p><div class="scroll-gallery" aria-label="Galerie de mariage"></div></section><section class="countdown-panel fade-in delay-1" aria-label="Compte à rebours"><h3>Prévu dans :</h3><div class="countdown-grid"><div class="countdown-item countdown-dark"><strong>${ssrInterpolate(unref(days))}</strong><span>Jours</span></div><div class="countdown-item countdown-mid"><strong>${ssrInterpolate(unref(hours))}</strong><span>Heures</span></div><div class="countdown-item countdown-soft"><strong>${ssrInterpolate(unref(minutes))}</strong><span>Minutes</span></div><div class="countdown-item countdown-light"><strong>${ssrInterpolate(unref(seconds))}</strong><span>Secondes</span></div></div></section><section class="wedding-story fade-in delay-2"><h2 style="${ssrRenderStyle({ "text-align": "center", "margin": "0" })}">Programme</h2><div class="program-grid"><!--[-->`);
        ssrRenderList(programItems, (item) => {
          _push(`<article class="program-item">`);
          _push(ssrRenderComponent(unref(CalendarDays), { size: 22 }, null, _parent));
          _push(`<div><strong>${ssrInterpolate(item.time)} : ${ssrInterpolate(item.title)}</strong><p>`);
          _push(ssrRenderComponent(unref(MapPin), { size: 16 }, null, _parent));
          _push(` ${ssrInterpolate(item.address)}</p><p>${ssrInterpolate(item.reference)}</p></div></article>`);
        });
        _push(`<!--]--><article class="program-item">`);
        _push(ssrRenderComponent(unref(Phone), { size: 22 }, null, _parent));
        _push(`<div><strong>Contacts</strong><p>+243830820831, +243813801509</p></div></article></div></section><div class="actions no-pdf" style="${ssrRenderStyle({ "margin-bottom": "24px" })}"><button class="btn" type="button"${ssrIncludeBooleanAttr(unref(downloadingPdf)) ? " disabled" : ""}>`);
        _push(ssrRenderComponent(unref(Download), { size: 18 }, null, _parent));
        _push(` ${ssrInterpolate(unref(downloadingPdf) ? "Préparation du PDF..." : "Télécharger PDF invitation")}</button></div><p class="eyebrow">Vous êtes invité(e)</p><h2>${ssrInterpolate(unref(guest).full_name)}</h2>`);
        if (unref(guest).nom_table) {
          _push(`<p class="badge" style="${ssrRenderStyle({ "margin-bottom": "14px" })}">Table : ${ssrInterpolate(unref(guest).nom_table)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="lead"> Confirmez votre présence et mettez à jour votre choix de boisson. </p><form class="grid two"><label class="field"><span>Nom complet</span><input${ssrRenderAttr("value", unref(form).full_name)} class="input" required></label><label class="field"><span>Téléphone</span><input${ssrRenderAttr("value", unref(form).phone)} class="input" inputmode="tel" required></label><label class="field"><span>Nom table</span><input disabled${ssrRenderAttr("value", unref(form).nom_table)} class="input" placeholder="Votre table"></label><label class="field"><span>Présence</span><select class="select"><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).attendance_confirmed) ? ssrLooseContain(unref(form).attendance_confirmed, true) : ssrLooseEqual(unref(form).attendance_confirmed, true)) ? " selected" : ""}>Je confirme ma présence</option><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).attendance_confirmed) ? ssrLooseContain(unref(form).attendance_confirmed, false) : ssrLooseEqual(unref(form).attendance_confirmed, false)) ? " selected" : ""}>Je ne pourrai pas venir</option></select></label><label class="field"><span>Choix de boisson</span><select class="select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).drink_choice_id) ? ssrLooseContain(unref(form).drink_choice_id, "") : ssrLooseEqual(unref(form).drink_choice_id, "")) ? " selected" : ""}>Aucun choix</option><!--[-->`);
        ssrRenderList(unref(drinks), (drink) => {
          _push(`<option${ssrRenderAttr("value", drink.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).drink_choice_id) ? ssrLooseContain(unref(form).drink_choice_id, drink.id) : ssrLooseEqual(unref(form).drink_choice_id, drink.id)) ? " selected" : ""}>${ssrInterpolate(drink.name)} - ${ssrInterpolate(drink.state)}</option>`);
        });
        _push(`<!--]--></select></label><label class="field" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><span>Commentaires</span><textarea class="textarea">${ssrInterpolate(unref(form).comments)}</textarea></label><div class="panel" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="panel-body" style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px", "flex-wrap": "wrap" })}">`);
        if (unref(guest).qr_code) {
          _push(`<img class="qr"${ssrRenderAttr("src", unref(guest).qr_code)} alt="QR code invitation">`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form).nom_table) {
          _push(`<p class="badge">Table : ${ssrInterpolate(unref(form).nom_table)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><strong>QR code invité</strong><p class="muted" style="${ssrRenderStyle({ "margin-bottom": "0" })}">Il contient votre nom complet et votre téléphone.</p></div></div></div><button class="btn" type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} style="${ssrRenderStyle({ "grid-column": "1 / -1" })}">`);
        _push(ssrRenderComponent(unref(Save), { size: 18 }, null, _parent));
        _push(` ${ssrInterpolate(unref(saving) ? "Enregistrement..." : "Enregistrer")}</button></form><!--]-->`);
      } else {
        _push(`<div class="empty">${ssrInterpolate(unref(message))}</div>`);
      }
      if (unref(message)) {
        _push(`<p class="toast">${ssrInterpolate(unref(message))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></article></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/invite/[token].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_token_-DJmp4kC2.mjs.map
