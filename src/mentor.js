import {useEffect, useState} from 'react'

const Mentor = ({mentorData,getMentorsData,getStudentsData}) =>{
    const [name,setName] = useState("")

    useEffect(()=>{
        getMentorsData()
    },[])

    const addMentor = async (e) =>{
        e.preventDefault();
        var res = await fetch(`https://student-mentor-app.herokuapp.com/api/mentor`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name})
        })
        var resData = await res.json()
        if(resData.message = "Added 1 entry"){
            getMentorsData()
            getStudentsData()
            setName("")
        }
    }

    return(
        <div className="mentor">
            <h4> Add Mentor </h4>
            <form className="form" onSubmit={(e)=>addMentor(e)}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Mentor Name" value={name} onChange={(e)=>(setName(e.target.value))}/>
                </div>
                <button type="submit" className="btn btn-primary mb-2"> Add </button>
            </form>
            <table className="table mt-4 table-responsive-md">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mentor ID</th>
                    <th scope="col">Students ID</th>
                </tr>
            </thead>
            <tbody>
                {
                    mentorData.map((mentor,idx)=>(
                        <tr key={idx}>
                            <td> {idx+1} </td>
                            <td> {mentor.name} </td>
                            <td> {mentor.id} </td>
                            <td> {(mentor.studsId && mentor.studsId.join(", ")) || '-'}  </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default Mentor