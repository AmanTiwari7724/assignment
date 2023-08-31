import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddTaskModal from './AddTaskModal'


const TaskCard = ({ name }: any) => {
    return (
        <div className='w-[320px] h-[450px] rounded-lg bg-[#f2f2f2] shadow p-10'>

            <h2 className="lg:text-lg text-base font-medium capitalize">{name.name}</h2>

            <p className="lg:text-lg text-base font-medium capitalize pt-8">{name.description}</p>

        </div>
    )
}


const ProjectBoard = () => {

    const [tasks, setTasks] = useState([])

    const [projects, setProjects] = useState([{}])

    console.log(projects, 'projects')


    const [activeIndex, setActiveIndex] = useState<any>()

    console.log(activeIndex, 'activeIndex')

    const { id } = useParams()

    console.log(id, 'id from params')

    useEffect(() => {

        let temp: any = localStorage.getItem('projects')
        temp = JSON.parse(temp)

        if (temp !== null) {
            setProjects(temp)
            let cur = temp.find((item: any, index: any) => {
                if (item.id === id) {
                    setActiveIndex(index)
                    return item
                }
            })

            let tempTasks: any = [...cur.tasks]
            setTasks(tempTasks)
        }

    }, [id])

    const fields = {
        name: '',
    }

    const [params, setParams] = useState(fields)
    console.log(params, 'params')

    const handleChange = (e: any) => {
        let { name, value } = e.target
        setParams({ ...params, [name]: value })
    }

    const [taskModal, setTaskModal] = useState(false)

    const taskModalOpen = () => {
        setTaskModal(true)
    }

    const taskModalClose = () => {
        setParams(fields)
        setTaskModal(false)
    }

    const handleSubmit = () => {
        if (params.name !== '') {
            addNewTask(params)
        }
        else {
            alert('Task cannot be empty!')
        }
    }

    const addNewTask = (params: any) => {
        console.log('addNewTask')
        let temp: any = [...projects]
        console.log(temp, 'temp')

        let curTasksArray: any = []

        if (temp[activeIndex].tasks.length > 0) {
            curTasksArray = [...temp[activeIndex].tasks]
        }

        curTasksArray.push({
            name: params.name,
            description: params.description
        })

        temp[activeIndex] = {
            ...temp[activeIndex],
            tasks: curTasksArray
        }

        setProjects(temp)

        localStorage.setItem('projects', JSON.stringify(temp))

        window.location.reload()
    }

    console.log(tasks, "tasks")

    return (
        <div>

            <div className='h-[70px] bg-[#909090] w-full px-10 flex flex-row items-center gap-4'>
                <h1>
                    {projects?.map((item: any, index: any) => {
                        return (
                            <div key={index}>
                                <div className='text-black'>{index === activeIndex ? item.name : null}</div>
                            </div>
                        );
                    })}
                </h1>

                <button onClick={taskModalOpen} className='bg-white text-black p-2 px-5 font-medium capitalize'>
                    Add New Task
                </button>

            </div>



            <div className='flex items-center justify-center'>
                {
                    tasks.length > 0 ?
                        <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-5 lg:p-10 p-5'>
                            {React.Children.toArray(tasks.map(item => (
                                <TaskCard name={item} />
                            )))}
                        </div> :
                        <div className='flex flex-col items-center justify-center mt-5'>
                            <p className='text-center font-medium font-sans'>No Projects Found!</p>
                        </div>
                }
            </div>


            <AddTaskModal
                open={taskModal}
                params={params}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClose={taskModalClose}
            />

        </div>
    )
}

export default ProjectBoard