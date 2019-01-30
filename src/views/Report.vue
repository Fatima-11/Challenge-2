<template>
    <v-container fluid>
        <v-layout row>
  <v-flex xs12>
     <v-card>
    <v-card-title>
      <b>FOOD LOGS</b>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer> 
      
       <v-text-field
        v-model="search"
        append-icon="search"
        label="Search By Item Name"
        @keyup.enter="searchFoodLogs"
    
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
          <v-date-picker v-model="startDate" @input="searchFoodLogs"></v-date-picker>
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
          <v-date-picker v-model="endDate" @input="searchFoodLogs"></v-date-picker>
        </v-menu>
    </v-card-title>
        <p v-if="showDateError" class="red--text">The Start Date must be before the End Date</p>


    <v-dialog v-model="dialog" max-width="900px">
        <v-card>
            <v-card-title>
              <span  class="headline blue--text">Edit Food Log</span>
            </v-card-title>
            <v-card-text>
                <v-container class="grid-list-md">
                    <v-layout row>
                        <v-flex>
                            <v-text-field name="itemName" label="Item Name"  type="text" v-validate.disable="'required|min:1|max:100'"   v-model="itemName" ></v-text-field>
                            <span v-show="errors.has('itemName')" class="red--text">{{errors.first('itemName')}}</span>
                        </v-flex>
                        <v-flex>
                            <v-text-field name="itemType" label="Item Type"  type="text" v-validate.disable="'required|min:1|max:20'"   v-model="itemType" ></v-text-field>
                            <span v-show="errors.has('itemType')" class="red--text">{{errors.first('itemType')}}</span>
                        </v-flex>
                        <v-flex>
                            <v-text-field name="locationId" label="Location Id"  type="text" v-validate.disable="'required|numeric'" v-model="locationId" ></v-text-field>
                            <span v-show="errors.has('locationId')" class="red--text">{{errors.first('locationId')}}</span>
                         </v-flex>

                    </v-layout>

                    <v-layout row>
                        <v-flex>
                            <v-text-field v-show="show" name="loggedTime" v-model="loggedTime" v-validate.disable="'required'"></v-text-field>        
        
                                    <v-datetime-picker 
                                    format="YYYY-MM-DD HH:mm" 
                                    
                                    label="Logged Time"
                                    v-model="loggedTime"
                                    ></v-datetime-picker>
                                    
                                    
                                    <p  v-show="errors.has('loggedTime')" class="red--text">{{errors.first('loggedTime')}}</p>
                        </v-flex>
                        <v-flex>
                            <v-dialog
                                ref="dialog"
                                persistent
                                lazy
                                full-width
                                width="290px">
                            <v-text-field
                            name="dateProduced"
                                slot="activator"
                                :value="dateProduced"
                                label="Date Produced"
                                readonly
                                v-validate.disable="'required|date_format:YYYY-MM-DD'"
                                ></v-text-field>
                            <v-date-picker v-model="dateProduced" 
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                                flat
                                color="primary"
                                @click="modal = false"
                            >
                                Clear
                            </v-btn>
                            <v-btn
                                flat
                                color="primary"
                                @click="$refs.dialog.save(dateProduced)"
                            >
                                OK
                            </v-btn></v-date-picker>
                            </v-dialog>

                            <span v-show="errors.has('dateProduced')" class="red--text">{{errors.first('dateProduced')}}</span>
                        </v-flex>
                        <v-flex>
                            <v-text-field name="meal" label="Meal"  type="text" v-validate.disable="'required|min:1|max:50|alpha_spaces'" v-model="meal" ></v-text-field>
                            <span v-show="errors.has('meal')" class="red--text">{{errors.first('meal')}}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex>
                             <v-text-field name="quantity" label="Quantity"  type="text" v-validate.disable="'required|numeric'" v-model="quantity" ></v-text-field>
                            <span v-show="errors.has('quantity')" class="red--text">{{errors.first('quantity')}}</span>
                        </v-flex>
                        <v-flex >
                            <v-text-field name="unit" label="Unit"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="unit" ></v-text-field>
                            <span v-show="errors.has('unit')" class="red--text">{{errors.first('unit')}}</span>
                         </v-flex>
                         <v-flex >
                            <v-text-field name="station" label="Station"  type="text" v-validate.disable="'min:1|max:100'" v-model="station" ></v-text-field>
                            <span v-show="errors.has('station')" class="red--text">{{errors.first('station')}}</span>
                        </v-flex>
                    </v-layout>

                    <v-layout class="row">
                        <v-flex >
                            <v-text-field name="actionTaken" label="Action Taken"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="actionTaken" ></v-text-field>
                            <span v-show="errors.has('actionTaken')" class="red--text">{{errors.first('actionTaken')}}</span>
                        </v-flex>
                        <v-flex>
                            <v-text-field name="actionReason" label="Action Reason"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="actionReason" ></v-text-field>
                            <span v-show="errors.has('actionReason')" class="red--text">{{errors.first('actionReason')}}</span>
                        </v-flex>
                        <v-flex >
                            <v-text-field name="employeeName" label="Employee Name"  type="text" v-validate.disable="'min:1|max:100'" v-model="employeeName" ></v-text-field>
                            <span v-show="errors.has('employeeName')" class="red--text">{{errors.first('employeeName')}}</span>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="editLog">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="foodLogs"
      :search="search"
      class="elevation-1"
    >
    
    <template slot="items" slot-scope="props">
      <td >{{ props.item.itemName }}</td>
      <td class="text-xs-left" >{{ props.item.itemType }}</td>
      <td class="text-xs-left pa-0"  >{{ props.item.locationId }}</td> 
      <td class="text-xs-left" >{{ props.item.loggedTime }}</td>
      <td class="text-xs-left pa-0" >{{ props.item.dateProduced }}</td>
      <td class="text-xs-left" >{{ props.item.meal }}</td>
      <td class="text-xs-left pa-0" >{{ props.item.actionTaken }}</td>
      <td class="text-xs-left pa-0" >{{ props.item.actionReason }}</td>
      <td class="text-xs-left pa-0" >{{ props.item.quantity }}</td>
      <td class="text-xs-left" >{{ props.item.unit }}</td>
      <td class="text-xs-left" >{{ props.item.station }}</td>
      <td class="text-xs-left pa-0" >{{ props.item.employeeName }}</td>
      <td class="justify-left layout px-0" @click="getFoodLogId(props.item.id, props.item.itemName, props.item.itemType, props.item.locationId, props.item.loggedTime, props.item.dateProduced, props.item.meal, props.item.actionTaken, props.item.actionReason, props.item.quantity, props.item.unit, props.item.station, props.item.employeeName )">
           
            <v-icon
              small
              class="mr-2 "
              @click="dialog=true"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteLog(props.item.id)"
            >
              delete
            </v-icon>
          </td>
    </template>

    <template slot="footer">
        <td :colspan="headers.length"> 
            <v-flex pa-2>
                <strong>Quantity Total:  {{quantityTotal}}</strong>
            </v-flex>
            <v-flex pa-2>
                <strong>Min Value:  {{minValue}}</strong>
            </v-flex>
            <v-flex pa-2>
                <strong>Max Value:  {{maxValue}}</strong>
            </v-flex>
          
          
          
          
          
        </td>
      </template>
  </v-data-table>
        
    </v-card> 
    </v-flex>
</v-layout>


    </v-container>
</template>

<script>

export default {
    data(){
        return {
            foodLogId:null,
            itemName : null,
            itemType : null,
            meal : null,
            locationId : null,
            loggedTime : null,
            dateProduced : null,
            actionTaken : null,
            actionReason : null,
            station : null,
            employeeName : null,
            quantity: null,
            unit : null,

            search: null,
            dialog: false,
            show: false, // to validate the loggedtime since datetimepicker does not support veevalidate

            startDate:'2019-01-01',
            endDate:'2019-05-05',
            showDateError: false,

            headers: [
          {
            text: 'Item Name', align: 'left', sortable: true, value: 'itemName'},
          { text: 'Item Type', align: 'left', value: 'itemType' },
          { text: 'Location', align: 'left', value: 'locationId', class: 'pa-0'},
          { text: 'Logged Time', align: 'left', value: 'loggedTime' },
          { text: 'Date Produced', align: 'left', value: 'dateProduced', class:'pa-0' },
          { text: 'Meal', align: 'left', value: 'meal' },
          { text: 'Action Taken', align: 'left', value: 'actionTaken', class:'pa-0' },
          { text: 'Action Reason', align: 'left', value: 'actionReason', class:'pa-0' },
          { text: 'Quantity', align: 'left', value: 'quantity', class:'pa-0' },
          { text: 'Unit', align: 'left', value: 'unit' },
          { text: 'Station', align: 'left', value: 'station' },
          { text: 'Employee Name', align: 'left', value: 'employeeName', class:'pl-0' },
          { text: 'Actions', align: 'left', value: 'actions', class:'pa-0' }
        ],
        }
    },
    computed: {
            foodLogs() {
                return this.$store.getters.foodLogs
            },

            quantityTotal(){
                return this.$store.getters.quantityTotal
            },

           minValue(){
                return this.$store.getters.minValue
            },

            maxValue(){
                return this.$store.getters.maxValue
            }
            
        },
    methods: {
        loadFoodLogs(){
            if (this.startDate> this.endDate || this.endDate < this.startDate){
                this.showDateError = true  // in order for the error message to show
       }else {
                this.showDateError = false
      }
        this.$store.dispatch('locationFoodLogs',{startDate: this.startDate, endDate: this.endDate}) //this need to be done first
        // .then(()=>{
            
        //     this.$store.dispatch ('calculateTotal')
        //     this.$store.dispatch ('calculateMinValue')
        //     this.$store.dispatch ('calculateMaxValue')
        // })
        
        },
       
        editLog(){
            
            
            this.$validator.validateAll().then(() => {
                if (!this.errors.any()) {
                    this.$store.dispatch('updateFoodLog',{id: this.foodLogId ,itemName: this.itemName,
                                                            itemType: this.itemType, locationId: this.locationId,   
                                                            loggedTime:this.loggedTime, dateProduced:this.dateProduced, 
                                                            meal: this.meal, actionTaken: this.actionTaken, 
                                                            actionReason: this.actionReason, unit: this.unit, 
                                                            quantity: this.quantity, employeeName: this.employeeName, 
                                                            station: this.station })
                .then(()=>{
                    this.$store.dispatch('locationFoodLogs',{startDate: this.startDate, endDate: this.endDate})
                     this.dialog = false
            })
            }
      })
        },
        deleteLog(id){
            
            
            // delete data
            let deleteConfirmation = confirm("Are you sure you want to delete this food item?")
            if (deleteConfirmation) {
                    this.$store.dispatch('deleteFoodLog', {id: id})
                    .then(()=>{
                        this.loadFoodLogs()
                    })
            }
            
        },
        close(){
            this.dialog = false
        },
        save(){
            //save the new data 
        },
        getFoodLogId(id,itemName, itemType, locationId, loggedTime, dateProduced, meal, actionTaken, actionReason, quantity, unit, station, employeeName){
        
        this.foodLogId = id
        this.itemName = itemName
        this.itemType = itemType
        this.meal = meal
        this.locationId = locationId
        this.loggedTime = loggedTime
        this.dateProduced = dateProduced
        this.actionTaken = actionTaken
        this.actionReason = actionReason
        this.station = station
        this.employeeName = employeeName
        this.quantity = quantity
        this.unit = unit
        
        },
   async     searchFoodLogs(){
            if(this.search){
        await    this.$store.dispatch('searchByField',{value: this.search, startDate:this.startDate, endDate:this.endDate})
        } else{
            this.loadFoodLogs()
        }
        }
        
    },
     created(){
    this.loadFoodLogs()
       
  }
}
</script>

<style scoped>
.elevation-1 td {
    white-space: nowrap;
}
span,p  {
    font-size: 11px;
  }
</style>

