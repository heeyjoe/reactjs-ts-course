import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)
  const [input, setInput] = useState()
  const [editTask, setEditTask] = useState({ enabled: false, task: ''  })
  const [tasks, setTasks] = useState<string[]>([]);
  
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem('@cursoreact')
    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  }, [])

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify(tasks))
  },[tasks])
  
  function handleSaveEdit(){
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]
    allTasks[findIndexTask] = input
    setTasks(allTasks)
    setEditTask({enabled: false, task: ''})
    setInput("")
  }

  const handleRegister = useCallback(() => {
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
    console.log('Renderizado')
  }, [input, tasks])
  
  function handleDelete(item: string){
    const removeTasks = tasks.filter( task => task !== item)
    setTasks(removeTasks)
  }

  function handleEdit(item: string){
    inputRef.current?.focus()
    setInput(item)
    setEditTask({enabled: true, task: item})
  }
  
  const totalTarefas = useMemo( () => {
    return tasks.length
  }, [tasks])

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input 
        placeholder='Digite o nome da tarefa'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
        />
        <button onClick={handleRegister}>
          {editTask.enabled ? 'Editar Tarefa' : 'Adicionar Tarefa'}</button>
      <hr />
      <strong>Você tem {totalTarefas} tarefas</strong>
      <br /><br />
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
