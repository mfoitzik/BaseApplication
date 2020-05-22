<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr fFf">
      <q-header>
        <q-bar class="q-electron-drag menu-bar" style="padding-left:0px;">
          <q-img src="../assets/logo2.png" style="height:32px; width:50px;margin-right:0px;" />
          <div class="q-electron-drag--exception cursor-pointer q-px-sm row items-center ba-menu-item">Test</div>
          <div class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item">
          <div>
          Filex
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Open...</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top right" self="top left">
                  <q-list dense>
                    <q-item
                      v-for="n in 3"
                      :key="n"
                      clickable
                    >
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right" />
                      </q-item-section>
                      <q-menu auto-close anchor="top right" self="top left">
                        <q-list dense>
                          <q-item
                            v-for="n in 3"
                            :key="n"
                            clickable
                          >
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        </div>
        <div class="q-electron-drag--exception cursor-pointer non-selectable q-px-sm row items-center ba-menu-item">Edit
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Cut</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Copy</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Paste</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Select All</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
          <q-space />
          <div>Base Application</div>
          <div>Mike</div>
          <q-space />
          <q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
          <q-btn dense flat :icon="minbut" @click="maximize" />
          <q-btn dense flat icon="mdi-window-close" @click="closeApp" />
        </q-bar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer class="bg-grey-8 text-white footerHeight">
      <q-toolbar class="status-bar" style="height:25px; min-height:25px;">
        <q-icon name="settings" />
        <q-space />
        <div style="padding-left:8px;padding-right:8px;">online</div>
        <q-icon name="settings" class="ba-footer-icon" />
        <q-icon name="publish" class="hidden ba-footer-icon" />
        <q-icon name="search" class="ba-footer-icon" />
      </q-toolbar>
    </q-footer>
    </q-layout>
  </div>
</template>
<script>
// We guard the Electron API calls, but this
// is only needed if we build same app with other
// Quasar Modes as well (SPA/PWA/Cordova/SSR...)

// The code below requires Node Integration being kept turned "on"
// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration

export default {
  data () {
    return {
      minbut: 'crop_square'
    }
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
          this.minbut = 'mdi-window-maximize'
        } else {
          win.maximize()
          this.minbut = 'mdi-window-restore'
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>
