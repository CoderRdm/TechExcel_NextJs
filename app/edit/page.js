import React from 'react'
import TemplateDetail from '@/helper';

const Page = ({ searchParams }) => {
  console.log(searchParams);
  const _idtoString = searchParams?._id;
  const _id =Number(_idtoString);
  
  return (
    <div>
      {/* Show TemplateDetail if ID exists in searchParams */}
      {searchParams?.id ? (
        <TemplateDetail id={searchParams.id} />
      ) : (
        <div>
          <h1>Templates Page</h1>
          <p>whjbefd</p>
          <p>No template selected - Add ID parameter to URL (?id=YOUR_TEMPLATE_ID)</p>
        </div>
      )}
    </div>
  )
}

export default Page