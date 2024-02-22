import {Component} from 'react'
import './App.css'
import {v4} from 'uuid'
import TagItem from './components/tagItem'

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

  onClickTag = value => {
    const categoryClicked = value
    const {category} = this.state
    if (category === '' || category !== categoryClicked) {
      this.setState({category: categoryClicked})
    } else {
      this.setState({category: ''})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {text, tag} = this.state
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
  }

  render() {
    const {text, tag, tasks, category} = this.state
    const filteredTasks = tasks.filter(item => item.tag.includes(category))
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
              <TagItem details={tag1} key={tag1.optionId} />
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
