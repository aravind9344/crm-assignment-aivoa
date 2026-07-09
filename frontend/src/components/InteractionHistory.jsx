import {useEffect,useState} from "react";
import api from "../services/api";


function InteractionHistory({refresh}){


const [items,setItems]=useState([]);



const load=async()=>{

try{

const res=await api.get("/interactions/");

setItems(res.data.reverse());

}

catch(err){

console.log(err);

}

};



useEffect(()=>{

load();

},[refresh]);




return(

<div className="bg-white rounded-2xl shadow-lg border p-6">


<h2 className="text-xl font-bold mb-5">
📚 Recent Interactions
</h2>



{
items.map(item=>(


<div

key={item.id}

className="border rounded-xl p-5 mb-4 hover:bg-blue-50"

>


<h3 className="text-lg font-bold text-blue-900">

👨‍⚕️ {item.hcp_name || "Unknown Doctor"}

</h3>


<p>
🏥 {item.hospital || "Hospital not mentioned"}
</p>


<p className="mt-2">

<b>Interaction:</b> {item.interaction_type}

</p>


<p>

<b>Notes:</b> {item.notes}

</p>


<p className="text-green-700">

<b>Follow Up:</b> {item.follow_up || "No follow up"}

</p>


</div>


))

}



</div>

);

}


export default InteractionHistory;