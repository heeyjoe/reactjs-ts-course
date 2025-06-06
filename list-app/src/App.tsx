import { useState } from 'react'

function App() {
  const [input, setInput] = useState()
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })
  const [tasks, setTasks] = useState<string[]>([]);
  
  function handleSaveEdit(){
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]
    allTasks[findIndexTask] = input
    setTasks(allTasks)
    setEditTask({enabled: false, task: ''})
    setInput('')
  }

  function handleRegister(){
    if(!input){
      alert('Preencha o nome da sua tarefa')
      return;
    }
    if (editTask.enabled){
      handleSaveEdit()
      return;
    }

    setTasks(tarefas => [...tarefas, input])
    setInput("")
  }

  function handleDelete(item: string){
    const removeTasks = tasks.filter( task => task !== item)
    setTasks(removeTasks)
  }

  function handleEdit(item: string){
    setInput(item)
    setEditTask({enabled: true, task: item})
  }
  
  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input 
        placeholder='Digite o nome da tarefa'
        value={input}
        onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleRegister}>
          {editTask.enabled ? 'Editar Tarefa' : 'Adicionar Tarefa'}</button>
      <hr />
      {tasks.map( (item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  )
}

export default App
