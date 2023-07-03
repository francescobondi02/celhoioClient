import React from 'react'
import ReactDOM from 'react-dom'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const [emps,setEmps]=useState([
    {label:"Raja",value:"Raja"},
    {label:"Mano",value:"Mano"},
    {label:"Tom",value:"Tom"},
])

const data = {
  label: 'search me',
  value: 'searchme',
  children: [
    {
      label: 'search me too',
      value: 'searchmetoo',
      children: [
        {
          label: 'No one can get me',
          value: 'anonymous',
        },
      ],
    },
  ],
}

const onChange = (currentNode, selectedNodes) => {
  console.log('onChange::', currentNode, selectedNodes)
}
const onAction = (node, action) => {
  console.log('onAction::', action, node)
}
const onNodeToggle = currentNode => {
  console.log('onNodeToggle::', currentNode)
}
export default function FileSystemNavigator() {
    return (
<DropdownTreeSelect data={emps} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
    );
} // in real world, you'd want to render to an element, instead of body.