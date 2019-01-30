<template>
<v-container fluid >
  
  <v-container>
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="itemName" label="Item Name"  type="text" v-validate.disable="'required|min:1|max:100'"   v-model="itemName" ></v-text-field>
          <span v-show="errors.has('itemName')" class="red--text">{{errors.first('itemName')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="itemType" label="Item Type"  type="text" v-validate.disable="'required|min:1|max:20'"   v-model="itemType" ></v-text-field>
          <span v-show="errors.has('itemType')" class="red--text">{{errors.first('itemType')}}</span>
      </v-flex>
      
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="locationId" label="Location Id"  type="text" v-validate.disable="'required|numeric'" v-model="locationId" ></v-text-field>
          <span v-show="errors.has('locationId')" class="red--text">{{errors.first('locationId')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="meal" label="Meal"  type="text" v-validate.disable="'required|min:1|max:50|alpha_spaces'" v-model="meal" ></v-text-field>
          <span v-show="errors.has('meal')" class="red--text">{{errors.first('meal')}}</span>
      </v-flex>
      
    </v-layout>
  

  
    <v-layout row wrap align-center justify-center>
        <v-flex xs4 pa-2 mr-2>
          
          
            <v-text-field v-show="show" name="loggedTime" v-model="loggedTime" v-validate.disable="'required'"></v-text-field>        
        
          <v-datetime-picker 
          format="YYYY-MM-DD HH:mm" 
          
          label="Logged Time"
          v-model="loggedTime"
          ></v-datetime-picker>
        
        
        <p  v-show="errors.has('loggedTime')" class="red--text">{{errors.first('loggedTime')}}</p>
        </v-flex>

      <v-flex xs4 pa-2 mr-2>
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
    </v-layout>
  
 
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="actionTaken" label="Action Taken"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="actionTaken" ></v-text-field>
          <span v-show="errors.has('actionTaken')" class="red--text">{{errors.first('actionTaken')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="actionReason" label="Action Reason"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="actionReason" ></v-text-field>
          <span v-show="errors.has('actionReason')" class="red--text">{{errors.first('actionReason')}}</span>
      </v-flex>
    </v-layout>
   
    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="unit" label="Unit"  type="text" v-validate.disable="'required|min:1|max:50'" v-model="unit" ></v-text-field>
          <span v-show="errors.has('unit')" class="red--text">{{errors.first('unit')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="station" label="Station"  type="text" v-validate.disable="'min:1|max:100'" v-model="station" ></v-text-field>
          <span v-show="errors.has('station')" class="red--text">{{errors.first('station')}}</span>
      </v-flex>
    </v-layout>

    <v-layout row wrap align-center justify-center>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="quantity" label="Quantity"  type="text" v-validate.disable="'required|numeric'" v-model="quantity" ></v-text-field>
          <span v-show="errors.has('quantity')" class="red--text">{{errors.first('quantity')}}</span>
      </v-flex>
      <v-flex xs4 pa-2 mr-2>
          <v-text-field name="employeeName" label="Employee Name"  type="text" v-validate.disable="'min:1|max:100'" v-model="employeeName" ></v-text-field>
          <span v-show="errors.has('employeeName')" class="red--text">{{errors.first('employeeName')}}</span>
      </v-flex>
    </v-layout>
  
  
    <v-layout row wrap align-center justify-center>
  <v-flex xs8 pa-4 mr-4>
    <div class="text-xs-center">
      <v-btn type="submit" large @click="FoodLogAddition">Add Food Log</v-btn>
      
      
    </div>
  </v-flex>
</v-layout>
</v-container>



  
</v-container>
</template>

<script>

export default {
  data(){
    return {
      itemName: null,
      itemType: null,
      locationId: null,
      loggedTime: null,
      dateProduced: null,
      meal: null,
      actionTaken: null,
      actionReason: null,
      quantity: null,
      unit: null,
      station: null,
      employeeName: null,
      show: false // to fix the validation of the logged time since v-datetime-picker does not support validation
    }
    

  },
  methods: {
    clearFields() {
      this.itemName = null,
      this.itemType =  null,
      this.locationId = null,
      this.loggedTime = null,
      this.dateProduced =  null,
      this.meal = null,
      this.actionTaken = null,
      this.actionReason = null,
      this.quantity = null,
      this.unit = null,
      this.station = null,
      this.employeeName = null
    },
    FoodLogAddition() {
     
      
      this.$validator.validateAll().then(() => {
    
        if (!this.errors.any()) {
           
           this.$store.dispatch('addingFoodLog',{
                itemName: this.itemName,
                itemType: this.itemType, 
                locationId: this.locationId, 
                loggedTime:this.loggedTime,
                //loggedTime:moment(this.loggedTime).format('YYYY-MM-DD HH:mm'), 
                dateProduced: this.dateProduced, 
                meal: this.meal, 
                actionTaken: this.actionTaken, 
                actionReason: this.actionReason, 
                quantity: this.quantity,
                unit: this.unit,
                station: this.station,
                employeeName: this.employeeName }
                )

          this.clearFields()
          
        }
      })
    }
  }
}

</script>
