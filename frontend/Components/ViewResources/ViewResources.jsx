import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import mongoose from 'mongoose'

const ViewResources = () => {
    const group_id = useParams()
    console.log(group_id)
    // const fetchData = async () => {
    //     const { data } = await axios.post('http://localhost:3000/api/groups/get_group_resources', { group_id: mongoose.Types.ObjectId(group_id) })
    //     console.log(data)
    // }
    // useEffect(() => {
    //     fetchData()
    // })
    return (
        <>
            <p>hello</p>
        </>
    )
}

export default ViewResources