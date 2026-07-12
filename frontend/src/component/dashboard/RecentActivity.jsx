import { useState } from "react";
import { joinMeeting } from "../../api/meeting.api.js";
import { useNavigate } from "react-router";



const RecentActivity = () => {
  const [meetingCode, setMeetingCode]= useState("")
  const navigate = useNavigate();
  const handleClick = async()=>{
    console.log(meetingCode)
    const res = await joinMeeting(meetingCode,{});
    console.log(res);
      if(res.success){
         navigate(`/meeting/${meetingCode}`);
      }
  }
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Recent Activity
      </h2>
      <div>
        <h1 className="text-2xl">join meeting</h1>
        <input type="text"  className="border-2" onChange={(e)=>setMeetingCode(e.target.value)}/>
        <button onClick={handleClick}>join</button>
      </div>

      <p className="text-gray-500">
        Nothing to show yet.
      </p>

    </div>
  );
};

export default RecentActivity;