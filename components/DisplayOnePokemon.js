app.component('display-one-pokemon', {
  props: {
    pokemon: {
      required: true
    },
    charact: {
      required: true
    },
    talent: {
      required: true
    },
    type: {
      required: true
    },
    stat: {
      required: true
    },
  },
  template:
    /*html*/
    `
    <div class="one-pokemon" @click.capture="backList">
      <!-- Id and name of the pokemon -->
      <div class="title-one">
        <h2>#{{ pokemon.id }} {{ pokemon.name }}</h2>
      </div>
      <div class="content-one">
        <!-- Height, weight, talents and type of the pokemon-->
        <div class="img-one"><img class="" :src="pokemon.img"></div>
        <div class="charact-one">
          <h3 class="dive-one">Height : <i>{{charact.height}}m</i></h3>
          <h3 class="dive-one">Weight : <i>{{charact.weight}}kg</i></h3>
          <div class="div-two">
            <h3>Talents : </h3>
            <ul class="div-three">
              <li v-for="oneTalent in talent"><h3><i>{{oneTalent}}</i></h3></li>
            </ul>
          </div>
          <div class="div-two">
            <h3>Type : </h3>
            <ul class="div-three">
              <li v-for="oneType in type"><h3><i>{{oneType}}</i></h3></li>
            </ul>
          </div>
        </div>
        <!-- Experience and statistics of the pokemon-->
        <div class="charact-one">
          <h3 class="dive-one">Base experience : <i>{{charact.base_experience}}xp</i></h3>
          <div class="div-two">
            <h3>Statistics : </h3>
            <ul class="div-three">
              <li v-for="oneStat in stat"><h3><i>{{formatting(oneStat)}}</i></h3></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    /* Back to the homepage */
    backList() {
      this.$emit('back-to-list')
    }, 
    /* Formatting pokemon statistics */
    formatting(stat) {
      return stat[0].toString() + ' ==> ' + stat[1].toString()
    }
  }
})