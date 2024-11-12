import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/redux/auth/Action'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const Login = () => {

    const dispatch = useDispatch()


    const form = useForm({

        defaultValues:{
            email:"",
            password:"",
            fullName:""
        }
    })
    const onSubmit = (data)=>{
        dispatch(login(data))
        console.log("user login data", data)        
    }
  return (
    <div className='space-y-5'>
        <h1>Singin</h1>
        <Form{...form}>
            <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>

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
            
               <Button type="submit" className="w-full mt-5">Login</Button>
              
            </form>
        </Form>
        
    </div>
  )
}

export default Login