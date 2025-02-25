import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewForm = () => {

  const { paf_id } = useParams();

  const [data, setdata] = useState([])
  const [finaldata, setfinaldata] = useState([])


  const getFormdata = async () => {

    try {

      let response = await axios.get(`http://localhost:8000/api/form/get-paf-form/${paf_id}`, {
        headers: {
          "Accept": "application/json"
        }
      });

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

  useEffect(() => {
    getFormdata();
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



    setfinaldata(result);
    console.log(result)
  }, [data])


  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full text-center divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-center bg-blue-500">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">No.</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Action</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Team</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Progress</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Target Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Start Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">End Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-white border">Remarks</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {
            finaldata.filter((ee) => ee.header_status == "Active").map((ele, index) =>
            (
              <>
                <tr className=''>
                  <td className='border'>{index + 1}</td>
                  <td className='border'>{ele.pafform_item_name}</td>
                  <td className='border'>{ele.pafform_team}</td>
                  <td className='border'>{ele.pafform_progress}</td>
                  <td className='border'>{moment(ele.pafform_target).format("DD-MMM-YYYY")}</td>
                  <td className='border'>{ele.pafform_start ? moment(ele.pafform_start).format("DD-MMM-YYYY") : "-"}</td>
                  <td className='border'>{ele.pafform_end ? moment(ele.pafform_end).format("DD-MMM-YYYY") : "-"}</td>
                  <td className='border'>{ele.pafform_remarks}</td>
                </tr>

                {/* {
                  ele.item.map((ele1) => (
                    <>
                      <tr>
                        <td></td>
                        <td>{ele1.pafform_item_name}</td>
                        <td>{ele1.pafform_team}</td>
                        <td>{ele1.pafform_progress}</td>
                        <td>{ele1.pafform_target}</td>
                        <td>{ele1.pafform_start}</td>
                        <td>{ele1.pafform_end}</td>
                        <td>{ele1.pafform_remarks}</td>
                      </tr>

                      {
                        ele1.subitems.map((ele2) =>
                          <tr>
                            <td></td>
                            <td>{ele2.pafform_item_name}</td>
                            <td>{ele2.pafform_team}</td>
                            <td>{ele2.pafform_progress}</td>
                            <td>{ele2.pafform_target}</td>
                            <td>{ele2.pafform_start}</td>
                            <td>{ele2.pafform_end}</td>
                            <td>{ele2.pafform_remarks}</td>
                          </tr>
                        )
                      }
                    </>
                  ))

                } */}
              </>
            ))
          }
        </tbody>

      </table>
    </div>
  )
}

export default ViewForm
