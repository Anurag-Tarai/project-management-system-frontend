import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'


import React, { useEffect, useState } from 'react'
import ProjectCard from '../project/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/redux/Store'
import { fetchProjects, searchProjects } from '@/redux/project/Action'
import { getUser } from '@/redux/auth/Action'


export const tags = [
    "all",
    "JavaScript", 
    "React", 
    "Spring Boot", 
    "Java", 
    "Node.js", 
    "TypeScript", 
    "Python", 
    "Angular", 
    "Next.js", 
    "Express", 
    "MongoDB", 
    "MySQL", 
    "PostgreSQL", 
    "Docker", 
    "Kubernetes", 
    "Git", 
    "Jenkins", 
    "AWS", 
    "Azure", 
    "Heroku", 
    "JWT", 
    "OAuth2", 
    "JUnit", 
    "Jest"
  ];



const ProjectList = () => {
    const dispatch = useDispatch()

    const {project} = useSelector(store=>store)

    let [keyword, setKeyword] = useState("")
      
    const handleSearchChange = (e)=>{
          setKeyword(e.target.value)
          dispatch(searchProjects(e.target.value))
    };

    const handleFilterCategory = (value)=>{
        if(value=="all") dispatch(fetchProjects({}))
        else
        dispatch(fetchProjects({category:value}))       
    };

    const handleFilterTags = (value)=>{
        if(value=="all") dispatch(fetchProjects({}))
        else
        dispatch(fetchProjects({tag:value}))       
    };
  


    
    // console.log("project store", project);
    
      
  return (
    <>
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
        <section className='filterSection'>
            <Card className='p-5 sticky top-10'>
                <div className='flex justify-between lg:w-[20rem]'>
                    <p className='text-xl -tracking-wider'>filters</p>
                    <Button variant="ghost" size="icon">
                        <MixerHorizontalIcon/>
                    </Button>
                </div>
                <CardContent className='mt-5'></CardContent>
                <ScrollArea className = 'space-y-7 h-[70vh]'>
                    <div>
                        <h1 className='pb-3 text-gray-400 border-b'>
                            category
                        </h1>
                        <div className='pt-5'>
                            <RadioGroup className = 'space-y-3 pt-5' defaultValue="all" 
                            onValueChange={(value)=>handleFilterCategory(value)}>
                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value='all' id='r1'/>
                                    <Label htmlFor = 'r1'>all</Label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value='frontend' id='r2'/>
                                    <Label htmlFor = 'r2'>frontend</Label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value='backend' id='r3'/>
                                    <Label htmlFor = 'r3'>backend</Label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <RadioGroupItem value='fullstack' id='r4'/>
                                    <Label htmlFor = 'r4'>fullstack</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='pt-9'>
                        <h1 className='pb-3 text-gray-400 border-b'>tag</h1>
                        <div className='pt-5'>
                            <RadioGroup className = 'space-y-3 pt-5' defaultValue="all" 
                            onValueChange={(value)=>handleFilterTags(value)}>
                                {tags.map((item)=>
                                    <div key={item} className='flex items-center gap-2'>
                                    <RadioGroupItem value={item} id={`r1-${item}`}/>
                                    <Label htmlFor = {`r1-${item}`}>{item}</Label>
                                </div>
                                )}
                            </RadioGroup>
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        </section>
        <section className='projectListSection w-full lg:w-[48rem]'>
          <div className='flex gap-2 item-center pb-5 justify-between'>
                <div className='relative p-0 w-full'>
                    <Input
                    onChange={handleSearchChange}
                    className='40% px-9'
                    placeholder="serarch project"/>
                    <MagnifyingGlassIcon className='absolute top-3 left-4'/>
                </div>
          </div> 
          <div>
            <div className='space-y-5 min-h-[74vh]'>
                                {
                                    keyword?project.searchProjects?.map((item, index)=><ProjectCard item={item} key={item.id*index}/>):
                                    project.projects.map((item)=><ProjectCard key={item.id} item={item}/>)
                                }
            </div>
          </div>                      
        </section>

    </div>
    </>
    
  )
}

export default ProjectList