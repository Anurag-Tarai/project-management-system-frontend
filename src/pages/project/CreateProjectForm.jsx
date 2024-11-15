import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { tags } from '../project-list/ProjectList'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { createProject } from '@/redux/project/Action'

const CreateProjectForm = () => {
     
    const dispatch = useDispatch()

    const handleTagsChange = (newValue)=>{
        const currentTags = form.getValues("tags")
        const updatedTags = currentTags.includes(newValue)?
        currentTags.filter(tag=>tag!==newValue):[...currentTags, newValue]
        form.setValue("tags", updatedTags)
    }
    const form = useForm({
        defaultValues:{
            name:"",
            description:"",
            category:"",
            tags:[]
        }
    })
    const onSubmit = (data)=>{
        dispatch(createProject(data))
        console.log("this is form data", data)        
    }
  return (
    <div>
        <Form{...form}>
            <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>

                 {/* this is name field */}
               <FormField control={form.control}
               name="name"
               render={({field})=><FormItem>
                <FormControl>
                    <Input {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project name..."
                    />
                </FormControl>
                <FormMessage/>
               </FormItem>}
               />

                {/* this is description field */}
               <FormField control={form.control}
               name="description"
               render={({field})=><FormItem>
                <FormControl>
                    <Input {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="project description..."
                    />
                </FormControl>
                <FormMessage/>
               </FormItem>}
               />

               {/* this is category field */}
               <FormField control={form.control}
               name="category"
               render={({field})=><FormItem>
                <FormControl>
                    <Select
                    defaultValue='fullstack'
                    value={field.value}
                    onValueChange={(value)=>field.onChange(value)}
                    // className="border w-full border-gray-700 py-5 px-5"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="category"/>
                        </SelectTrigger>
                        <SelectContent>
                                    <SelectItem value="fullstack">Full Stack</SelectItem>
                                    <SelectItem value="frontend">Frontend</SelectItem>
                                    <SelectItem value="backend">Backend</SelectItem>
                        </SelectContent>   
                    </Select>
                </FormControl>
                <FormMessage/>
               </FormItem>}
               />

                {/* this is tag field */}
               <FormField control={form.control}
               name="tags"
               render={({field})=><FormItem>
                <FormControl>
                    <Select
                    onValueChange={(value)=>handleTagsChange(value)}
                    // className="border w-full border-gray-700 py-5 px-5"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="tags"/>
                        </SelectTrigger>
                        <SelectContent>
                            {tags.map((item)=><SelectItem value={item} key={item}>{item}</SelectItem>)}
                        </SelectContent>   
                    </Select>
                </FormControl>
                <div className='flex gap-1 flex-wrap'>
                    {
                        field.value.map((item)=><div key={item} onClick={()=>handleTagsChange(item)} className='cursor-pointer flex rounded-full items-center border gap-2 px-3 py-2'>
                        <span className='text-sm'>{item}</span>
                        <Cross1Icon className='h-3 w-3'/>
                    </div>)
                    }
                </div>
                <FormMessage/>
               </FormItem>}
               />
               <DialogClose>
                {false?<div><p>Upgrade to create new projects!</p></div>:<Button type="submit" className="w-full mt-5">Crete project</Button>}
               </DialogClose>
            </form>
        </Form>
    </div>
  )
}

export default CreateProjectForm