import React from 'react'
import Accordion from './Accordion';

const PersonalInfo = () => {
  return (
    <Accordion title="Personal Info">
      <div className="bg-gray-50 mt-2">
        <div className="flex flex-row-reverse">
          <span
            className="font-semibold text-blue-500 float-right mb-2 cursor-pointer"
            // onClick={EditPersonalInfo}
          >
            ✏️Edit
          </span>
        </div>
        <div className="flex flex-col mb-2">
          <span className="font-semibold ">Name</span>
          <span className="text-gray-500 ">Manish Kumar</span>
        </div>
        <div className="flex flex-col mb-2">
          <span className="font-semibold ">Email</span>
          <span className=" text-gray-500 ">adc@123.com</span>
        </div>

        <div className="flex flex-col mb-2">
          <span className="font-semibold ">Location</span>
          <span className=" text-gray-500 ">Patna, India</span>
        </div>
      </div>
    </Accordion>
  );
}

export default PersonalInfo
