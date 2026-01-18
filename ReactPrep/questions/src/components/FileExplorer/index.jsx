import { data } from "./data";
import { useState } from "react"

const FileList = ({ fileList, level }) => {
  const directories = fileList.filter(fileItem => fileItem.children);
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter(fileItem => !fileItem.children);
  nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];
  return (
    <ul style={{ 
      listStyle: 'none', 
      margin: 0, 
      padding: 0 
    }}>
      {items.map((file) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </ul>
  )
}

const FileObject = ({ file, level }) => {
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;
  const isDirectory = Boolean(fileChildren);
  return (
    <li style={{ paddingLeft: `${level * 20}px` }}>
      <button
        onClick={() => {
          if(!isDirectory) return;
          setExpanded(!expanded);
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: isDirectory ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 0',
          fontSize: '14px'
        }}
      >
        <span>{fileName}</span>
        {isDirectory && <span style={{ color: '#666' }}>[{expanded ? "-" : "+"}]</span>}
      </button>
      {fileChildren && fileChildren.length > 0 && expanded && (
        <FileList
          fileList={fileChildren}
          level={level + 1}
        />
      )}
    </li>
  )
}

const FileExplorer = () => {
  return (
    <div>
      <FileList fileList={data} level={1} />
    </div>
  )
}

export default FileExplorer;
