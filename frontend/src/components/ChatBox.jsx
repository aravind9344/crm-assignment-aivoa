import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Sparkles, Bot, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCRMData, updateField } from "../redux/crmSlice";
import api from "../services/api";


function ChatBox({ resetChat }) {

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! Tell me about today's doctor interaction."
    }
  ]);


  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);



  useEffect(() => {
  setMessage("");

  setMessages([
    {
      sender: "ai",
      text: "👋 Hello! Tell me about today's doctor interaction.",
    },
  ]);
}, [resetChat]);




  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }


    const recognition = new SpeechRecognition();


    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;


    recognitionRef.current = recognition;



    recognition.onstart = () => {
      setListening(true);
    };



    recognition.onresult = (event) => {

      let transcript = "";

      for(let i=0;i<event.results.length;i++){

        transcript += event.results[i][0].transcript + " ";

      }


      setMessage(transcript);

    };



    recognition.onerror = () => {

      setListening(false);

    };



    recognition.onend = () => {

      setListening(false);

    };


    recognition.start();

  };




  const stopListening = () => {

    recognitionRef.current?.stop();

  };




  const sendMessage = async () => {


    if(!message.trim()) return;



    const userText = message;



    // show user message

    setMessages(prev => [

      ...prev,

      {
        sender:"user",
        text:userText
      }

    ]);



    setMessage("");



    try{


      setLoading(true);



      const res = await api.post("/chat/",{

        message:userText

      });



      console.log(res.data);



      // EXTRACT MODE

      if(res.data.mode === "extract"){


        dispatch(
  setCRMData({
    hcp_name: res.data.hcp_name || "",
    hospital: res.data.hospital || "",
    specialty: res.data.specialty || "",
    interaction_type: res.data.interaction_type || "",
    notes: res.data.notes || "",
    follow_up: res.data.follow_up || "",
  })
);


        setMessages(prev => [

          ...prev,

          {

            sender:"ai",

            text:
            `✅ CRM Updated Successfully.\n\nDoctor: ${res.data.hcp_name || "-"}\nHospital: ${res.data.hospital || "-"}\nSpecialty: ${res.data.specialty || "-"}`

          }

        ]);

      }



      // UPDATE MODE

      else if(res.data.mode === "update"){


        dispatch(
  updateField({
    field: res.data.field,
    value: res.data.value,
  })
);


        setMessages(prev => [

          ...prev,

          {

            sender:"ai",

            text:
            `✅ ${res.data.field.replace("_"," ")} updated.\n\nNew value: ${res.data.value}`

          }

        ]);

      }



      else {


        setMessages(prev => [

          ...prev,

          {

            sender:"ai",

            text:"I could not understand. Please try again."

          }

        ]);

      }



    }

    catch(err){


      console.error(err);



      setMessages(prev => [

        ...prev,

        {

          sender:"ai",

          text:"❌ Backend connection failed."

        }

      ]);

    }



    finally{

      setLoading(false);

    }


  };





  return (

    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 flex flex-col h-[700px]">


      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-5 rounded-t-3xl">


        <h2 className="text-xl font-bold flex items-center gap-2">

          <Bot/>

          AI Medical Assistant

        </h2>


        <p className="text-sm opacity-90">

          Powered by LangGraph + Groq

        </p>


      </div>




      {/* Messages */}


      <div className="flex-1 overflow-y-auto p-5 space-y-4">


        {
          messages.map((msg,index)=>(


            <div

              key={index}

              className={`flex ${
                msg.sender==="user"
                ? "justify-end"
                :"justify-start"
              }`}

            >


              <div

                className={`max-w-[80%] whitespace-pre-line p-4 rounded-2xl ${
                  
                  msg.sender==="user"

                  ?

                  "bg-blue-600 text-white rounded-br-none"

                  :

                  "bg-gray-100 text-gray-800 rounded-bl-none"

                }`}

              >


                <div className="flex gap-2 items-center mb-2">


                  {
                    msg.sender==="user"

                    ?

                    <User size={16}/>

                    :

                    <Bot size={16}/>

                  }


                  <b>

                  {
                    msg.sender==="user"
                    ?"You"
                    :"AI"
                  }

                  </b>


                </div>


                {msg.text}


              </div>



            </div>


          ))

        }


        <div ref={chatEndRef}/>


      </div>





      {/* Input */}


      <div className="border-t p-4">


        <textarea

          rows="3"

          value={message}

          onChange={(e)=>setMessage(e.target.value)}

          placeholder="Type interaction or say 'Change doctor name to Dr Ravi'..."

          className="w-full border rounded-xl p-3"

        />



        <div className="flex justify-end gap-3 mt-3">


        {

          !listening

          ?

          <button

          onClick={startListening}

          className="px-4 py-3 border rounded-xl flex gap-2"

          >

          <Mic size={18}/>

          Speak

          </button>


          :

          <button

          onClick={stopListening}

          className="px-4 py-3 bg-red-600 text-white rounded-xl flex gap-2"

          >

          <MicOff size={18}/>

          Stop

          </button>

        }




        <button

        onClick={sendMessage}

        disabled={loading}

        className="px-6 py-3 bg-blue-600 text-white rounded-xl flex gap-2"

        >

        <Sparkles size={18}/>

        {loading ? "Thinking..." : "Send"}

        </button>


        </div>


      </div>


    </div>


  );

}


export default ChatBox;