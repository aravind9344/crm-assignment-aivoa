import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

function CRMForm({ onSaved }) {

  const crmData = useSelector((state) => state.crm.crmData);

  const empty = {
    hcp_name: "",
    hospital: "",
    specialty: "",
    interaction_type: "",
    notes: "",
    follow_up: "",
  };

  const [form, setForm] = useState(empty);

  useEffect(() => {

    if (crmData) {

      setForm({
        hcp_name: crmData.hcp_name || "Unknown Doctor",
        hospital: crmData.hospital || "",
        specialty: crmData.specialty || "",
        interaction_type: crmData.interaction_type || "Discussion",
        notes: crmData.notes || "",
        follow_up: crmData.follow_up || "",
      });

    } else {

      setForm(empty);

    }

  }, [crmData]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    try {

      await api.post("/interactions/", form);

      alert("Interaction Saved Successfully ✅");

      if (onSaved) {
        onSaved();
      }

    } catch (err) {

      console.log(err);

      alert("Save Failed");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg border p-6">

      <h2 className="text-xl font-bold mb-6">
        📋 Extracted CRM Details
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {[
          ["hcp_name", "Doctor Name"],
          ["hospital", "Hospital"],
          ["specialty", "Specialty"],
          ["interaction_type", "Interaction"],
        ].map(([name, label]) => (

          <div key={name}>

            <label className="text-sm font-medium">
              {label}
            </label>

            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

        ))}

      </div>

      <label className="block mt-5 font-medium">
        Notes
      </label>

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        rows="5"
        className="w-full border rounded-xl p-3 mt-2"
      />

      <label className="block mt-5 font-medium">
        Follow Up
      </label>

      <input
        name="follow_up"
        value={form.follow_up}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 mt-2"
      />

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold"
      >
        💾 Save Interaction
      </button>

    </div>

  );

}

export default CRMForm;