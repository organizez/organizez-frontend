import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import EventForm from '../views/EventForm.vue'
import ContactForm from '../views/ContactForm.vue'
import Services from '../views/Services.vue'
import ServiceDetails from '../views/ServiceDetails.vue'
import Portofolio from '../views/Portofolio.vue'
import Blog from '../views/Blog.vue'
import BlogArticle from '../views/BlogArticle.vue'
import AboutUs from '../views/AboutUs.vue'
import DataPrivacyPolicy from '../views/DataPrivacyPolicy.vue'
import TermsConditions from '../views/TermsConditions.vue'
import DashboardAdministration from '../views/administration/DashboardAdministration.vue'
import UsersAdministration from '../views/administration/user-administration/UsersAdministration.vue'
import CategoriesAdministration from '../views/administration/customers-services-categories-administration/CategoriesAdministration'
import CategoriesAdding from '../views/administration/customers-services-categories-administration/CategoriesAdding'
import CategoriesEditing from '../views/administration/customers-services-categories-administration/CategoriesEditing'
import CustomersAdministration from '../views/administration/customers-administration/CustomersAdministration'
import CustomersEditing from '../views/administration/customers-administration/CustomersEditing'
import CustomersAdding from '../views/administration/customers-administration/CustomersAdding'
import PortofolioAdministration from '../views/administration/portofolio-administration/PortofolioAdministration.vue'
import PortofolioAdding from '../views/administration/portofolio-administration/PortofolioAdding.vue'
import PortofolioEditing from '../views/administration/portofolio-administration/PortofolioEditing.vue'
import BlogAdministration from '../views/administration/blog-administration/BlogAdministration.vue'
import BlogAdding from '../views/administration/blog-administration/BlogAdding.vue'
import BlogEditing from '../views/administration/blog-administration/BlogEditing.vue'
import AboutUsAdministration from '../views/administration/AboutUsAdministration.vue'
import DataPrivacyPolicyAdministration from '../views/administration/DataPrivacyPolicyAdministration.vue'
import TermsConditionsAdministration from '../views/administration/TermsConditionsAdministration.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/administrare/:idUser',
        name: 'dashboard-administration',
        component: DashboardAdministration
    },
    {
        path: '/administrare/utilizatori/:idUser',
        name: 'users-administration',
        component: UsersAdministration
    },
    {
        path: '/administrare/categorii/:idUser',
        name: 'categorii-administration',
        component: CategoriesAdministration
    },
    {
        path: '/administrare/adaugare-categorie/:idUser',
        name: 'categorie-adaugare',
        component: CategoriesAdding
    },
    {
        path: '/administrare/editare-categorie/:idCategory/:idUser',
        name: 'categorie-editare',
        component: CategoriesEditing
    },
    {
        path: '/administrare/clienti/:idUser',
        name: 'clienti-administration',
        component: CustomersAdministration
    },
    {
        path: '/administrare/adaugare-client/:idUser',
        name: 'clienti-adaugare',
        component: CustomersAdding
    },
    {
        path: '/administrare/editare-client/:idClient/:idUser',
        name: 'clienti-editare',
        component: CustomersEditing
    },
    {
        path: '/administrare/portofoliu/:idUser',
        name: 'portofolio-administration',
        component: PortofolioAdministration
    },
    {
        path: '/administrare/adaugare-portofoliu/:idUser',
        name: 'portofoliu-adaugare',
        component: PortofolioAdding
    },
    {
        path: '/administrare/editare-portofoliu/:idImage/:idUser',
        name: 'portofoliu-editare',
        component: PortofolioEditing
    },
    {
        path: '/administrare/blog/:idUser',
        name: 'blog-administration',
        component: BlogAdministration
    },
    {
        path: '/administrare/adaugare-blog/:idUser',
        name: 'blog-adaugare',
        component: BlogAdding
    },
    {
        path: '/administrare/editare-blog/:idBlogArticle/:idUser',
        name: 'blog-editare',
        component: BlogEditing
    },
    {
        path: '/administrare/despre-noi/:idUser',
        name: 'about-us-administration',
        component: AboutUsAdministration
    },
    {
        path: '/administrare/politica-de-confidentialitate-a-datelor/:idUser',
        name: 'data-privacy-policy-administration',
        component: DataPrivacyPolicyAdministration
    },
    {
        path: '/administrare/termeni-si-conditii/:idUser',
        name: 'terms-and-conditions-administration',
        component: TermsConditionsAdministration
    },
    {
        path: '/autentificare',
        name: 'login',
        component: Login
    },
    {
        path: '/inregistrare',
        name: 'register',
        component: Register
    },
    {
        path: '/servicii/:idCounty/:idServicesCategory/:idUser?',
        name: 'services',
        component: Services
    },
    {
        path: '/serviciu/:idService/:idUser?',
        name: 'service',
        component: ServiceDetails
    },
    {
        path: '/portofoliu/:idUser?',
        name: 'portofolio',
        component: Portofolio
    },
    {
        path: '/blog/:idUser?',
        name: 'blog',
        component: Blog
    },
    {
        path: '/blog/articol/:idBlogArticle/:idUser?',
        name: 'blog-article',
        component: BlogArticle
    },
    {
        path: '/despre-noi/:idUser?',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/politica-de-confidentialitate-a-datelor/:idUser?',
        name: 'dataPrivacyPolicy',
        component: DataPrivacyPolicy
    },
    {
        path: '/termeni-si-conditii/:idUser?',
        name: 'termsConditions',
        component: TermsConditions
    },
    {
        path: '/formular-contact/:idUser?',
        name: 'contact-form',
        component: ContactForm
    },
    {
        path: '/formular-eveniment/:idUser?',
        name: 'event-form',
        component: EventForm
    },
    {
        path: '/:idUser?',
        name: 'home',
        component: Home
    },
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router