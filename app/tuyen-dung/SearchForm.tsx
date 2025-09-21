import Link from 'next/link'
import React from 'react'

function SearchForm() {
  return (
    <form >

      <input
        placeholder="Job title"
        className="w-full p-2 border border-[#ccc] rounded-l-md outline-[#589f46]"
        name="job_name"
      />
      <Link type='submit' href={`/tuyen-dung?job_name=`} className="w-[15%] rounded-r-md py-2 bg-[#589f46] font-semibold text-white text-center hover:opacity-85 duration-300">Search</Link>
    </form>
  )
}

export default SearchForm