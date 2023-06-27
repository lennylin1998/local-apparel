import PrimeVue from "primevue/config"
import Button from "primevue/button"
import Sidebar from "primevue/sidebar"
import PanelMenu from 'primevue/panelmenu'
import Menubar from 'primevue/menubar'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Slider from 'primevue/slider'
import StyleClass from 'primevue/styleclass'
import MultiSelect from 'primevue/multiselect'
import SpeedDial from 'primevue/speeddial'
import Fieldset from 'primevue/fieldset'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    nuxtApp.vueApp.component("PanelMenu", PanelMenu);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Toolbar", Toolbar);
    nuxtApp.vueApp.component("Card", Card);
    nuxtApp.vueApp.component("Dropdown", Dropdown);
    nuxtApp.vueApp.component("TabView", TabView);
    nuxtApp.vueApp.component("TabPanel", TabPanel);
    nuxtApp.vueApp.component("Slider", Slider);
    nuxtApp.vueApp.component("MultiSelect", MultiSelect);
    nuxtApp.vueApp.component("SpeedDial", SpeedDial);
    nuxtApp.vueApp.component("Fieldset", Fieldset);
    nuxtApp.vueApp.component("Dialog", Dialog);
    nuxtApp.vueApp.component("Divider", Divider);
    nuxtApp.vueApp.component("FileUpload", FileUpload);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("InputNumber", InputNumber);
    nuxtApp.vueApp.component("Textarea", Textarea);
    nuxtApp.vueApp.directive("styleclass", StyleClass);

});