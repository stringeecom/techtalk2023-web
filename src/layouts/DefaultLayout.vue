<template>
  <div class="control-sidebar-slide-open sidebar-mini layout-navbar-fixed">
    <div class="wrapper">
      <!-- Navbar -->
      <!-- Left navbar links -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn nav-link btn-toggle-sidebar" @click="onOpenSidebar(true)">
              <i class="fas fa-bars"></i>
            </button>
          </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="fas fa-user-cog"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" style="left: inherit; right: 0px">
              <button class="btn dropdown-item"><i class="fas fa-hammer mr-2"></i> Setting</button>

              <div class="dropdown-divider"></div>

              <button @click="onLogout" class="btn dropdown-item">
                <i class="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
      <!-- /.navbar -->
      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary" :class="{ 'show-sidebar-mobile': showSidebarMobile }">
        <!-- Brand Logo -->
        <a href="#" class="brand-link">
          <img src="@src/assets/images/admin-logo-200x200.jpg" alt="administrator logo"
            class="brand-image img-circle elevation-3" style="opacity: 0.8" />
          <span class="brand-text font-weight-light">{{ titleApp }}</span>
        </a>
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <!-- Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library -->

              <li v-for="(router, index) in ROUTES_SIDEBAR" :key="index" class="nav-item">
                <router-link :to="router.path"
                  :class="{ 'nav-link': true, 'active': this.parentItemMenu === router?.meta.parent }"
                  @click="onOpenSidebar(false)">
                  <i :class="`nav-icon ${router.meta.icon}`"></i>
                  <p class="ml-1">{{ router.label }}</p>
                </router-link>
              </li>
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper" style="min-height: 100vh">
        <!-- Main content -->
        <section class="content p-2">
          <div class="container-fluid p-0">
            <router-view></router-view>
          </div>
          <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
        <div v-if="showSidebarMobile" class="backdrop" @click="onOpenSidebar(false)"></div>

      </div>
      <!-- /.content-wrapper -->
      <footer class="main-footer">
        <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block"><b>Version</b> 3.2.0</div>
      </footer>
    </div>

  </div>
</template>

<script>
import { ROUTES_SIDEBAR } from '@src/router/routes'

const titleApp = import.meta.env.VITE_TITLE_APP
export default {

  data() {
    return {
      titleApp,
      ROUTES_SIDEBAR,
      parentItemMenu: '',

      showSidebarMobile: false
    }
  },

  mounted() {
    this.handleActiveItem()
  },

  watch: {
    $route() {
      this.handleActiveItem()
    }
  },

  methods: {
    onLogout() {
      localStorage.removeItem('user')
      this.$router.push('/login')
    },

    handleActiveItem() {
      this.parentItemMenu = this.$route?.meta?.parent
    },

    onOpenSidebar(value) {
      this.showSidebarMobile = value
    }
  }
}
</script>

<style scoped>
.show-sidebar-mobile {
  margin-left: 0px !important;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: inherit;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 250px;
  animation: in 0.3s ease-in-out;
}

@keyframes in {
  from {
    opacity: 0;
    left: 0
  }

  to {
    opacity: 1;
    left: 250px
  }
}

.btn-toggle-sidebar {
  display: none;
}

@media screen and (max-width: 992px) {
  .btn-toggle-sidebar {
    display: block;
  }

  .main-sidebar {
    margin-left: -250px;
  }
}

.show {}
</style>
