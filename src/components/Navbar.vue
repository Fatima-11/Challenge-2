<template>
    <v-app>
        <v-navigation-drawer temporary fixed app v-model="sideNav" class="hidden-sm-and-up">
            <v-list>
                <v-list-tile :to="{name: 'Home'}" v-if="user">
                    <v-list-tile-action>
                        <v-icon>playlist_add</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Menu Items</v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'Tracker'}" v-if="user">
                    <v-list-tile-action>
                        <v-icon>track_changes</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Food Tracker</v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'Report'}" v-if="user">
                    <v-list-tile-action>
                        <v-icon>description</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Report</v-list-tile-content>
                </v-list-tile>

                
                <v-list-tile :to="{name: 'Login'}" v-if="!user">
                    <v-list-tile-action>
                        <v-icon>lock_open</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Login</v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user" @click="onlogout">
                    <v-list-tile-action>
                        <v-icon>input</v-icon>
                    </v-list-tile-action >
                    <v-list-tile-content >Log Out</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar dark class="blue-grey darken-1">
            <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
            <v-toolbar-title>Phood Challenge</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat :to="{name: 'Home'}" v-if="user">
                <v-icon left>playlist_add</v-icon>
                Menu Items</v-btn>

                <v-btn flat :to="{name: 'Tracker'}" v-if="user">
                <v-icon left>track_changes</v-icon>
                Food Tracker</v-btn>

                <v-btn flat :to="{name: 'Report'}" v-if="user">
                <v-icon left>description</v-icon>
                Report</v-btn>
            
                
            
                <v-btn flat :to="{name: 'Login'}" v-if="!user">
                <v-icon left>lock_open</v-icon>
                Login</v-btn>
                <v-btn flat  v-if="user" @click="onlogout">
                <v-icon left>input</v-icon>
                Log Out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <router-view></router-view>
        </main>
    </v-app>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      sideNav: false
    }  
  },
  methods: {
      onlogout() {
          this.$store.dispatch('userLogout')
        
      }
      
  },
  computed: {
      user () {
          return this.$store.getters.isauthenticated
      }
  }

}
</script>
