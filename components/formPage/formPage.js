import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function FormPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diffDays, setDiffDays] = useState(null);
  const [isValid, setIsValid] = useState(true);

  //form submission state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Form submit handler
  const submitForm = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/submit-form", {
      method: "POST",
      body: JSON.stringify({ name, message, from, to, diffDays }),
    });
    // Success if status code is 201
    if (res.status === 201) {
      toast("Application Submitted!", { type: "success" });
    } else {
      toast("Please re-check your inputs.", { type: "error" });
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    
  };

  const handleEndDateChange = async (event) => {
    setEndDate(event.target.value);
    
   
  };

  useEffect(()=> {
    setFrom(startDate);
    setTo(endDate);
  },[startDate, endDate])

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start) && !isNaN(end)) {
        const diffTime = end - start;
        if (diffTime >= 0) {
          const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDiffDays(diff + 1);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        console.error("Invalid dates");
      }
    }
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen   flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col text-black bg-white md:w-[40rem] p-10 rounded-lg shadow-lg ">
        <div className=" w-ful mb-5 text-center ">
          <h1 className="text-4xl font-pop">Application</h1>
        </div>

        <form className="flex flex-col" onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="bg-[#F5F5F5] p-2 rounded-lg mb-5 mt-2"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="message">Leave Letter</label>
          <textarea
            name="message"
            className="bg-[#F5F5F5] p-2 rounded-lg mb-5 mt-2"
            id="message"
            cols="30"
            rows="3"
            style={{ resize: "none" }}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className="w-full  flex items-center justify-between mb-5 mt-2 ">
            <label htmlFor="from">From</label>
            <input
              type="date"
              id="from"
              name="from"
              value={startDate}
              onChange={handleStartDateChange}
              className="bg-[#F5F5F5] p-2 rounded-lg  font-black "
              required
            />
            <label htmlFor="to">To</label>
            <input
              type="date"
              id="to"
              name="to"
              value={endDate}
              onChange={handleEndDateChange}
              className="bg-[#F5F5F5] p-2 rounded-lg  font-black "
              required
            />
          </div>

          {diffDays !== null && isValid && (
            <div className="text-green-400 pb-5 flex font-extrabold justify-end">
              <h2>Days of leave: {diffDays}</h2>
            </div>
          )}
          {!isValid && (
            <div className="text-red-400 pb-5 flex justify-end font-extrabold">
              <h2>Invalid number of Days!</h2>
            </div>
          )}
          <button
            type="submit"
            className=" p-4 rounded-xl font-pop text-white"
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? "#001b54" : "#ccc",
              color: isValid ? "#fff" : "#333",
              cursor: isValid ? "pointer" : "not-allowed",
              
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
