import auth from './auth'

const state = {
    menuItems: []
}

const mutations ={
    LoadMenuItems(state, payload) {
        state.menuItems = payload
      }
}

const actions = {
    locationMenuItems({commit},payload) {
        return new Promise((resolve)=>{
          setTimeout(()=>{
            auth.instance.get('/menuItems/getLocationMenu',{
              params: {
                locationId: auth.state.locationId, // this value is stored in auth.js
                startDate: payload.startDate,
                endDate: payload.endDate
              }
            })
            .then(res=>  {
              if (res.data){
              
                commit('LoadMenuItems', res.data)
                resolve()
                
                
                }else{
                  console.log('No data available')
                  commit('LoadMenuItems', [])
                }
        
      
            })
                
            .catch(err => console.log(err.message))
          },100)
        })
        
      },

      AddingMenuItem(context,payload){
     
        auth.instance.post('/menuItems/addMenuItem',{
           locationId: auth.state.locationId,
           name: payload.name,
          clientId: payload.clientId,
          meal: payload.meal,
          date: payload.date,
          portionQuantity: payload.portionQuantity,
          portionUnit:payload.portionUnit,
          portionsProduced: payload.portionsProduced,
          portionCost: payload.portionCost,
          station: payload.station
        })
         .then(res=> {
         console.log(res)
        })
        .catch(err => 
         console.log(err.message))
      },
 
     deleteMenuItem(context, payload){
       
       auth.instance.delete('/menuItems/deleteMenuItem',{
          params:{
           id: payload.id
          }
          
        }).then(res=>
 
         console.log(res))
         .catch(err => 
           console.log(err.message))
      },
 
      updateMenuItem(context, payload){
        auth.instance.put('/menuItems/updateMenuItem',{
          menuItem:{
           id: payload.id,
           name: payload.name,
           clientId: payload.clientId,
           meal: payload.meal,
           date: payload.date,
           portionQuantity: payload.portionQuantity,
           portionUnit:payload.portionUnit,
           portionsProduced: payload.portionsProduced,
           portionCost: payload.portionCost,
           station: payload.station
          }
                 
        })
        .then(res=>
         console.log(res))
         .catch(err =>{
           if (err.response.status == 409){
             console.log("No change was made")
           } else {
             console.log(err.message)
           }
         }
           )
      }
 
  
}

const getters = {
    menuItems (state) {
        return state.menuItems
      }
}

export default {
    state,
    mutations,
    actions,
    getters

}