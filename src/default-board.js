import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'Test description',
          name: 'first task',
          id: uuid(),
          pomodorosDone: 0,
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          pomodorosDone: 0,
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          pomodorosDone: 0,
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          pomodorosDone: 0,
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          pomodorosDone: 0,
          userAssigned: null
        }
      ]
    }
  ]
}
