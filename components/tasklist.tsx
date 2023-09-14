import React from 'react'
import { Tasks } from '@/types/types'
import Task from '@/components/task'

type Props = {
    name: string;
    columnId: string;
    tasks: Tasks[];
}

const TaskList = ({ name, columnId, tasks }: Props) => {
    return (
        <div className='w-[280px]'>
            <div className='flex items-center mb-6 gap-3'>
                <div className='w-[15px] h-[15px] rounded-full bg-main-purple'></div>
                <h3 className='font-bold text-xs leading-[0.938rem] tracking-[2.4px] uppercase text-medium-grey'>{name} ({tasks ? tasks.length : 0})</h3>
            </div>

            <div className='flex flex-col gap-[20px]'>
                {tasks && tasks.map(task => (
                    <Task key={task.id} name={task.title} count={task.subtasks.length || 0} currentTask={task} columnId={columnId} />
                ))}
            </div>

        </div>
    )
}

export default TaskList