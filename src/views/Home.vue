<template>
<v-container fluid >
  <v-container>
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="name" label="Menu Item Name"  type="text" v-validate.disable="'required|min:1|max:100'"   v-model="name" ></v-text-field>
          <span v-show="errors.has('name')" class="red--text">{{errors.first('name')}}</span>
      </v-flex>
      
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="clientId" label="Client Id"  type="text" v-validate.disable="'min:1|max:100'" v-model="clientId" ></v-text-field>
          <span v-show="errors.has('clientId')" class="red--text">{{errors.first('clientId')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="meal" label="Meal"  type="text" v-validate.disable="'required|min:1|max:50|alpha_spaces'" v-model="meal" ></v-text-field>
          <span v-show="errors.has('meal')" class="red--text">{{errors.first('meal')}}</span>
      </v-flex>
      
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
        <v-menu
        full-width>
          <v-text-field
          name="Date"
            slot="activator"
            :value="date"
            label="Date"
            readonly
            v-validate.disable="'required|date_format:YYYY-MM-DD'"
            ></v-text-field>
          <v-date-picker v-model="date" ></v-date-picker>
        </v-menu>
         <span v-show="errors.has('Date')" class="red--text">{{errors.first('Date')}}</span>
         
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="portionQuantity" label="Portion Quantity"  type="text" v-validate.disable="'numeric'" v-model="portionQuantity" ></v-text-field>
          <span v-show="errors.has('portionQuantity')" class="red--text">{{errors.first('portionQuantity')}}</span>
      </v-flex>
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="portionUnit" label="Portion Unit"  type="text" v-validate.disable="'min:1|max:50'" v-model="portionUnit" ></v-text-field>
          <span v-show="errors.has('portionUnit')" class="red--text">{{errors.first('portionUnit')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="portionsProduced" label="Portions Produced"  type="text" v-validate.disable="'numeric'" v-model="portionsProduced" ></v-text-field>
          <span v-show="errors.has('portionsProduced')" class="red--text">{{errors.first('portionsProduced')}}</span>
      </v-flex>
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="portionCost" label="Portion Cost"  type="text" v-validate.disable="'numeric'" v-model="portionCost" ></v-text-field>
          <span v-show="errors.has('portionCost')" class="red--text">{{errors.first('portionCost')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="station" label="Station"  type="text" v-validate.disable="'min:1|max:100'" v-model="station" ></v-text-field>
          <span v-show="errors.has('station')" class="red--text">{{errors.first('station')}}</span>
      </v-flex>
    </v-layout>
  
  
    <v-layout row wrap align-center justify-center>
  <v-flex xs8 pa-4 mr-4>
    <div class="text-xs-center">
      <v-btn type="submit" large @click="newItemAddition">Add New Item</v-btn>
      <v-btn type="submit" large @click="deleteItem">Delete Item</v-btn>
      <v-btn type="submit" large @click="updateItem">Update Item</v-btn>
      
    </div>
  </v-flex>
</v-layout>
</v-container>



  <v-layout row>
  <v-flex xs12>
    <v-card>
    <v-card-title>
      <b>MENU ITEMS</b>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-title>
      <v-menu
      full-width
        >
          <v-text-field
          name="startDate"
            slot="activator"
            :value="startDate"
            label="Start Date"
            readonly
            ></v-text-field>
          <v-date-picker v-model="startDate" @input="LoadMenuItems"></v-date-picker>
        </v-menu>
         
         <v-spacer></v-spacer>
        <v-menu
        full-width
        >
          <v-text-field
          name="endDate"
            slot="activator"
            :value="endDate"
            label="End Date"
            readonly
            ></v-text-field>
          <v-date-picker v-model="endDate" @input="LoadMenuItems"></v-date-picker>
        </v-menu>
    </v-card-title>
        <p v-if="show" class="red--text">The Start Date must be before the End Date</p>
    <v-data-table 
      :headers="headers"
      :items="menuItems"
      :search="search"
      class="elevation-1"
      
    >
    <template slot="items" slot-scope="props">
      <td @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.name }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )" >{{ props.item.clientId }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.meal }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.date }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.portionQuantity }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.portionUnit }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.portionsProduced }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.portionCost }}</td>
      <td class="text-xs-center" @click="getMenuItemId(props.item.id, props.item.name, props.item.clientId, props.item.meal, props.item.date, props.item.portionQuantity, props.item.portionUnit, props.item.portionsProduced, props.item.portionCost, props.item.station )">{{ props.item.station }}</td>
    </template>
  </v-data-table>
    </v-card>
    </v-flex>







</v-layout>

</v-container>
</template>

<script>

export default {
  data () {
    return {
      menuItemId: null,
      
        name: null,
        clientId: null,
        meal: null,
        date: null,
        portionQuantity: null,
        portionUnit: null,
        portionsProduced: null,
        portionCost: null,
        station: null,
        search: null,

        startDate:'2019-01-01',
        endDate:'2019-05-05',
        show: false,
      

      headers: [
          {
            text: 'Menu Item', align: 'left', sortable: true, value: 'name'},
          { text: 'Client Id', align: 'center', value: 'clientId' },
          { text: 'Meal', align: 'center', value: 'meal' },
          { text: 'Date', align: 'center', value: 'date' },
          { text: 'Portion Quantity', align: 'center', value: 'portionQuantity' },
          { text: 'Portion Unit', align: 'center', value: 'portionUnit' },
          { text: 'Portions Produced', align: 'center', value: 'portionsProduced' },
          { text: 'Portion Cost', align: 'center', value: 'portionCost' },
          { text: 'Station', align: 'center', value: 'station' }
        ],
        
    }
  },
  computed: {
        
        // data for the table
        menuItems() {
          return this.$store.getters.menuItems
        }
    },
  methods: {
    
    clearFields() {
      this.name = null
        this.clientId = null
        this.meal = null
        this.date = null
        this.portionQuantity = null
        this.portionUnit = null
        this.portionsProduced = null
        this.portionCost = null
        this.station = null
    },

    LoadMenuItems(){
       if (this.startDate> this.endDate || this.endDate < this.startDate){
        this.show = true  // in order for the error message to show
       }else {
          this.show = false
      }
      this.$store.dispatch('locationMenuItems',{startDate: this.startDate, endDate: this.endDate})
      
    },
    getMenuItemId(id, name, clientId, meal, date, portionQuantity, portionUnit, portionsProduced, portionCost, station){
        this.menuItemId = id
        this.name = name
        this.clientId = clientId
        this.meal = meal
        this.date = date
        this.portionQuantity = portionQuantity
        this.portionUnit = portionUnit
        this.portionsProduced = portionsProduced
        this.portionCost = portionCost
        this.station = station
      
    },


    newItemAddition() {
      
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.$store.dispatch('AddingMenuItem',{name: this.name,clientId: this.clientId, meal: this.meal, date: this.date, portionQuantity: this.portionQuantity, portionUnit: this.portionUnit, portionsProduced: this.portionsProduced, portionCost: this.portionCost, station: this.station })
          .then(()=>{
            //this.LoadMenuItems()
            this.$store.dispatch('locationMenuItems',{startDate: this.startDate, endDate: this.endDate})
            this.clearFields()
          })
          
          
        }
      })
      
    },
   deleteItem(){
      this.$validator.validateAll().then(() =>{
        if (!this.errors.any()) {
      
           this.$store.dispatch('deleteMenuItem', {id: this.menuItemId})
           
              .then(()=>{
                
                //this.LoadMenuItems()
                this.$store.dispatch('locationMenuItems',{startDate: this.startDate, endDate: this.endDate})
                this.clearFields()
              })
            
            }
      }) 
     
    },

 updateItem(){

    this.$validator.validateAll().then(() =>{
        if (!this.errors.any()) {
            this.$store.dispatch('updateMenuItem',{id: this.menuItemId ,name: this.name,clientId: this.clientId, meal: this.meal, date: this.date, portionQuantity: this.portionQuantity, portionUnit: this.portionUnit, portionsProduced: this.portionsProduced, portionCost: this.portionCost, station: this.station })
          .then(()=>{
                //this.LoadMenuItems()
                this.$store.dispatch('locationMenuItems',{startDate: this.startDate, endDate: this.endDate})
                this.clearFields()
              })
            }
            }) 
    }
},
  created(){
    this.LoadMenuItems()
  }
  
}
</script>


<style scoped>
  span,p  {
    font-size: 11px;
  }
  .elevation-1 td {
    white-space: nowrap;
}
</style>


