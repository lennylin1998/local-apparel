import PrimeVue from "primevue/config"
import Button from "primevue/button"
import Sidebar from "primevue/sidebar"
import PanelMenu from 'primevue/panelmenu'
import Menubar from 'primevue/menubar'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    nuxtApp.vueApp.component("PanelMenu", PanelMenu);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Toolbar", Toolbar);
    nuxtApp.vueApp.component("Card", Card);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
});