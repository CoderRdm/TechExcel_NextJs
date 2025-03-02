"use client"

import React, { useState } from 'react';


const Verifydoc = () => {
    const [file,setfile]= useState(null);
    const [data,setdata]= useState(null);
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(!file){
            alert("Please upload a file");
            return;
        }
        const formdata = FormData();
        formdata.append("pdf",file);
        try{
            const response = await fetch("http://localhost:3002/verify",{
                method:"POST",
                body:formdata
            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Error verifying document");
            }
            data = await response.json();
            alert("Document verified successfully!");
            console.log("Document Data:", data);
        }catch(error){
            console.error("Error:", error.message || error);
            alert("An error occurred: " + error.message);
        }
    }
    return (
        <div>
            <input type='file' onChange={(e)=>setfile(e.target.files[0])}/>
            <button onClick={handlesubmit}>Verify</button>
            <div>
                {data && <p>{data}</p>}
            </div>
        </div>
    )
}