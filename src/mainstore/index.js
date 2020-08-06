export const store = {
    state: {
      explorer: [],
      mainTabs: [],
      selectedTab: '',
      editorHeight: 400,
      textEditor: '',
      htmlEditor: ''
    },
    updateExplorer (newTree) {
        this.state.explorer = newTree
    },
    addToMainTabs (newTab) {
      newTab.index = this.state.mainTabs.length
      this.state.mainTabs.push(newTab)
    },
    deleteFromMainTabs (tabName) {
      const index = this.state.mainTabs.findIndex(item => item.name === tabName)
      this.state.mainTabs.splice(index, 1)
    },
    Tab (name, label, template, data, location, dirty) {
      this.name = name
      this.label = label
      this.template = template
      this.data = data
      this.location = location
      this.dirty = dirty
    }
  }