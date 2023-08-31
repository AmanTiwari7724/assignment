import { nanoid } from 'nanoid'
import React, { Fragment, useEffect, useState } from 'react'
import CreateProjectModal from './CreateProjectModal'

import { useNavigate } from 'react-router-dom'
import InputField from '../Common/Input'


const EyeIcon = ({ onClick }: any) => {
    return (
        <div onClick={onClick} className='w-[24px] h-[24px] cursor-pointer opacity-70 hover:opacity-100'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
    )
}


const projectList = [
    {
        id: nanoid(),
        name: 'Project Name 1',
        description: 'test description',
        tasks: [{
            name: "",
            description: "",
        }]
    },
]

const Home = () => {

    const [projects, setProjects] = useState(projectList)
    const [searchKey, setSearchKey] = useState("");


    const addNewProject = (data: any) => {

        let cur = [...projects]

        cur.push({
            id: nanoid(),
            name: data.name,
            description: data.description,
            tasks: []
        })

        setProjects(cur)

        localStorage.setItem('projects', JSON.stringify(cur))

        alert('Project added to list!')

        projectModalClose()

    }

    useEffect(() => {

        let temp: any = localStorage.getItem('projects')
        temp = JSON.parse(temp)

        if (temp !== null) {
            setProjects(temp)
        }

    }, [])

    const [projectModal, setProjectModal] = useState(false)

    const projectModalOpen = () => {
        setProjectModal(true)
    }

    const projectModalClose = () => {
        setProjectModal(false)
        setParams(fields)
    }

    const fields = {
        name: '',
        description: ''
    }

    const [params, setParams] = useState(fields)
    console.log(params, 'params')

    const handleChange = (e: any) => {
        let { name, value } = e.target
        setParams({ ...params, [name]: value })
    }

    const handleFilterClick = () => {
        performSearch(searchKey); // Pass the current searchKey to performSearch
    };

    const performSearch = (key: string) => {
        const filteredProjects = projectList.filter((project) => {
            const projectInfo = project.name + project.description;

            return projectInfo.toLowerCase().includes(key.toLowerCase());
        });

        setProjects(filteredProjects);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchKey = event.target.value;
        setSearchKey(newSearchKey);
    };

    const handleSubmit = () => {
        if (params.name !== '') {
            addNewProject(params)
        }
        else {
            alert('Project name cannot be empty!')
        }
    }

    const navigate = useNavigate()


    console.log(projects, "project in create project ")
    console.log(searchKey, "searchKey ")


    return (
        <div>
            {/* CTA Header */}
            <div className='h-[70px] bg-[#909090] w-full px-10 flex flex-row items-center'>

                <button onClick={projectModalOpen} className='bg-white text-black p-2 px-5 font-medium capitalize'>
                    Create New Project
                </button>

            </div>

            <div className='mt-10 mb-5 w-full'>
                <div className='flex flex-row w-full items-center justify-center gap-5'>
                    <InputField
                        name="search_key"
                        value={searchKey}
                        handleChange={handleSearchChange}
                        placeholder={"Search"}
                    />

                    <button className='p-2 w-[130px] text-white font-sans text-base bg-blue-400 rounded-lg'
                        onClick={() => handleFilterClick()}
                    >
                        Filter
                    </button>

                    <button className='p-2 w-[130px] text-black font-sans text-base bg-[#f2f2f2] rounded-lg'
                        onClick={() => setSearchKey("")}
                    >
                        Clear
                    </button>
                </div>

            </div>

            {/* List of Projects */}

            <div className=' w-full'>

                <div className='grid grid-cols-5 gap-10 w-full bg-[#f2f2f2] px-10 p-3 border-b'>
                    {React.Children.toArray(["Sl. No", "Project Name", "Description", "Tasks Count", "Action"].map(item => (
                        <h1 className='text-base font-sans capitalize text-[#808080]'>{item}</h1>
                    )))}
                </div>

                {
                    projects.length > 0 ? <div>

                        {projects.map((item, index) => (
                            <div className='grid grid-cols-5 gap-10 w-full bg-[#f2f2f2] px-10 p-3'>
                                <p className='text-base font-sans text-[#292929] font-regular'>{index + 1}.</p>
                                <p className='text-base font-sans text-[#292929] font-regular'>{item.name}</p>
                                <p className='text-base font-sans text-[#292929] font-regular'>{item.description}</p>
                                <p className='text-base font-sans text-[#292929] font-regular'>{item.tasks.length}</p>
                                <EyeIcon onClick={() => navigate(`/project-board/${item.id}`)} />
                            </div>
                        ))}</div> :
                        <div className='flex flex-col items-center justify-center mt-5'>
                            <p className='text-center font-medium font-sans'>No Projects Found!</p>
                        </div>
                }
            </div>


            {/* Create Project Modal */}
            <CreateProjectModal
                open={projectModal}
                params={params}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClose={projectModalClose}
            />

        </div>
    )
}

export default Home