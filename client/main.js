loadUniversalJSXLibraries();
// console.log(`Loading for ${appName}`);
loadJSX(`${appName}.jsx`);
console.log(appUI);


window.Event = new class {
  constructor() {
    this.vue = new Vue()
  }
  fire(event, data = null) {
    this.vue.$emit(event, data);
  }
  listen(event, callback) {
    this.vue.$on(event, callback);
  }
}

Vue.component('adobe-toolbar', {
  template : `
  <div class="adobe-toolbar">
    <slot></slot>
  </div>
  `,
})

Vue.component('adobe-toolbar-divider', {
  template : `
    <div class="adobe-toolbar-divider"></div>
  `,
})

var appList = [];

Vue.component('mighty-toolbar', {
  template : `
  <div class="wrapper">
    <div v-for="item in list" class="mighty-btn" v-if="item.isActive">
      <img class="ico" :src="'../icons/' + item.name + '.png'"></div>
    </div>
  </div>
  `,
  // created() {
  //   this.$on('newList', function(e) {
  //      // this.resetList()
  //      console.log('Alternate heard');
  //    });
  // },
  // <div class="selector" :class="{ 'selectorActive' : tab.isActive }"></div>
  //
  // <div v-for="Ext in list" class="mighty-btn">
  // <span v-for="item in list"> {{ list }} </span>
  // </div>
  // <img class="ico" :src="'../icons/' + Ext + '.png'"></div>
  // <mighty-btn v-for="Ext in list" app="mightyFiles"></mighty-btn>
  data() {
    return {
      list: [
        {
          name: 'mightyLayers',
          key: 0,
          isActive : false,
        },
        {
          name : 'mightyFiles',
          key: 1,
          isActive : false,
        },
        {
          name : 'Playwrite',
          key: 2,
          isActive : false,
        },
        {
          name : 'eventManager',
          key: 3,
          isActive : false,
        },
        {
          name : 'iconManager',
          key: 4,
          isActive : false,
        },
        {
          name : 'mightySVG',
          key: 5,
          isActive : false,
        },
        {
          name : 'Smart-Align',
          key: 6,
          isActive : false,
        },
        {
          name : 'mightyFileTree',
          key: 7,
          isActive : false,
        },
        {
          name : 'axo',
          key: 8,
          isActive : false,
        },
        {
          name : 'colorHistory',
          key: 9,
          isActive : false,
        },
      ],
    }
  },
  created() {
    var self = this;
    // var mirr = this.list;
    Event.listen('newEvent', function(e){
      self.list.forEach(function(v,i,a){
        if (v.name == e)
          v.isActive = true;
      })
      // console.log(this.list);
    }),
    Event.listen('resetList', function(e){
      self.resetList();
    })
    // this.list = this.$children
    // console.log(this.$children);
  },
  methods : {
    resetList : function() {
      this.list.forEach(function(v,i,a){
        v.isActive = false;
      })
    },
    showList : function() {
      console.log(this.list);
    }
  },

})

Vue.component('mighty-btn', {
  props: ['app'],
  template: `
  <div class="mighty-btn">
    <img class="ico" :src="'../icons/' + app + '.png'"></div>
  </div>
  `,
})

var app = new Vue({
  el: '#app',
  data: {
    list : appList
  },
  mounted: function() {
    this.sendRollCall()
  },
  methods: {
    sendRollCall : function() {
      appList = [];
      Event.fire('resetList');
      dispatchEvent('mighty.rollcall');
      // this.$emit('newList')
    },
    addToList : function(e) {
      Event.fire('newEvent', e);
      // this.list.push(e)
    },
    reset : function() {
      console.log('Reset');
      Event.fire('newList', 'hello there')
    }
  },
});
