import './index.css'

const TagItem = props => {
  const {details, onClickTag} = props
  const {optionId, displayText} = details
  const clickTag = () => {
    onClickTag(displayText)
  }
  return (
    <li id={optionId}>
      <button type="button" onClick={clickTag}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
