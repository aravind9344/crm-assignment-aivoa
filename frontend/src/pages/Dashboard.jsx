import { useState } from "react";

import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import CRMForm from "../components/CRMForm";
import InteractionHistory from "../components/InteractionHistory";

import { useDispatch } from "react-redux";
import { clearCRMData } from "../redux/crmSlice";

function Dashboard() {

  const dispatch = useDispatch();

  const [refreshHistory, setRefreshHistory] = useState(0);

  const [resetChat, setResetChat] = useState(0);

  const handleSaved = () => {

    // Refresh Interaction History
    setRefreshHistory((prev) => prev + 1);

    // Clear CRM Form using Redux
    dispatch(clearCRMData());

    // Reset Chat
    setResetChat((prev) => prev + 1);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">

      <Header />

      <main className="max-w-7xl mx-auto p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-blue-900">
            AI CRM HCP
          </h1>

          <p className="text-gray-600 mt-2">
            Medical Representative AI Assistant
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <CRMForm
            onSaved={handleSaved}
          />

          <ChatBox
            resetChat={resetChat}
          />

        </div>

        <div className="mt-10">

          <InteractionHistory
            refresh={refreshHistory}
          />

        </div>

      </main>

    </div>

  );
}

export default Dashboard;