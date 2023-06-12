import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.position}</td>
   <td>{props.record.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function FilterList() {
 
 const [records, setRecords] = useState([]);
 const [name, setName] = useState("Empty");
 const [idd, setIdd] = useState({});
 const [filter, setFilter] = useState(false);
 let url = "";
 
 // This method fetches the records from the database.
 useEffect(() => {
    async function getRecords() {
        
        if (!filter) {
            url = `http://localhost:5050/record`;
            const response = await fetch(url);    
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
    
            const records = await response.json();
            setRecords(records);
        }
    }
   getRecords();
 
   return;
 }, [records.length]);
 
 
 // This method will map out the records on the table
 function filterList() {
    if (!filter) {
        return records.map((record) => {
            return (
                <Record
                record={record}
                key={record._id}
                deleteRecord={() => deleteRecord(record._id)}
                />
            );
        });
    }
    else {
        return (
        <Record
            record={records[0]}
            key={records[0]._id}
            deleteRecord={() => deleteRecord(records[0]._id)}
        />
        );
    }
 }
 
// This method will delete a record
async function deleteRecord(id) {
    //await fetch(`http://localhost:5050/record/${id}`, {
    // method: "GET"
    //}); 
    if (!filter){
        for (let i = 0; i < records.length; i++){
            if (name == records[i].name){
                id = records[i]._id;
            }
        }
    }  
    const newRecords = records.filter((el) => el._id === id);
    
    //const resp = await newRecords.json();
    setRecords(newRecords);
    //setName(newRecords[Object.keys(newRecords)].name);
    setName(records.length);
    setFilter(true);
    //setIdd(id);
  }

 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Filtered List</h3>
     <p>My name: {name}</p>
     <button className="btn btn-link"
       onClick={() => {
         deleteRecord(records[0]._id);
       }}>
       Filter
     </button>
     <input type="text" onChange={(e) => setName(e.target.value)} />
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Position</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{filterList()}</tbody>
     </table>
   </div>
 );
}