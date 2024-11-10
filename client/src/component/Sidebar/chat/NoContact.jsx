import React from 'react'


const NoContact = ({contactExist}) => {
    if( contactExist != 0 ) return ;
  return (
    <div className="space-y-6 text-center text-lg">
      <div className="mb-4">
        <p>If you are not created any contact, first you Create Contact </p>
      </div>
      <p>OR</p>
      <p>⚠️Network Problem</p>
    </div>
  );
}

export default NoContact
