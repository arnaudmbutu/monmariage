import { _ as __nuxt_component_0 } from './nuxt-link-C1WIfhYW.mjs';
import { defineComponent, ref, reactive, computed, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { UsersRound, RefreshCw, LogOut, LockKeyhole, UserPlus, Copy, Trash2, Plus, GlassWater } from 'lucide-vue-next';
import { u as useSupabaseClient } from './useSupabaseClient-DxYTVa8G.mjs';
import { a as useRoute } from './server.mjs';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useRoute();
    const isUnlocked = ref(false);
    const pin = ref("");
    const activeTab = ref("guests");
    const loading = ref(false);
    const toast = ref("");
    const drinks = ref([]);
    const guests = ref([]);
    const drinkForm = reactive({
      name: "",
      state: "froid"
    });
    const guestForm = reactive({
      full_name: "",
      phone: "",
      nom_table: "",
      drink_choice_id: "",
      comments: "",
      attendance_confirmed: false
    });
    computed(() => {
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="shell"><header class="topbar">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "brand",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="brand-mark"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UsersRound), { size: 22 }, null, _parent2, _scopeId));
            _push2(`</span><span${_scopeId}>Wedding Art Admin</span>`);
          } else {
            return [
              createVNode("span", { class: "brand-mark" }, [
                createVNode(unref(UsersRound), { size: 22 })
              ]),
              createVNode("span", null, "Wedding Art Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav">`);
      if (unref(isUnlocked)) {
        _push(`<button class="btn secondary" type="button">`);
        _push(ssrRenderComponent(unref(RefreshCw), { size: 18 }, null, _parent));
        _push(` Actualiser </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isUnlocked)) {
        _push(`<button class="btn warning" type="button">`);
        _push(ssrRenderComponent(unref(LogOut), { size: 18 }, null, _parent));
        _push(` Fermer </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></header>`);
      if (!unref(isUnlocked)) {
        _push(`<section class="invite-layout"><form class="invite-card"><div class="panel-body">`);
        _push(ssrRenderComponent(unref(LockKeyhole), { size: 34 }, null, _parent));
        _push(`<h1 style="${ssrRenderStyle({ "font-size": "clamp(2rem, 6vw, 4rem)", "margin-top": "18px" })}">Espace admin</h1><p class="lead">Entrez le code admin pour gerer les invites et les boissons.</p><label class="field"><span>Code admin</span><input${ssrRenderAttr("value", unref(pin))} class="input" type="password" autocomplete="current-password"></label><div class="actions"><button class="btn" type="submit">Entrer</button></div></div></form></section>`);
      } else {
        _push(`<section class="panel"><div class="panel-header"><div><p class="eyebrow">Tableau de bord</p><h2>Gestion des invites</h2></div><span class="badge">${ssrInterpolate(unref(guests).length)} invites</span></div><div class="panel-body"><div class="tabs" role="tablist"><button class="${ssrRenderClass([{ active: unref(activeTab) === "guests" }, "tab"])}" type="button"> Invites </button><button class="${ssrRenderClass([{ active: unref(activeTab) === "drinks" }, "tab"])}" type="button"> Boissons </button></div>`);
        if (unref(activeTab) === "guests") {
          _push(`<div class="grid"><form class="grid two"><label class="field"><span>Nom complet</span><input${ssrRenderAttr("value", unref(guestForm).full_name)} class="input" required></label><label class="field"><span>Telephone</span><input${ssrRenderAttr("value", unref(guestForm).phone)} class="input" required></label><label class="field"><span>Nom table</span><input${ssrRenderAttr("value", unref(guestForm).nom_table)} class="input" placeholder="Table 1, Famille, VIP..."></label><label class="field"><span>Choix boisson</span><select class="select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(guestForm).drink_choice_id) ? ssrLooseContain(unref(guestForm).drink_choice_id, "") : ssrLooseEqual(unref(guestForm).drink_choice_id, "")) ? " selected" : ""}>Aucun choix</option><!--[-->`);
          ssrRenderList(unref(drinks), (drink) => {
            _push(`<option${ssrRenderAttr("value", drink.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(guestForm).drink_choice_id) ? ssrLooseContain(unref(guestForm).drink_choice_id, drink.id) : ssrLooseEqual(unref(guestForm).drink_choice_id, drink.id)) ? " selected" : ""}>${ssrInterpolate(drink.name)} - ${ssrInterpolate(drink.state)}</option>`);
          });
          _push(`<!--]--></select></label><label class="field"><span>Presence confirmee</span><select class="select"><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(unref(guestForm).attendance_confirmed) ? ssrLooseContain(unref(guestForm).attendance_confirmed, false) : ssrLooseEqual(unref(guestForm).attendance_confirmed, false)) ? " selected" : ""}>Non</option><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(unref(guestForm).attendance_confirmed) ? ssrLooseContain(unref(guestForm).attendance_confirmed, true) : ssrLooseEqual(unref(guestForm).attendance_confirmed, true)) ? " selected" : ""}>Oui</option></select></label><label class="field" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><span>Commentaires</span><textarea class="textarea">${ssrInterpolate(unref(guestForm).comments)}</textarea></label><div class="actions" style="${ssrRenderStyle({ "grid-column": "1 / -1", "margin-top": "0" })}"><button class="btn" type="submit">`);
          _push(ssrRenderComponent(unref(UserPlus), { size: 18 }, null, _parent));
          _push(` Ajouter l&#39;invite </button></div></form><div class="table-wrap"><table><thead><tr><th>Invite</th><th>Telephone</th><th>Table</th><th>Boisson</th><th>Presence</th><th>Lien</th><th>QR</th><th></th></tr></thead><tbody><!--[-->`);
          ssrRenderList(unref(guests), (guest) => {
            _push(`<tr><td><strong>${ssrInterpolate(guest.full_name)}</strong><p class="muted">${ssrInterpolate(guest.comments || "Aucun commentaire")}</p></td><td>${ssrInterpolate(guest.phone)}</td><td>${ssrInterpolate(guest.nom_table || "Non attribuee")}</td><td>${ssrInterpolate(guest.drink_choices?.name || "Non choisi")}</td><td><span class="${ssrRenderClass([{ rose: !guest.attendance_confirmed }, "badge"])}">${ssrInterpolate(guest.attendance_confirmed ? "Oui" : "Non")}</span></td><td><button class="icon-btn" type="button" title="Copier le lien">`);
            _push(ssrRenderComponent(unref(Copy), { size: 18 }, null, _parent));
            _push(`</button></td><td>`);
            if (guest.qr_code) {
              _push(`<img class="qr"${ssrRenderAttr("src", guest.qr_code)} alt="QR code invite">`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td><button class="icon-btn" type="button" title="Supprimer">`);
            _push(ssrRenderComponent(unref(Trash2), { size: 18 }, null, _parent));
            _push(`</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
          if (!unref(loading) && unref(guests).length === 0) {
            _push(`<div class="empty">Aucun invite enregistre.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="grid"><form class="grid three"><label class="field" style="${ssrRenderStyle({ "grid-column": "span 2" })}"><span>Nom de la boisson</span><input${ssrRenderAttr("value", unref(drinkForm).name)} class="input" placeholder="Jus, cafe, champagne..." required></label><label class="field"><span>Etat</span><select class="select"><option value="froid"${ssrIncludeBooleanAttr(Array.isArray(unref(drinkForm).state) ? ssrLooseContain(unref(drinkForm).state, "froid") : ssrLooseEqual(unref(drinkForm).state, "froid")) ? " selected" : ""}>Froid</option><option value="chaud"${ssrIncludeBooleanAttr(Array.isArray(unref(drinkForm).state) ? ssrLooseContain(unref(drinkForm).state, "chaud") : ssrLooseEqual(unref(drinkForm).state, "chaud")) ? " selected" : ""}>Chaud</option></select></label><div class="actions" style="${ssrRenderStyle({ "grid-column": "1 / -1", "margin-top": "0" })}"><button class="btn" type="submit">`);
          _push(ssrRenderComponent(unref(Plus), { size: 18 }, null, _parent));
          _push(` Ajouter la boisson </button></div></form><div class="table-wrap"><table><thead><tr><th>Nom</th><th>Etat</th><th></th></tr></thead><tbody><!--[-->`);
          ssrRenderList(unref(drinks), (drink) => {
            _push(`<tr><td><strong>${ssrInterpolate(drink.name)}</strong></td><td><span class="${ssrRenderClass([{ rose: drink.state === "chaud" }, "badge"])}">`);
            _push(ssrRenderComponent(unref(GlassWater), { size: 16 }, null, _parent));
            _push(` ${ssrInterpolate(drink.state)}</span></td><td><button class="icon-btn" type="button" title="Supprimer">`);
            _push(ssrRenderComponent(unref(Trash2), { size: 18 }, null, _parent));
            _push(`</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
          if (!unref(loading) && unref(drinks).length === 0) {
            _push(`<div class="empty">Aucune boisson enregistree.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div></section>`);
      }
      _push(`</div>`);
      if (unref(toast)) {
        _push(`<p class="toast">${ssrInterpolate(unref(toast))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-D-ga2XUq.mjs.map
