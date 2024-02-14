import {Component} from 'react'
import './App.css'
import {v4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    text: '',
    tag: tagsList[0].displayText,
    tasks: [],
    category: '',
  }

  onChangeText = event => {
    this.setState({text: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tag: event.target.value})
  }

  onClickTag = event => {
    const categoryClicked = event.target.value
    const {category} = this.state
    if (category === '' || category !== categoryClicked) {
      this.setState({category: categoryClicked})
    } else {
      this.setState({category: ''})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {text, tag, tasks} = this.state
    const newItem = {
      id: v4(),
      text,
      tag,
    }
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newItem],
      text: '',
      tag: tagsList[0].displayText,
    }))
    console.log(tasks)
  }

  render() {
    const {text, tag, tasks, category} = this.state
    const filteredTasks = tasks.filter(item => item.tag === category)
    return (
      <div>
        <div>
          <h1>Create a Task!</h1>
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              value={text}
              onChange={this.onChangeText}
              placeholder="Enter the task here"
            />
            <label htmlFor="tag">Tags</label>
            <select id="tag" value={tag} onChange={this.onChangeTag}>
              {tagsList.map(option => (
                <option value={option.optionId} id={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(tag1 => (
              <li id={tag1.optionId}>
                <button type="button" onClick={this.onClickTag}>
                  {tag1.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasks.length > 0 ? (
            <ul>
              {filteredTasks.map(item => (
                <li id={item.id}>
                  <p>{item.text}</p>
                  <p>{item.tag}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
