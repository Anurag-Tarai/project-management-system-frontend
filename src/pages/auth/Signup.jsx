import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const form = useForm({
        defaultValues:{
            email:"",
            password:"",
            fullName:""
        }
    })
    const onSubmit = (data)=>{
        console.log(data)        
    }
  return (
    <div className='space-y-5'>
        <h1>Register</h1>
        <Form{...form}>
            <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>

                 {/* this is fullName field */}
               <FormField control={form.control}
               name="fullName"
               render={({field})=>(<FormItem>
                <FormControl>
                    <Input {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="full name..."
                    />
                </FormControl>
                <FormMessage/>
               </FormItem>)}
               />

               {/* this is email field */}
               <FormField control={form.control}
               name="email"
               render={({field})=>(<FormItem>
                <FormControl>
                    <Input {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="email..."
                    />
                </FormControl>
                <FormMessage/>
               </FormItem>)}
               />

               {/* this is password field */}
               <FormField control={form.control}
               name="password"
               render={({field})=>(<FormItem>
                <FormControl>
                    <Input {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="password..."
                    />
                </FormControl>
                <FormMessage/>
               </FormItem>)}
               />
         
               <Button type="submit" className="w-full mt-5">Register</Button>
              
            </form>
        </Form>
        
    </div>
  )
}

export default Signup