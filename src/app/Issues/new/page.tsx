import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl p-5 space-y-4 ' >
        <TextField.Root placeholder="Search Title" color="green" variant="soft" radius="large" >
           
        </TextField.Root>

        <TextArea  placeholder='Description' color="indigo" variant="soft" radius="large" />
        <Button color="crimson" variant="soft">
            Submit New Issue
        </Button>
    </div>


  )
}

export default NewIssuePage