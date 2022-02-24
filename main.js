const app = Vue.createApp({
    data() {
      return {
        url: 'https://pokeapi.co/api/v2/pokemon?limit=350',
        listPokemon: [],
        pokemonSelected: [],
        listCharacteristicsPokemon: [], 
        characteristicsPokemon: {},
        stat: [],
        talent: [],
        type: [],
        error: false,
        notSelected: true
      }
    },
    /* Retrieves pokemon data */
    created: function() {
      axios.get(this.url).then(response => (this.listPokemon = response.data.results))
    },
    /* Complete the pokemon data */
    mounted: function() {
      document.onreadystatechange = () => {
        if (document.readyState == "complete") {
          this.completePokeData()
        }}
    },
    methods: {
        /* Gets the different characteristics and abilities of pokemon */
        fetchPokeAbilities(id) {
          axios.get('https://pokeapi.co/api/v2/pokemon/'+ id.toString()).then(response => (this.listCharacteristicsPokemon.push(response.data)))
        },
        /* Complete the basic data of a pokemon */
        completePokeData() {
          for (let i=1; i<=350;i++) {
            this.listPokemon[i-1].id=i
            this.listPokemon[i-1].img=this.imageUrl(i)
            namePokemon = this.listPokemon[i-1].name /* Pokemon name without capitalization */
            firstLetter = namePokemon[0].toUpperCase() /* Selection of the first letter of the name in upper case */
            namePokemon = firstLetter + namePokemon.slice(1) /* Creating the name with a first letter in upper case */
            this.listPokemon[i-1].name = namePokemon
            this.fetchPokeAbilities(i)
          }
        },
        /* Select a pokemon */
        selectPokemon(ele) {
          id = ele.id
          this.notSelected = false
          this.error = false
          this.pokemonSelected = this.listPokemon[id-1]
          this.characteristics(id-1)
        },
        /* Back to homepage */
        back() {
          this.notSelected = true
          this.pokemonSelected = []
          this.error = false
          this.characteristicsPokemon = []
          this.talent = []
          this.stat = []
          this.type = []
        },
        /* Takes the characteristics of the selected pokemon */
        characteristics(id) {
          /* Talent management */
          talentArray = this.listCharacteristicsPokemon[id].abilities
          talent = []
          for (pokemonSelected of talentArray) {
            talent.push(pokemonSelected.ability.name)
          }
          this.characteristicsPokemon.abilities = talent
          this.talent = talent
          /* Statistics management */
          statArray = this.listCharacteristicsPokemon[id].stats
          stat = []
          for (pokemonSelected of statArray) {
            init = []
            namz = pokemonSelected.stat.name
            pm = pokemonSelected.base_stat
            init.push(namz)
            init.push(pm)
            stat.push(init)
          }
          this.characteristicsPokemon.stats = stat
          this.stat = stat
          /* Type management */
          typeArray = this.listCharacteristicsPokemon[id].types
          type = []
          for (pokemonSelected of typeArray) {
            type.push(pokemonSelected.type.name)
          }
          this.characteristicsPokemon.types = type
          this.type = type
          /* Other */
          this.characteristicsPokemon.base_experience = this.listCharacteristicsPokemon[id].base_experience
          this.characteristicsPokemon.height = (this.listCharacteristicsPokemon[id].height)/10
          this.characteristicsPokemon.weight = (this.listCharacteristicsPokemon[id].weight)/10
        },
        /* Search for a pokemon matching a search */
        searchPokemon(ele) {
          notFind = true
          i = 0
          if ((ele.search.toUpperCase().length) >4) {
            search = (ele.search.toUpperCase())
          }
          else {
            search ="&*%" /* to avoid search matches if it is too short (only used when searching with a part of the name) */
          }
          while (notFind && (i<(this.listPokemon.length))) {
            nameToFind = this.listPokemon[i].name.toUpperCase()
            if ((ele.search.toUpperCase() == nameToFind) || (ele.search == this.listPokemon[i].id.toString()) || ((nameToFind).indexOf(search) != -1)) {
              this.pokemonSelected = this.listPokemon[i]
              notFind = false
              this.characteristics((this.pokemonSelected.id)-1)
            }
            i++
          }
          this.error = false
          if (notFind == true) {
            this.error = true /* To show that there is no match */
          }
          else {
            this.notSelected = false
          }
        }, 
        /* Returns the url of a pokemon image */
        imageUrl(id) {
          return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + id + '.svg'
        }
    }, 
  })