'use client';
import { Suspense } from 'react';
import React from 'react'
import { useSearchParams } from 'next/navigation';
import TemplateDetail from '@/helper';
import Footer from '../components/Footer';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const _idtoString = searchParams.get('_id');
  const _id = _idtoString ? Number(_idtoString) : null;
  
  return (
    <>
    <div className=''>
      {id ? (
        <TemplateDetail id={id} />
      ) : (
        <div className='py-10'>
          <h1>Templates Page</h1>
          <p>Welcome to Templates</p>
          <p>No template selected - Add ID parameter to URL (?id=YOUR_TEMPLATE_ID)</p>
        </div>
      )}
    </div>
    <Footer></Footer>

    </>
  )
}
const SingleTemplate = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Page />
    </Suspense>
  );
};

export default SingleTemplate;
