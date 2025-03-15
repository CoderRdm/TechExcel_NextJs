'use client';

import React from 'react'
import { useSearchParams } from 'next/navigation';
import TemplateDetail from '@/helper';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const _idtoString = searchParams.get('_id');
  const _id = _idtoString ? Number(_idtoString) : null;
  
  return (
    <div>
      {id ? (
        <TemplateDetail id={id} />
      ) : (
        <div>
          <h1>Templates Page</h1>
          <p>Welcome to Templates</p>
          <p>No template selected - Add ID parameter to URL (?id=YOUR_TEMPLATE_ID)</p>
        </div>
      )}
    </div>
  )
}

export default Page
