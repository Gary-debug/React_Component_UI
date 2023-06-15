var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, beforeUpload = props.beforeUpload, onError = props.onError, onSuccess = props.onSuccess, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        upLoadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var upLoadFiles = function (files, test) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = 0;
                if (e.total == null) {
                    percentage = 0;
                }
                else {
                    percentage = Math.round((e.loaded) * 100 / e.total);
                }
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    _file.status = 'uploading';
                    _file.percent = percentage;
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            _file.status = 'success';
            _file.response = resp.data;
            if (onSuccess) {
                onSuccess(resp.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        }).catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            _file.status = 'error';
            _file.error = err;
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    return (React.createElement("div", { className: "upload-component" },
        React.createElement("div", { className: "upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { upLoadFiles(files, true); } }, children) :
                children,
            React.createElement("input", { ref: fileInput, className: "file-input", onChange: handleFileChange, style: { display: 'none' }, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
