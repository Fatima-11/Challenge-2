import auth from './auth'
import moment from 'moment'

const state ={
    foodLogs: [],
    quantityTotal:0,
    minValue: null,
    maxValue: null
}

const mutations ={
    loadFoodLogs(state, payload) {
        state.foodLogs = payload
        },
  
    
  
      quantityTotal(state, payload){
        state.quantityTotal = payload
      },
  
      minValue(state, payload){
        state.minValue = payload
      },
  
      maxValue(state, payload){
        state.maxValue = payload
      }
}
const actions = {
    locationFoodLogs({commit, dispatch}, payload){
        return new Promise((resolve)=>{
          setTimeout(()=>{
            auth.instance.get('/foodLogs/getLocationFoodLogs',{
              params: {
                locationId: auth.state.locationId,
                startDate: payload.startDate,
                endDate: payload.endDate
              }
            })
            .then(res=>  {
              if (res.data) {
                commit('loadFoodLogs', res.data)
              
               
                dispatch ('calculateTotal')
                dispatch ('calculateMinValue')
                dispatch ('calculateMaxValue')
                resolve()
              } else {
                console.log('No data available')
                commit('loadFoodLogs', [])
                commit('minValue', null)
                commit('maxValue', null)
                commit('quantityTotal',0)
              
              }
              
            })
            .catch(err => console.log(err.message))
          }, 100)
          
        })
  
      },
    
      addingFoodLog({dispatch},payload){
        auth.instance.post('/foodLogs/addFoodLog',{
           
          itemName: payload.itemName,
          itemType: payload.itemType,
          locationId: auth.state.locationId,
          loggedTime: payload.loggedTime ,
          dateProduced: payload.dateProduced ,
          meal: payload.meal,
          actionTaken: payload.actionTaken,
          actionReason: payload.actionReason,
          quantity:payload.quantity,
          unit: payload.unit,
          station: payload.station,
          employeeName: payload.employeeName
        })
         .then(res=> {
         console.log(res)
         dispatch ('calculateTotal')
         dispatch ('calculateMinValue')
         dispatch ('calculateMaxValue')
        })
        .catch(err => 
         console.log(err.message))
      },
  
      updateFoodLog({dispatch}, payload){
        auth.instance.put('/foodLogs/updateFoodLog',{
          foodLog:{
           id: payload.id,
           itemName: payload.itemName,
           itemType: payload.itemType,
           meal: payload.meal,
           loggedTime: payload.loggedTime,
           dateProduced: payload.dateProduced,
           unit:payload.unit,
           actionReason: payload.actionReason,
           actionTaken: payload.actionTaken,
           station: payload.station,
           employeeName: payload.employeeName,
           locationId:payload.locationId,
           quantity: payload.quantity
          }
                 
        })
        .then(res=>{
         console.log(res)
         dispatch ('calculateTotal')
         dispatch ('calculateMinValue')
         dispatch ('calculateMaxValue')})
                  
         .catch(err =>{
           if (err.response.status == 409){
             console.log("No change was made")
           } else {
             console.log(err.message)
           }
         }
           )
      },
      deleteFoodLog({dispatch}, payload){
        auth.instance.delete('/foodLogs/deleteFoodLog',{
          params:{
           id: payload.id
          }
          
        }).then(res=>{
          dispatch ('calculateTotal')
                  dispatch ('calculateMinValue')
                  dispatch ('calculateMaxValue')
         console.log(res)
         } )
         
         .catch(err => 
           console.log(err.message))
      },
      
  
      calculateTotal({state, commit}){
        //console.log('food inside total', state.foodLogs)
        if (!state.foodLogs.length){
          commit('quantityTotal', 0)
        } else {
        let total =0
       
        for (let index = 0; index < state.foodLogs.length; index++){
  
          total = total + state.foodLogs[index].quantity
        }
        commit('quantityTotal',total)
      }
      },
  
      calculateMinValue({state, commit}) {
        if (!state.foodLogs.length) { // check if it is empty
          
          commit('minValue', null)
        } else {
        let min = state.foodLogs[0].quantity
        
        for (let index = 0; index < state.foodLogs.length; index++){
         
          if (state.foodLogs[index].quantity <= min) {
           
            commit('minValue', state.foodLogs[index].quantity)
            min = state.foodLogs[index].quantity
          } 
          
        }}
        
      },
  
      calculateMaxValue({state, commit}) {
        if (!state.foodLogs.length){
          commit('maxValue', null)
        } else {
        
        let max = state.foodLogs[0].quantity
        
        for (let index = 0; index < state.foodLogs.length; index++){
          if (state.foodLogs[index].quantity >= max) {
            commit('maxValue', state.foodLogs[index].quantity)
            max = state.foodLogs[index].quantity
          }
        }
      }
      },
  
  
      
       searchByField({state,commit, dispatch}, payload){
         console.log('minval', state.minValue)
         console.log('maxval', state.maxValue)
          const filteredData = []
          
          if (payload.value){
         dispatch ('locationFoodLogs',({startDate: payload.startDate, endDate: payload.endDate}))
           .then(()=>{
            const allData = state.foodLogs
  
            for (let index=0 ; index< allData.length; index++){
                    if (allData[index].itemName == payload.value) {
                      filteredData.push(allData[index])
                     } }
  
                  
                  commit('loadFoodLogs', filteredData)
                  dispatch ('calculateTotal')
                  dispatch ('calculateMinValue')
                  dispatch ('calculateMaxValue')
           })
  
            
                  
                }else{ // no search entered
                  
                  commit('loadFoodLogs', [])
                  commit('quantityTotal',0)
                  commit ('minValue', null)
                  commit ('maxValue', null)
                }
              }

}

const getters = {
    foodLogs (state) { // modifying the format of loggedtime to be displayed in the table in the format below
        for (let i=0 ; i< state.foodLogs.length; i++){
          state.foodLogs[i].loggedTime = moment(state.foodLogs[i].loggedTime ).format('YYYY-MM-DD HH:mm')
        }
        return state.foodLogs
        
      },
  
      quantityTotal(state){
        return state.quantityTotal
      },
  
      minValue(state){
        return state.minValue
      },
  
      maxValue(state){
        return state.maxValue
      }
}

export default {
    state, 
    mutations,
    actions,
    getters
}