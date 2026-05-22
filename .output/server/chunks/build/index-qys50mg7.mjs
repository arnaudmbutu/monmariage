import { _ as __nuxt_component_0 } from './nuxt-link-C1WIfhYW.mjs';
import { defineComponent, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { Heart, UsersRound, ArrowRight, ShieldCheck, GlassWater } from 'lucide-vue-next';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
            _push2(ssrRenderComponent(unref(Heart), { size: 22 }, null, _parent2, _scopeId));
            _push2(`</span><span${_scopeId}>Wedding Art</span>`);
          } else {
            return [
              createVNode("span", { class: "brand-mark" }, [
                createVNode(unref(Heart), { size: 22 })
              ]),
              createVNode("span", null, "Wedding Art")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn secondary",
        to: "/admin"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UsersRound), { size: 18 }, null, _parent2, _scopeId));
            _push2(` Admin `);
          } else {
            return [
              createVNode(unref(UsersRound), { size: 18 }),
              createTextVNode(" Admin ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></header><section class="hero"><div class="hero-grid"><div><p class="eyebrow">Gestion d&#39;invites de mariage</p><h1>Invitations, confirmations et boissons au meme endroit.</h1><p class="lead"> Une application Nuxt pour enregistrer les invites, generer un lien personnel, suivre les confirmations et permettre a chaque invite de choisir sa boisson. </p><div class="actions">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn",
        to: "/admin"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ouvrir l&#39;espace admin `);
            _push2(ssrRenderComponent(unref(ArrowRight), { size: 18 }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Ouvrir l'espace admin "),
              createVNode(unref(ArrowRight), { size: 18 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="btn secondary" href="#schema">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { size: 18 }, null, _parent));
      _push(` Voir le modele </a></div></div><div class="preview" aria-label="Ambiance mariage"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&amp;fit=crop&amp;w=1100&amp;q=80" alt="Table de mariage elegante"></div></div></section><section id="schema" class="grid three" style="${ssrRenderStyle({ "padding-bottom": "56px" })}"><article class="panel"><div class="panel-body">`);
      _push(ssrRenderComponent(unref(GlassWater), { size: 28 }, null, _parent));
      _push(`<h3>Boissons</h3><p class="muted">Ajout des boissons chaudes ou froides, reutilisees dans les fiches invites.</p></div></article><article class="panel"><div class="panel-body">`);
      _push(ssrRenderComponent(unref(UsersRound), { size: 28 }, null, _parent));
      _push(`<h3>Invites</h3><p class="muted">Nom complet, telephone, commentaire, confirmation, boisson et QR code.</p></div></article><article class="panel"><div class="panel-body">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { size: 28 }, null, _parent));
      _push(`<h3>Lien personnel</h3><p class="muted">Chaque lien contient un jeton unique et demande le telephone pour ouvrir l&#39;invitation.</p></div></article></section></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-qys50mg7.mjs.map
