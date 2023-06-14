import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Button from "../Button/button";
import Dragger from "./dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status ?: UploadFileStatus;
  percent ?: number;
  raw ?: File;
  response ?: any;
  error ?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList ?: UploadFile[];
  beforeUpload ?: (file: File) => boolean | Promise<File>;
  onProgress ?: (percentage: number, file: UploadFile) => void;
  onSuccess ?: (data: any, file: UploadFile) => void;
  onError ?: (err: any, file: UploadFile) => void;
  onChange ?: (file: UploadFile) => void;
  onRemove ?: (file: UploadFile) => void;
  headers ?: {[key: string]: any};
  name ?: string;
  data ?: {[key: string]: any};
  withCredentials ?: boolean;
  accept ?: string;
  multiple ?: boolean;
  drag ?: boolean;
  children ?: React.ReactNode;
}

export const Upload: FC<UploadProps>=(props) => {
  const { 
    action, 
    onProgress,
    beforeUpload,
    onError,
    onSuccess,
    onChange, 
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
    } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList|| [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return 
    }
    upLoadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const upLoadFiles = (files: FileList, test?: boolean) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = 0;
        if (e.total == null) {
          percentage = 0
        } else {
          percentage = Math.round((e.loaded) * 100 / e.total)
        }
        if (percentage<100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: 'success', response: resp.data})
      _file.status = 'success'
      _file.response = resp.data
      if (onSuccess) {
        onSuccess(resp.data, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    }).catch(err => {
      console.log(err)
      updateFileList(_file, {status: 'error', error: err})
      _file.status = 'error'
      _file.error = err
      if (onError) {
        onError(err, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    })
  }
  return (
    <div className="upload-component">
      <div
        className="upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag ? 
          <Dragger onFile={(files: FileList) => {upLoadFiles(files, true)}}>
            {children}
          </Dragger>:
          children
        }
        <input 
        ref={fileInput}
        className="file-input"
        onChange={handleFileChange}
        style={{display: 'none'}} 
        type="file"
        accept={accept}
        multiple={multiple}
        />
      </div>
      <UploadList 
      fileList={fileList}
      onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;