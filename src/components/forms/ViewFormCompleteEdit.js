import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../axiosapi';

const ViewFormCompleteEdit = () => {

  const { paf_id } = useParams();

  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [finaldata, setfinaldata] = useState([])

  const [departments, setdepartments] = useState([])

  const [visibility, setVisibility] = useState({});


  const getFormdata = async () => {

    try {

      let response = await api.get(`http://localhost:8000/api/form/get-paf-form/${paf_id}`);

      if (response.data.data) {
        // toast.success(response.data.message)
        setdata(response.data.data)
      }
      else {
        toast.info(response.data.message)
        setdata([])
      }

    } catch (error) {
      toast.error(error.message)
      setdata([])
    }
  }

  const getAllDepartments = async () => {
    try {

      let response = await api.get("http://localhost:8000/api/department/get");

      if (response.data.data) {
        // toast.success(response.data.message)
        setdepartments(response.data.data)
      }
      else {
        toast.info(response.data.message)
        setdepartments([])
      }

    } catch (error) {
      toast.error(error.message)
      setdepartments([])
    }
  }

  useEffect(() => {
    getFormdata();
    getAllDepartments()
  }, []);



  useEffect(() => {
    const result = [];

    data.forEach(item => {
      let header = result.find(h => h.pafform_header_id === item.pafform_header_id);

      // If header doesn't exist, create a new header object
      if (!header) {
        header = {
          ...item,  // Add the entire header data
          item: []   // Initialize an empty array for items
        };
        result.push(header);
      }

      // Find if item already exists in the current header
      let currentItem = header.item.find(i => i.pafform_item_id === item.pafform_item_id);

      // If the item doesn't exist, create a new item object
      if (!currentItem) {
        currentItem = {
          ...item,    // Add the entire item data
          subitems: [] // Initialize an empty array for subitems
        };
        header.item.push(currentItem);
      }

      // If subitem exists, add it to the subitems array
      if (item.pafform_subitem_id) {
        currentItem.subitems.push(item); // Add full subitem data
      }
    });

    result.forEach(header => {
      if (header.item.length > 0) {
        header.item.splice(0, 1); // Removes the first item from the item array, but does not affect the header data
      }
    });


    console.log(result, "this is result")
    setfinaldata(result);

    setVisibility({
      headers: result.map(() => false), // Track visibility of headers
      items: result.map((tt) => tt.item.map(() => false)) // Track visibility of items and sub-items
    });


  }, [data])

  useEffect(() => {
    console.log(visibility, "this is visiblity")
  }, [visibility])


  const toggleHeader = (index) => {
    console.log(index, "this is visi")

    let tempdata = { ...visibility };
    tempdata.headers[index] = !(tempdata.headers[index]);
    setVisibility(tempdata)

  };

  // Function to toggle visibility for an item
  const toggleItem = (index, index1) => {
    console.log(index, index1)
    let tempdata = { ...visibility };
    tempdata.items[index][index1] = !(tempdata.items[index][index1]);
    setVisibility(tempdata)
  };

  const handleHeaderChange = (name, val, type, index) => {
    let tempdata = [...finaldata];
    tempdata[index][name] = val;
    setfinaldata(tempdata)
  }

  const handleItemChange = (name, val, type, index, index1) => {
    let tempdata = [...finaldata];
    // console.log(tempdata[index].item[index1])
    tempdata[index].item[index1][name] = val;
    setfinaldata(tempdata)
  }

  const handleSubItemChange = (name, val, type, index, index1, index2) => {
    let tempdata = [...finaldata];
    // console.log(tempdata[index].item[index1])
    tempdata[index].item[index1].subitems[index2][name] = val;
    setfinaldata(tempdata)
  }

  const convertDataSending = () => {

    let temparray = []

    finaldata.map((ele) => {
      temparray.push({ "pafform_id": ele.pafform_id, "pafform_team": ele.pafform_team, "pafform_start": ele.pafform_start, "pafform_end": ele.pafform_end, "pafform_remarks": ele.pafform_remarks })

      if (ele.item && ele.item.length > 0) {
        ele.item.map((ele1) => {
          temparray.push({ "pafform_id": ele1.pafform_id, "pafform_team": ele1.pafform_team, "pafform_start": ele1.pafform_start, "pafform_end": ele1.pafform_end, "pafform_remarks": ele1.pafform_remarks })
          if (ele1.subitems && ele1.subitems.length > 0) {
            ele1.subitems.map((ele2) => {
              temparray.push({ "pafform_id": ele2.pafform_id, "pafform_team": ele2.pafform_team, "pafform_start": ele2.pafform_start, "pafform_end": ele2.pafform_end, "pafform_remarks": ele2.pafform_remarks })

            })
          }
        })
      }

    })

    return temparray;
  }

  const onSubmit = async () => {

    const converteddata = convertDataSending();
    console.log(converteddata)
    try {
      const updatedata = await api.put("form/updatePAFComplete", { "data": converteddata })

      if (updatedata.status) {
        toast.success(updatedata.data.message)
        navigate("/paf")
      }
      else {
        toast.info(updatedata.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="overflow-x-auto ">
      <button onClick={onSubmit} className='bg-blue-500 text-white px-3 py-1 rounded ml-2 m-2'>Update</button>

      <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-center bg-blue-500">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">No.</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">Action</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">Team</th>
            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Progress</th> */}
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">Target Date</th>
            {/* <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Latest Target Date</th> */}
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">Start Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">End Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium border text-white">Remarks</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {
            finaldata.filter((ee) => ee.header_status == "Active").map((ele, index) =>
            (
              <>
                <tr key={index}>
                  <td className='border'>{index + 1}</td>
                  <td onClick={() => toggleHeader(index)} className='whitespace-wrap border'>{ele.pafform_item_name}</td>
                  <td className='border'>
                    {/* {ele.pafform_team} */}
                    <select
                      name="pafform_team"
                      value={ele.pafform_team}
                      onChange={(e) => handleHeaderChange(e.target.name, e.target.value, "Header", index)}
                      className="border text-xs p-0 px-1 w-fit m-1"
                      required
                    >
                      <option value="">Select</option>
                      {
                        departments && departments.length > 0 &&
                        departments.map((vv) =>
                          <option>{vv.department_name}</option>
                        )
                      }
                    </select>
                  </td>
                  {/* <td>

                    <select
                      name="pafform_progress"
                      value={ele.pafform_progress}
                      onChange={(e) => handleHeaderChange(e.target.name, e.target.value, "Header", index)}
                      className="border text-xs p-0 px-1 w-fit m-1"
                      required
                    >
                      <option value="">Select</option>
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td> */}
                  <td className='border'>{moment(ele.pafform_target).format("DD-MMM-YYYY")}</td>
                  <td className='border'>
                    <input onChange={(e) => handleHeaderChange(e.target.name, e.target.value, "Header", index)} value={moment(ele.pafform_start).format("YYYY-MM-DD")} name="pafform_start" className='text-xs h-fit w-fit p-0 m-2' type="date" />
                  </td>
                  <td className='border'>
                    <input onChange={(e) => handleHeaderChange(e.target.name, e.target.value, "Header", index)} value={moment(ele.pafform_end).format("YYYY-MM-DD")} name='pafform_end' className='text-xs h-fit w-fit p-0 m-2' type="date" />
                  </td>

                  <td className='border'>
                    <textarea onChange={(e) => handleHeaderChange(e.target.name, e.target.value, "Header", index)} value={ele.pafform_remarks} name="pafform_remarks" placeholder='Remarks' className="m-1 shadow appearance-none border h-9 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base" />
                  </td>
                </tr>

                {
                  visibility.headers[index] && ele.item.map((ele1, index1) => (
                    <>
                      <tr key={index1}>
                        <td className='pl-7 border'>{index + 1}.{index1 + 1}</td>
                        <td onClick={() => toggleItem(index, index1)} className='whitespace-wrap border'>{ele1.pafform_item_name}</td>
                        <td>
                          <select
                            name="pafform_team"
                            value={ele1.pafform_team}
                            onChange={(e) => handleItemChange(e.target.name, e.target.value, "Item", index, index1)}
                            className="border text-xs p-0 px-1 w-fit m-1"
                            required
                          >
                            <option value="">Select</option>
                            {
                              departments && departments.length > 0 &&
                              departments.map((vv) =>
                                <option>{vv.department_name}</option>
                              )
                            }
                          </select>
                        </td>
                        {/* <td>
                          
                          <select
                            name="pafform_progress"
                            value={ele1.pafform_progress}
                            onChange={(e) => handleItemChange(e.target.name, e.target.value, "Item", index, index1)}
                            className="border text-xs p-0 px-1 w-fit m-1"
                            required
                          >
                            <option value="">Select</option>
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </td> */}
                        <td className='border'>{moment(ele1.pafform_target).format("DD-MMM-YYYY")}</td>
                        <td className='border'>
                          <input onChange={(e) => handleItemChange(e.target.name, e.target.value, "Item", index, index1)} value={moment(ele1.pafform_start).format("YYYY-MM-DD")} name="pafform_start" className='text-xs h-fit w-fit p-0 m-2' type="date" />
                        </td>
                        <td className='border'>
                          <input onChange={(e) => handleItemChange(e.target.name, e.target.value, "Item", index, index1)} value={moment(ele1.pafform_end).format("YYYY-MM-DD")} name='pafform_end' className='text-xs h-fit w-fit p-0 m-2' type="date" />
                        </td>

                        <td className='border'>
                          <textarea onChange={(e) => handleItemChange(e.target.name, e.target.value, "Item", index, index1)} value={ele1.pafform_remarks} name="pafform_remarks" placeholder='Remarks' className="m-1 shadow appearance-none border h-9 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base" />
                        </td>
                      </tr>

                      {
                        visibility.items[index][index1] && ele1.subitems.map((ele2, index2) =>
                          <tr>
                            <td className='pl-14 border'>{index + 1}.{index1 + 1}.{index2 + 1}</td>
                            <td className='whitespace-wrap border'>{ele2.pafform_item_name}</td>
                            <td className='border'>
                              {/* {ele2.pafform_team} */}
                              <select
                                name="pafform_team"
                                value={ele2.pafform_team}
                                onChange={(e) => handleSubItemChange(e.target.name, e.target.value, "Subitem", index, index1, index2)}
                                className="border text-xs p-0 px-1 w-fit m-1"
                                required
                              >
                                <option value="">Select</option>
                                {
                                  departments && departments.length > 0 &&
                                  departments.map((vv) =>
                                    <option>{vv.department_name}</option>
                                  )
                                }
                              </select>
                            </td>
                            {/* <td>
                              
                              <select
                                name="pafform_progress"
                                value={ele2.pafform_progress}
                                onChange={(e) => handleSubItemChange(e.target.name, e.target.value, "Subitem", index, index1, index2)}
                                className="border text-xs p-0 px-1 w-fit m-1"
                                required
                              >
                                <option value="">Select</option>
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                              </select>

                            </td> */}
                            <td className='border'>{moment(ele2.pafform_target).format("DD-MMM-YYYY")}</td>
                            <td className='border'>
                              <input onChange={(e) => handleSubItemChange(e.target.name, e.target.value, "Subitem", index, index1, index2)}
                                value={moment(ele2.pafform_start).format("YYYY-MM-DD")} name="pafform_start" className='text-xs h-fit w-fit p-0 m-2' type="date" />
                            </td>
                            <td className='border'>
                              <input onChange={(e) => handleSubItemChange(e.target.name, e.target.value, "Subitem", index, index1, index2)}
                                value={moment(ele2.pafform_end).format("YYYY-MM-DD")} name='pafform_end' className='text-xs h-fit w-fit p-0 m-2' type="date" />
                            </td>

                            <td className='border'>
                              <textarea onChange={(e) => handleSubItemChange(e.target.name, e.target.value, "Subitem", index, index1, index2)}
                                value={ele2.pafform_remarks} name="pafform_remarks" placeholder='Remarks' className="m-1 shadow appearance-none border h-9 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base" />
                            </td>
                          </tr>
                        )
                      }
                    </>
                  ))

                }
              </>
            ))
          }
        </tbody>

      </table>
    </div>
  )
}

export default ViewFormCompleteEdit
